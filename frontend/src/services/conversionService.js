import { mergePdfsLocal, imagesToPdfLocal, pdfToJpgLocal } from '../utils/pdfEngine';

class ConversionService {
  async processJob(file, operation, options = {}) {
    // 1. Route to Local Engines if supported
    if (operation === 'merge') return await mergePdfsLocal(file);
    if (operation === 'jpg-to-pdf') return await imagesToPdfLocal(file);
    if (operation === 'pdf-to-jpg') return await pdfToJpgLocal(file, options);

    // 2. Route to Server-side Engines (PDF to Word/Excel/PPT, OCR)
    return await this.serverConverter(file, operation, options);
  }

  async serverConverter(file, operation, options) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('operation', operation);
    if (options.ocr) formData.append('ocr', 'true');
    if (options.ocrLanguage) formData.append('language', options.ocrLanguage);
    if (options.pageRange) formData.append('pageRange', options.pageRange);

    // Architecture: Post to Next.js API route which handles queuing (implemented in Step 3)
    const response = await fetch('/api/convert', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Server conversion failed.');
    }

    // Architecture expects a job ID for polling (queue system)
    const { jobId } = await response.json();
    return await this.pollJobStatus(jobId);
  }

async pollJobStatus(jobId) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/jobs/${jobId}`);
          
          // 1. If the server crashes or returns a 404/500, stop polling
          if (!res.ok) {
            clearInterval(interval);
            return reject(new Error(`Server error: ${res.statusText}`));
          }

          const data = await res.json();
          
          if (data.status === 'completed') {
            clearInterval(interval);
            resolve({
              downloadUrl: data.downloadUrl,
              warnings: data.warnings
            });
          } else if (data.status === 'failed') {
            clearInterval(interval);
            reject(new Error(data.error || 'Job failed on the server.'));
          }
          // If status is 'processing', it just loops again in 2 seconds.
          
        } catch (error) {
          // 2. If the network completely drops or JSON parsing fails, stop polling
          clearInterval(interval);
          reject(new Error('Failed to communicate with the server.'));
        }
      }, 2000);
    });
  }

  async processBatch(files, operation, options = {}, onProgressUpdate) {
    const results = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Notify UI that this specific file started
      onProgressUpdate({ index: i, id: file.name, status: 'processing' });
      
      try {
        const res = await this.processJob(file, operation, options);
        // Notify UI of success
        onProgressUpdate({ index: i, id: file.name, status: 'success', url: res.downloadUrl });
        results.push({ file: file.name, status: 'success', url: res.downloadUrl });
      } catch (err) {
        // Notify UI of failure, but continue the loop for the rest of the files
        onProgressUpdate({ index: i, id: file.name, status: 'failed', error: err.message });
        results.push({ file: file.name, status: 'failed', error: err.message });
      }
    }
    
    return results;
  }
}

export const conversionService = new ConversionService();
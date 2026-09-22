import {
  mergePdfsLocal,
  imagesToPdfLocal,
  pdfToJpgLocal,
} from "../utils/pdfEngine";

// Use an environment variable for production, fallback to localhost for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

class ConversionService {
  async processJob(file, operation, options = {}) {
    // 1. Route to Local Engines if supported
    if (operation === "merge") {
      const blob = await mergePdfsLocal(file);
      return { downloadUrl: URL.createObjectURL(blob) };
    }
    if (operation === "jpg-to-pdf") {
      const blob = await imagesToPdfLocal(file);
      return { downloadUrl: URL.createObjectURL(blob) };
    }
    if (operation === "pdf-to-jpg") {
      const blob = await pdfToJpgLocal(file, options);
      return { downloadUrl: URL.createObjectURL(blob) };
    }

    // 2. Route to Server-side Engines (PDF to Word/Excel/PPT, OCR)
    return await this.serverConverter(file, operation, options);
  }

  async serverConverter(file, operation, options) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("operation", operation);
    
    // Support both naming conventions from the UI
    if (options.ocr || options.useOcr) formData.append("ocr", "true");
    if (options.ocrLanguage) formData.append("language", options.ocrLanguage);
    if (options.pageRange) formData.append("pageRange", options.pageRange);

    const response = await fetch(`${API_BASE_URL}/api/convert`, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      // Safely handle 502/504 Bad Gateway HTML errors if the server drops
      const err = await response.json().catch(() => ({ error: "Backend server is unreachable." }));
      throw new Error(err.error || "Server conversion failed.");
    }
    
    const { jobId } = await response.json();
    return await this.pollJobStatus(jobId);
  }

  async pollJobStatus(jobId) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`);
          if (!res.ok) {
            clearInterval(interval);
            return reject(new Error(`Server error: ${res.statusText}`));
          }
          
          const data = await res.json();
          if (data.status === "completed") {
            clearInterval(interval);
            resolve({
              downloadUrl: `${API_BASE_URL}${data.downloadUrl}`,
              warnings: data.warnings,
            });
          } else if (data.status === "failed") {
            clearInterval(interval);
            reject(new Error(data.error || "Job failed on the server."));
          }
        } catch (error) {
          clearInterval(interval);
          reject(new Error("Failed to communicate with the server."));
        }
      }, 2000);
    });
  }

  async processBatch(files, operation, options = {}, onProgressUpdate) {
    const results = [];
    
    // For merge, we pass the entire array at once, not individually
    if (operation === "merge" || operation === "jpg-to-pdf") {
      onProgressUpdate({ index: 0, id: "batch", status: "processing" });
      try {
        const res = await this.processJob(files, operation, options);
        onProgressUpdate({ index: 0, id: "batch", status: "success", url: res.downloadUrl });
        return [{ file: "batch", status: "success", url: res.downloadUrl }];
      } catch (err) {
        onProgressUpdate({ index: 0, id: "batch", status: "failed", error: err.message });
        return [{ file: "batch", status: "failed", error: err.message }];
      }
    }

    // For server conversions, process individually
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      onProgressUpdate({ index: i, id: file.name, status: "processing" });
      try {
        const res = await this.processJob(file, operation, options);
        onProgressUpdate({
          index: i,
          id: file.name,
          status: "success",
          url: res.downloadUrl,
        });
        results.push({
          file: file.name,
          status: "success",
          url: res.downloadUrl,
        });
      } catch (err) {
        onProgressUpdate({
          index: i,
          id: file.name,
          status: "failed",
          error: err.message,
        });
        results.push({ file: file.name, status: "failed", error: err.message });
      }
    }
    return results;
  }
}

export const conversionService = new ConversionService();
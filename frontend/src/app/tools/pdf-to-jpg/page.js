'use client';
import { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import PrivacyNotice from '@/components/PrivacyNotice';
import { pdfToJpgLocal } from '@/utils/pdfEngine';
import { FileText, Download, Loader2, FileArchive } from 'lucide-react';

export default function PdfToJpgPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, processing, success, error
  const [resultUrl, setResultUrl] = useState(null);

  const handleFileSelect = (files) => {
    // Only accept the first file
    setFile(files[0]);
  };

  const handleConvert = async () => {
    if (!file) return;
    setStatus('processing');
    
    try {
      // This will return a JSZip generated Blob
      const zipBlob = await pdfToJpgLocal(file);
      const url = URL.createObjectURL(zipBlob);
      setResultUrl(url);
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary text-center mb-2">PDF to JPG</h1>
        <p className="text-text-secondary text-center mb-10">Extract every page of your PDF into high-quality JPG images.</p>

        {status === 'idle' && (
          <>
            {!file ? (
              <FileDropzone 
                onFilesSelected={handleFileSelect} 
                accept="application/pdf" 
                multiple={false} 
              />
            ) : (
              <div className="max-w-2xl mx-auto bg-surface rounded-xl border border-border p-6 mb-4 shadow-sm text-center">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-text-primary mb-1">{file.name}</h3>
                <p className="text-sm text-text-muted mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setFile(null)}
                    className="w-1/3 py-3 border border-border text-text-secondary hover:bg-secondary rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleConvert}
                    className="w-2/3 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors"
                  >
                    Extract Images
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {status === 'processing' && (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary">Extracting Pages...</h3>
            <p className="text-text-secondary mt-2">Rendering PDF pages to images and creating a ZIP file.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-16 bg-surface rounded-xl border border-border mt-8 max-w-2xl mx-auto">
            <FileArchive className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">Images Extracted</h2>
            <p className="text-text-secondary mb-8">Your images have been packaged into a ZIP file.</p>
            
            <a 
              href={resultUrl} 
              download={`${file.name.replace('.pdf', '')}_images.zip`}
              className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold text-lg transition-colors"
            >
              <Download className="w-5 h-5 mr-2" /> Download ZIP
            </a>
            
            <div className="mt-6">
              <button onClick={() => { setStatus('idle'); setFile(null); }} className="text-primary hover:underline">
                Extract another PDF
              </button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-16 bg-surface rounded-xl border border-error mt-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-error mb-2">Conversion Failed</h2>
            <p className="text-text-secondary mb-6">We couldn't extract the images from this PDF. It might be password protected or corrupted.</p>
            <button onClick={() => { setStatus('idle'); setFile(null); }} className="text-primary hover:underline">
              Try a different file
            </button>
          </div>
        )}

        <PrivacyNotice type="local" />
      </div>
    </main>
  );
}
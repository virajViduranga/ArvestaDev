'use client';
import { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import PrivacyNotice from '@/components/PrivacyNotice';
import SortableFileList from '@/components/SortableFileList';
import { imagesToPdfLocal } from '@/utils/pdfEngine';
import { Image as ImageIcon, X, Download, Loader2 } from 'lucide-react';

export default function JpgToPdfPage() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, processing, success, error
  const [resultUrl, setResultUrl] = useState(null);

  const handleFiles = (newFiles) => {
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setStatus('processing');
    
    try {
      // Direct call to the local engine
      const pdfBlob = await imagesToPdfLocal(files);
      const url = URL.createObjectURL(pdfBlob);
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
        <h1 className="text-3xl font-bold text-text-primary text-center mb-2">JPG to PDF</h1>
        <p className="text-text-secondary text-center mb-10">Convert multiple JPG or PNG images into a single PDF document.</p>

        {status === 'idle' && (
          <>
            <FileDropzone 
              onFilesSelected={handleFiles} 
              accept="image/jpeg, image/png" 
              multiple={true} 
            />
            
            {files.length > 0 && (
              <div className="mt-8 bg-surface rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold text-text-primary mb-4">Selected Images ({files.length})</h3>
                <SortableFileList 
                files={files} 
                setFiles={setFiles} 
                onRemove={removeFile} 
                iconType="image" 
                />
                
                <button 
                  onClick={handleConvert}
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors"
                >
                  Convert to PDF
                </button>
              </div>
            )}
          </>
        )}

        {status === 'processing' && (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary">Generating PDF...</h3>
            <p className="text-text-secondary">Processing images locally in your browser.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-16 bg-surface rounded-xl border border-border mt-8">
            <div className="w-16 h-16 bg-success-bg text-success rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Done!</h2>
            <p className="text-text-secondary mb-8">Your images have been converted to a PDF.</p>
            
            <a 
              href={resultUrl} 
              download="converted-images.pdf"
              className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold text-lg transition-colors"
            >
              <Download className="w-5 h-5 mr-2" /> Download PDF
            </a>
            
            <div className="mt-6">
              <button onClick={() => { setStatus('idle'); setFiles([]); }} className="text-primary hover:underline">
                Convert more images
              </button>
            </div>
          </div>
        )}

        <PrivacyNotice type="local" />
      </div>
    </main>
  );
}
'use client';
import { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import PrivacyNotice from '@/components/PrivacyNotice';
import { mergePdfsLocal } from '@/utils/pdfEngine';
import { FileText, X, Download, Loader2 } from 'lucide-react';

export default function MergePdfPage() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, processing, success, error
  const [resultUrl, setResultUrl] = useState(null);

  const handleFiles = (newFiles) => {
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setStatus('processing');
    
    try {
      const mergedBlob = await mergePdfsLocal(files);
      const url = URL.createObjectURL(mergedBlob);
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
        <h1 className="text-3xl font-bold text-text-primary text-center mb-2">Merge PDF Files</h1>
        <p className="text-text-secondary text-center mb-10">Combine multiple PDFs into one document directly in your browser.</p>

        {status === 'idle' && (
          <>
            <FileDropzone onFilesSelected={handleFiles} accept="application/pdf" multiple={true} />
            
            {files.length > 0 && (
              <div className="mt-8 bg-surface rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold text-text-primary mb-4">Selected Files ({files.length})</h3>
                <ul className="space-y-2 mb-6">
                  {files.map((file, i) => (
                    <li key={i} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-primary mr-3" />
                        <span className="text-text-primary font-medium">{file.name}</span>
                        <span className="text-text-muted text-sm ml-3">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                      <button onClick={() => removeFile(i)} className="text-text-muted hover:text-error p-1" aria-label="Remove file">
                        <X className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={handleMerge}
                  disabled={files.length < 2}
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold disabled:opacity-50 transition-colors"
                >
                  {files.length < 2 ? 'Select at least 2 files to merge' : 'Merge PDFs'}
                </button>
              </div>
            )}
          </>
        )}

        {status === 'processing' && (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary">Processing your files...</h3>
            <p className="text-text-secondary">Merging documents locally.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-16 bg-surface rounded-xl border border-border mt-8">
            <div className="w-16 h-16 bg-success-bg text-success rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Done!</h2>
            <p className="text-text-secondary mb-8">Your PDFs have been successfully merged.</p>
            
            <a 
              href={resultUrl} 
              download="merged-document.pdf"
              className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold text-lg transition-colors"
            >
              <Download className="w-5 h-5 mr-2" /> Download Merged PDF
            </a>
            
            <div className="mt-6">
              <button onClick={() => { setStatus('idle'); setFiles([]); }} className="text-primary hover:underline">
                Merge more files
              </button>
            </div>
          </div>
        )}

        <PrivacyNotice />
      </div>
    </main>
  );
}
'use client';
import { useState } from 'react';
import FileDropzone from '@/components/ui/FileDropzone';
import PrivacyNotice from '@/components/pdf/PrivacyNotice';
import BatchList from '@/components/pdf/BatchList';
import { conversionService } from '@/services/conversionService';

export default function WordToPdfPage() {
  // Batch state holds objects: { name, status, url, error }
  const [batchFiles, setBatchFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFiles = async (selectedFiles) => {
    // Initialize batch UI state
    const initialBatch = selectedFiles.map(f => ({ 
      name: f.name, 
      status: 'waiting', 
      url: null, 
      error: null 
    }));
    setBatchFiles(initialBatch);
    setIsProcessing(true);

    // Process using the service and pass a callback to update UI per file
    await conversionService.processBatch(
      selectedFiles, 
      'word-to-pdf', 
      {}, 
      (update) => {
        setBatchFiles(prev => {
          const newBatch = [...prev];
          newBatch[update.index] = { ...newBatch[update.index], ...update };
          return newBatch;
        });
      }
    );

    setIsProcessing(false);
  };

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary text-center mb-2">Word to PDF</h1>
        <p className="text-text-secondary text-center mb-10">Securely convert Word documents to PDF formatting. Supports batch processing.</p>

        {!isProcessing && batchFiles.length === 0 && (
          <FileDropzone 
            onFilesSelected={handleFiles} 
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
            multiple={true} 
          />
        )}

        {batchFiles.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BatchList files={batchFiles} />
            
            {!isProcessing && (
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setBatchFiles([])}
                  className="text-primary hover:underline font-medium"
                >
                  Convert more files
                </button>
              </div>
            )}
          </div>
        )}

        <PrivacyNotice type="server" />
      </div>
    </main>
  );
}
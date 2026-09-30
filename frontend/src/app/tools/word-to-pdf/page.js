'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import PrivacyNotice from '@/components/PrivacyNotice';
import BatchList from '@/components/BatchList';
import { conversionService } from '@/services/conversionService';
import ToolSeoSection from '@/components/ToolSeoSection';

export default function WordToPdfPage() {
  const router = useRouter();
  const [batchFiles, setBatchFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFiles = async (selectedFiles) => {
    // Initialize batch UI state with progress properties
    const initialBatch = selectedFiles.map(f => ({ 
      name: f.name, 
      status: 'waiting', 
      progress: 0,
      url: null, 
      error: null 
    }));
    setBatchFiles(initialBatch);
    setIsProcessing(true);

    // 1. Start a fake progress timer for every file in the batch
    const progressIntervals = selectedFiles.map((_, index) => {
      return setInterval(() => {
        setBatchFiles((prev) => {
          const newBatch = [...prev];
          const currentProgress = newBatch[index].progress || 0;
          
          // Only increment if the service has moved it to 'processing' status
          if (newBatch[index].status === 'processing' && currentProgress < 90) {
            newBatch[index] = { ...newBatch[index], progress: currentProgress + 5 };
            return newBatch;
          }
          return prev; // Do nothing if waiting, success, or failed
        });
      }, 500);
    });

    // 2. Process using your existing, working conversionService
    await conversionService.processBatch(
      selectedFiles, 
      'word-to-pdf', 
      {}, 
      (update) => {
        // 3. Clear the timer for this specific file when it finishes or fails
        if (update.status === 'success' || update.status === 'failed') {
          clearInterval(progressIntervals[update.index]);
          if (update.status === 'success') {
            update.progress = 100; // Jump to 100% on success
          }
        }

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
    <main className="min-h-screen bg-[var(--color-background)] transition-colors duration-200 py-12 px-4 relative">
      <button 
        onClick={() => router.back()} 
        className="absolute top-6 left-8 md:left-16 lg:left-32 p-2 text-white bg-[var(--color-primary-hover)] hover:bg-white hover:text-[var(--color-primary-hover)] transition-all duration-200 rounded-full cursor-pointer shadow-sm hover:shadow-md"
        aria-label="Go back"
      >
        <ArrowLeft className="w-8 h-8" />
      </button>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] text-center mb-2">Word to PDF</h1>
        <p className="text-[var(--color-text-secondary)] text-center mb-10">Securely convert Word documents to PDF formatting. Supports batch processing.</p>

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
                  className="text-[var(--color-primary)] hover:underline font-medium cursor-pointer"
                >
                  Convert more files
                </button>
              </div>
            )}
          </div>
        )}

        <PrivacyNotice type="server" />
        
        <ToolSeoSection 
          steps={[
            {
              title: "Select Word Files",
              description: "Upload one or more DOC or DOCX files you want to convert."
            },
            {
              title: "Process Automatically",
              description: "Our secure server instantly converts your Word documents to PDF."
            },
            {
              title: "Download PDFs",
              description: "Download the converted PDF files to your device."
            }
          ]}
          faqs={[
            {
              question: "Will the PDF look exactly like my Word document?",
              answer: "Yes, our converter accurately preserves the layout, fonts, and images of your original Word document."
            },
            {
              question: "Can I convert multiple Word documents at once?",
              answer: "Yes, you can upload and batch convert multiple Word documents to PDF simultaneously."
            },
            {
              question: "Are my files secure?",
              answer: "Your files are transmitted securely via encrypted connections and deleted from our servers automatically after processing."
            }
          ]}
        />
      </div>
    </main>
  );
}
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
    <main className="min-h-screen bg-[var(--color-background)] transition-colors duration-200 py-12 px-4 relative">
      <button 
        onClick={() => router.back()} 
        className="absolute top-6 left-8 md:left-16 lg:left-32 p-2 text-white bg-[var(--color-primary-hover)] hover:bg-white hover:text-[var(--color-primary-hover)] transition-all duration-200 rounded-full cursor-pointer shadow-sm hover:shadow-md"
        aria-label="Go back"
      >
        <ArrowLeft className="w-8 h-8" />
      </button>
      <div className="max-w-4xl mx-auto">
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
                  className="text-[var(--color-primary)] hover:underline font-medium"
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
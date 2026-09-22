'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import PrivacyNotice from '@/components/PrivacyNotice';
import SortableFileList from '@/components/SortableFileList';
import { imagesToPdfLocal } from '@/utils/pdfEngine';
import { ArrowLeft,  Image as ImageIcon, X, Download, Loader2  } from 'lucide-react';
import ToolSeoSection from '@/components/ToolSeoSection';
export default function JpgToPdfPage() {
  const router = useRouter();
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
    <main className="min-h-screen bg-[var(--color-background)] transition-colors duration-200 py-12 px-4 relative">
      <button 
        onClick={() => router.back()} 
        className="absolute top-6 left-8 md:left-16 lg:left-32 p-2 text-white bg-[var(--color-primary-hover)] hover:bg-white hover:text-[var(--color-primary-hover)] transition-all duration-200 rounded-full cursor-pointer shadow-sm hover:shadow-md"
        aria-label="Go back"
      >
        <ArrowLeft className="w-8 h-8" />
      </button>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] text-center mb-2">JPG to PDF</h1>
        <p className="text-[var(--color-text-secondary)] text-center mb-10">Convert multiple JPG or PNG images into a single PDF document.</p>

        {status === 'idle' && (
          <>
            <FileDropzone 
              onFilesSelected={handleFiles} 
              accept="image/jpeg, image/png" 
              multiple={true} 
            />
            
            {files.length > 0 && (
              <div className="mt-8 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Selected Images ({files.length})</h3>
                <SortableFileList 
                files={files} 
                setFiles={setFiles} 
                onRemove={removeFile} 
                iconType="image" 
                />
                
                <button 
                  onClick={handleConvert}
                  className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-on-primary)] rounded-lg font-semibold transition-colors"
                >
                  Convert to PDF
                </button>
              </div>
            )}
          </>
        )}

        {status === 'processing' && (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 text-[var(--color-primary)] animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Generating PDF...</h3>
            <p className="text-[var(--color-text-secondary)]">Processing images locally in your browser.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-16 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] mt-8">
            <div className="w-16 h-16 bg-[var(--color-success-bg)] text-[var(--color-success)] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Done!</h2>
            <p className="text-[var(--color-text-secondary)] mb-8">Your images have been converted to a PDF.</p>
            
            <a 
              href={resultUrl} 
              download="converted-images.pdf"
              className="inline-flex items-center px-8 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-on-primary)] rounded-lg font-semibold text-lg transition-colors"
            >
              <Download className="w-5 h-5 mr-2" /> Download PDF
            </a>
            
            <div className="mt-6">
              <button onClick={() => { setStatus('idle'); setFiles([]); }} className="text-[var(--color-primary)] hover:underline">
                Convert more images
              </button>
            </div>
          </div>
        )}

        <PrivacyNotice type="local" />

        <ToolSeoSection 
          steps={[
            {
              title: "Upload Images",
              description: "Drag and drop your JPG or PNG images, or click to browse files."
            },
            {
              title: "Arrange & Order",
              description: "Drag to reorder your images exactly how you want them to appear in the PDF."
            },
            {
              title: "Generate PDF",
              description: "Click convert to instantly generate and download your combined PDF."
            }
          ]}
          faqs={[
            {
              question: "Can I upload both JPG and PNG images?",
              answer: "Yes, our tool supports both JPG and PNG image formats. You can mix and match them into a single PDF."
            },
            {
              question: "Are my images uploaded to your servers?",
              answer: "No, all processing happens locally in your web browser. Your images are never uploaded to our servers, ensuring total privacy."
            },
            {
              question: "Can I rearrange the order of the images?",
              answer: "Yes, you can easily drag and drop the uploaded images to change their order before converting to PDF."
            }
          ]}
        />
      </div>
    </main>
  );
}
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import PrivacyNotice from '@/components/PrivacyNotice';
import { pdfToJpgLocal } from '@/utils/pdfEngine';
import { ArrowLeft,  FileText, Download, Loader2, FileArchive  } from 'lucide-react';
import ToolSeoSection from '@/components/ToolSeoSection';
export default function PdfToJpgPage() {
  const router = useRouter();
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
    <main className="min-h-screen bg-[var(--color-background)] transition-colors duration-200 py-12 px-4 relative">
      <button 
        onClick={() => router.back()} 
        className="absolute top-6 left-8 md:left-16 lg:left-32 p-2 text-white bg-[var(--color-primary-hover)] hover:bg-white hover:text-[var(--color-primary-hover)] transition-all duration-200 rounded-full cursor-pointer shadow-sm hover:shadow-md"
        aria-label="Go back"
      >
        <ArrowLeft className="w-8 h-8" />
      </button>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] text-center mb-2">PDF to JPG</h1>
        <p className="text-[var(--color-text-secondary)] text-center mb-10">Extract every page of your PDF into high-quality JPG images.</p>

        {status === 'idle' && (
          <>
            {!file ? (
              <FileDropzone 
                onFilesSelected={handleFileSelect} 
                accept="application/pdf" 
                multiple={false} 
              />
            ) : (
              <div className="max-w-2xl mx-auto bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 mb-4 shadow-sm text-center">
                <FileText className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{file.name}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setFile(null)}
                    className="w-1/3 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)] rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleConvert}
                    className="w-2/3 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-on-primary)] rounded-lg font-semibold transition-colors"
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
            <Loader2 className="w-12 h-12 text-[var(--color-primary)] animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Extracting Pages...</h3>
            <p className="text-[var(--color-text-secondary)] mt-2">Rendering PDF pages to images and creating a ZIP file.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-16 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] mt-8 max-w-2xl mx-auto">
            <FileArchive className="w-16 h-16 text-[var(--color-success)] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Images Extracted</h2>
            <p className="text-[var(--color-text-secondary)] mb-8">Your images have been packaged into a ZIP file.</p>
            
            <a 
              href={resultUrl} 
              download={`${file.name.replace('.pdf', '')}_images.zip`}
              className="inline-flex items-center px-8 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-on-primary)] rounded-lg font-semibold text-lg transition-colors"
            >
              <Download className="w-5 h-5 mr-2" /> Download ZIP
            </a>
            
            <div className="mt-6">
              <button onClick={() => { setStatus('idle'); setFile(null); }} className="text-[var(--color-primary)] hover:underline">
                Extract another PDF
              </button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-16 bg-[var(--color-surface)] rounded-xl border border-[var(--color-error)] mt-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-[var(--color-error)] mb-2">Conversion Failed</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">We couldn't extract the images from this PDF. It might be password protected or corrupted.</p>
            <button onClick={() => { setStatus('idle'); setFile(null); }} className="text-[var(--color-primary)] hover:underline">
              Try a different file
            </button>
          </div>
        )}

        <PrivacyNotice type="local" />

        <ToolSeoSection 
          steps={[
            {
              title: "Upload PDF",
              description: "Select or drag & drop the PDF document you want to extract images from."
            },
            {
              title: "Extract Images",
              description: "Our tool processes your PDF locally to extract every page as a high-quality JPG."
            },
            {
              title: "Download ZIP",
              description: "Download a single ZIP file containing all the extracted JPG images."
            }
          ]}
          faqs={[
            {
              question: "Will the extracted images be high quality?",
              answer: "Yes, we extract each page of your PDF as a high-resolution JPG image to maintain clarity and detail."
            },
            {
              question: "Are my PDF files uploaded to the server?",
              answer: "No, all extraction processes happen directly in your web browser. Your files are entirely secure and private."
            },
            {
              question: "Can I extract images from large PDFs?",
              answer: "Yes, our tool handles large PDFs effectively, generating a ZIP file with all images for a quick and easy download."
            }
          ]}
        />
      </div>
    </main>
  );
}
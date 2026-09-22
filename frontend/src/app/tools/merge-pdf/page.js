'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import PrivacyNotice from '@/components/PrivacyNotice';
import { mergePdfsLocal } from '@/utils/pdfEngine';
import ToolSeoSection from '@/components/ToolSeoSection';
import SortableFileList from '@/components/SortableFileList';
import { ArrowLeft, FileText, X, Download, Loader2 } from 'lucide-react';

export default function MergePdfPage() {
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
    <main className="min-h-screen bg-[var(--color-background)] transition-colors duration-200 py-12 px-4 relative">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-8 md:left-16 lg:left-32 p-2 text-white bg-[var(--color-primary-hover)] hover:bg-white hover:text-[var(--color-primary-hover)] transition-all duration-200 rounded-full cursor-pointer shadow-sm hover:shadow-md"
        aria-label="Go back"
      >
        <ArrowLeft className="w-8 h-8" />
      </button>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] text-center mb-2">Merge PDF Files</h1>
        <p className="text-[var(--color-text-secondary)] text-center mb-10">Combine multiple PDFs into one document directly in your browser.</p>

        {status === 'idle' && (
          <>
            <FileDropzone onFilesSelected={handleFiles} accept="application/pdf" multiple={true} />

            {files.length > 0 && (
              <div className="mt-8 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Selected Files ({files.length})</h3>
                <SortableFileList
                  files={files}
                  setFiles={setFiles}
                  onRemove={removeFile}
                  iconType="file"
                />

                <button
                  onClick={handleMerge}
                  disabled={files.length < 2}
                  className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-on-primary)] rounded-lg font-semibold disabled:opacity-50 transition-colors"
                >
                  {files.length < 2 ? 'Select at least 2 files to merge' : 'Merge PDFs'}
                </button>
              </div>
            )}
          </>
        )}

        {status === 'processing' && (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 text-[var(--color-primary)] animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Processing your files...</h3>
            <p className="text-[var(--color-text-secondary)]">Merging documents locally.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-16 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] mt-8">
            <div className="w-16 h-16 bg-[var(--color-success-bg)] text-[var(--color-success)] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Done!</h2>
            <p className="text-[var(--color-text-secondary)] mb-8">Your PDFs have been successfully merged.</p>

            <a
              href={resultUrl}
              download="merged-document.pdf"
              className="inline-flex items-center px-8 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-on-primary)] rounded-lg font-semibold text-lg transition-colors"
            >
              <Download className="w-5 h-5 mr-2" /> Download Merged PDF
            </a>

            <div className="mt-6">
              <button onClick={() => { setStatus('idle'); setFiles([]); }} className="text-[var(--color-primary)] hover:underline">
                Merge more files
              </button>
            </div>
          </div>
        )}

        <PrivacyNotice type="local" />

        <ToolSeoSection
          steps={[
            {
              title: "Upload PDF Files",
              description: "Select or drag and drop two or more PDF documents you want to combine."
            },
            {
              title: "Arrange Order",
              description: "Drag the files to arrange them in the exact order you want them to appear in the final PDF."
            },
            {
              title: "Merge and Download",
              description: "Click merge to securely combine your PDFs into a single document instantly."
            }
          ]}
          faqs={[
            {
              question: "Is it secure to merge my sensitive PDFs here?",
              answer: "Yes! Our tool processes all PDF merging locally in your web browser. Your files are never uploaded to external servers, ensuring your sensitive data remains completely private."
            },
            {
              question: "Is there a limit on the number of PDFs I can merge?",
              answer: "You can merge multiple PDFs at once. Since the processing happens entirely on your device, the practical limit depends entirely on your device's memory."
            },
            {
              question: "Will the original quality be maintained?",
              answer: "Absolutely. The tool combines the PDF files directly without compressing or altering their contents, ensuring that the original text, images, and formatting are perfectly preserved."
            }
          ]}
        />
      </div>
    </main>
  );
}
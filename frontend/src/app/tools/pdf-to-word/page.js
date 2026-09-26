'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import PrivacyNotice from '@/components/PrivacyNotice';
import AdvancedOptions from '@/components/AdvancedOptions';
import { analyzeDocument } from '@/utils/documentAnalyzer';
import { conversionService } from '@/services/conversionService';
import { ArrowLeft, FileText, Download, AlertTriangle, FileSearch, Loader2 } from 'lucide-react';
import ToolSeoSection from '@/components/ToolSeoSection';
export default function PdfToWordPage() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, analyzing, ready, processing, success, error
  const [options, setOptions] = useState({});
  const [result, setResult] = useState(null);

  const handleFileSelect = async (files) => {
    const selected = files[0];
    setFile(selected);
    setStatus('analyzing');

    try {
      const docData = await analyzeDocument(selected);
      setAnalysis(docData);

      // Smart Defaults: If scanned, auto-suggest OCR in the options
      if (docData.isLikelyScanned) {
        setOptions(prev => ({ ...prev, useOcr: true }));
      }
      setStatus('ready');
    } catch (err) {
      console.error(err);
      setStatus('ready'); // fallback to ready even if analysis fails
    }
  };

  const handleConvert = async () => {
    setStatus('processing');
    try {
      const res = await conversionService.processJob(file, 'pdf-to-word', options);
      setResult(res);
      setStatus('success');
    } catch (err) {
      setResult({ error: err.message });
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] py-12 px-4 transition-colors duration-200 relative">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-8 md:left-16 lg:left-32 p-2 text-white bg-[var(--color-primary-hover)] hover:bg-white hover:text-[var(--color-primary-hover)] transition-all duration-200 rounded-full cursor-pointer shadow-sm hover:shadow-md"
        aria-label="Go back"
      >
        <ArrowLeft className="w-8 h-8" />
      </button>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] text-center mb-2">PDF to Word</h1>
        <p className="text-[var(--color-text-secondary)] text-center mb-10">Convert PDFs into editable Word documents, preserving formatting.</p>

        {status === 'idle' && (
          <FileDropzone onFilesSelected={handleFileSelect} accept="application/pdf" multiple={false} />
        )}

        {status === 'analyzing' && (
          <div className="text-center py-20 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-sm">
            <FileSearch className="w-12 h-12 text-[var(--color-primary)] animate-pulse mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Analyzing Document...</h3>
          </div>
        )}

        {status === 'ready' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 mb-4 shadow-sm">
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-[var(--color-primary)] mr-4" />
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{file.name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{(file.size / 1024 / 1024).toFixed(2)} MB • {analysis?.numPages || '?'} pages</p>
                </div>
              </div>

              {analysis?.isLikelyScanned && (
                <div className="mb-6 p-4 bg-[var(--color-warning-bg)] border border-[var(--color-warning)] rounded-lg flex items-start">
                  <AlertTriangle className="w-5 h-5 text-[var(--color-warning)] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[var(--color-warning)] text-sm mb-1">Scanned Document Detected</h4>
                    <p className="text-sm text-[var(--color-warning)] opacity-90 mb-2">This PDF appears to be images. OCR is required to extract editable text.</p>
                  </div>
                </div>
              )}

              <button
                onClick={handleConvert}
                className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-on-primary)] rounded-lg font-semibold transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Convert to Word
              </button>
            </div>

            <AdvancedOptions onOptionsChange={setOptions} showOcr={true} />
          </div>
        )}

        {status === 'processing' && (
          <div className="text-center py-20 max-w-2xl mx-auto bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-sm">
            <Loader2 className="w-12 h-12 text-[var(--color-primary)] animate-spin mx-auto mb-6" />
            <div className="space-y-4 text-left border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-background)] mx-8">
              <p className="flex items-center text-[var(--color-text-primary)]"><span className="w-6 text-[var(--color-success)] font-bold">✓</span> Reading file</p>
              <p className="flex items-center text-[var(--color-text-primary)]"><span className="w-6 text-[var(--color-success)] font-bold">✓</span> Analyzing layout</p>
              <p className="flex items-center text-[var(--color-text-primary)] font-medium">
                <Loader2 className="w-4 h-4 animate-spin mr-2 text-[var(--color-primary)]" /> {options.useOcr ? 'Running OCR engine...' : 'Converting to DOCX...'}
              </p>
              <p className="flex items-center text-[var(--color-text-muted)]"><span className="w-6"></span> Preparing download</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-16 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-sm mt-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[var(--color-success-bg)] text-[var(--color-success)] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Conversion Complete</h2>

            {result?.warnings && (
              <div className="inline-block mt-2 mb-6 p-3 bg-[var(--color-warning-bg)] text-[var(--color-warning)] text-sm rounded-lg border border-[var(--color-warning)]">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                {result.warnings}
              </div>
            )}

            <a
              href={result?.downloadUrl}
              download
              className="inline-flex items-center px-8 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-on-primary)] rounded-lg font-semibold text-lg mt-4 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <Download className="w-5 h-5 mr-2" /> Download Word Document
            </a>
          </div>
        )}

        <PrivacyNotice type="server" />

        <ToolSeoSection
          steps={[
            {
              title: "Upload PDF File",
              description: "Drag and drop your PDF document or click to select a file from your computer."
            },
            {
              title: "Choose Options",
              description: "Select advanced options like OCR for scanned documents, if necessary."
            },
            {
              title: "Convert and Download",
              description: "Click convert and download your perfectly formatted Word document."
            }
          ]}
          faqs={[
            {
              question: "Will my Word document look the same as the PDF?",
              answer: "Yes, our advanced conversion engine preserves formatting, fonts, layouts, and tables as closely as possible to the original document."
            },
            {
              question: "Is it safe to upload confidential documents?",
              answer: "Absolutely. All file transfers are encrypted, and files are automatically deleted from our servers immediately after conversion."
            },
            {
              question: "Can I convert scanned PDFs?",
              answer: "Yes, we offer OCR (Optical Character Recognition) capabilities to extract editable text from scanned images and PDFs."
            }
          ]}
        />
      </div>
    </main>
  );
}
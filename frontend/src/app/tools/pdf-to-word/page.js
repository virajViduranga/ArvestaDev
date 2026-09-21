'use client';
import { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import PrivacyNotice from '@/components/PrivacyNotice';
import AdvancedOptions from '@/components/AdvancedOptions';
import { analyzeDocument } from '@/utils/documentAnalyzer';
import { conversionService } from '@/services/conversionService';
import { FileText, Download, AlertTriangle, FileSearch, Loader2 } from 'lucide-react';

export default function PdfToWordPage() {
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
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary text-center mb-2">PDF to Word</h1>
        <p className="text-text-secondary text-center mb-10">Convert PDFs into editable Word documents, preserving formatting.</p>

        {status === 'idle' && (
          <FileDropzone onFilesSelected={handleFileSelect} accept="application/pdf" multiple={false} />
        )}

        {status === 'analyzing' && (
          <div className="text-center py-20">
            <FileSearch className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary">Analyzing Document...</h3>
          </div>
        )}

        {status === 'ready' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-surface rounded-xl border border-border p-6 mb-4">
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-primary mr-4" />
                <div>
                  <h3 className="font-semibold text-text-primary">{file.name}</h3>
                  <p className="text-sm text-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB • {analysis?.numPages || '?'} pages</p>
                </div>
              </div>

              {analysis?.isLikelyScanned && (
                <div className="mb-6 p-4 bg-warning-bg border border-warning rounded-lg flex items-start">
                  <AlertTriangle className="w-5 h-5 text-warning mr-3 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-warning text-sm mb-1">Scanned Document Detected</h4>
                    <p className="text-sm text-warning opacity-90 mb-2">This PDF appears to be images. OCR is required to extract editable text.</p>
                  </div>
                </div>
              )}

              <button 
                onClick={handleConvert}
                className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors"
              >
                Convert to Word
              </button>
            </div>
            
            <AdvancedOptions onOptionsChange={setOptions} showOcr={true} />
          </div>
        )}

        {status === 'processing' && (
          <div className="text-center py-20 max-w-2xl mx-auto">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
            <div className="space-y-4 text-left border border-border rounded-lg p-6 bg-surface">
              <p className="flex items-center text-text-primary"><span className="w-6 text-success">✓</span> Reading file</p>
              <p className="flex items-center text-text-primary"><span className="w-6 text-success">✓</span> Analyzing layout</p>
              <p className="flex items-center text-text-primary font-medium">
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> {options.useOcr ? 'Running OCR engine...' : 'Converting to DOCX...'}
              </p>
              <p className="flex items-center text-text-muted"><span className="w-6"></span> Preparing download</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-16 bg-surface rounded-xl border border-border mt-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-success-bg text-success rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Conversion Complete</h2>
            
            {result?.warnings && (
              <div className="inline-block mt-2 mb-6 p-3 bg-warning-bg text-warning text-sm rounded-lg border border-warning border-opacity-30">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                {result.warnings}
              </div>
            )}
            
            <a 
              href={result?.downloadUrl} 
              className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold text-lg mt-4 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" /> Download Word Document
            </a>
          </div>
        )}

        {/* Server-side privacy notice because this is a heavy conversion */}
        <PrivacyNotice type="server" />
      </div>
    </main>
  );
}
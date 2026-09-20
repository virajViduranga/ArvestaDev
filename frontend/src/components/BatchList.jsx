'use client';
import { FileText, Loader2, CheckCircle, AlertCircle, Download } from 'lucide-react';

export default function BatchList({ files }) {
  if (!files || files.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 bg-surface rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 bg-secondary border-b border-border">
        <h3 className="font-semibold text-text-primary">Processing {files.length} files</h3>
      </div>
      <ul className="divide-y divide-border">
        {files.map((file, i) => (
          <li key={i} className="p-4 flex items-center justify-between hover:bg-secondary-hover transition-colors">
            <div className="flex items-center truncate mr-4">
              <FileText className="w-5 h-5 text-text-muted mr-3 shrink-0" />
              <span className="truncate text-text-primary font-medium">{file.name}</span>
            </div>
            
            <div className="flex items-center shrink-0">
              {file.status === 'waiting' && <span className="text-text-muted text-sm">Waiting...</span>}
              
              {file.status === 'processing' && (
                <span className="flex items-center text-primary text-sm font-medium">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Converting
                </span>
              )}
              
              {file.status === 'success' && (
                <a 
                  href={file.url} 
                  download 
                  className="flex items-center px-3 py-1.5 bg-success-bg text-success hover:bg-success hover:text-white rounded-md text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4 mr-1.5" /> Download
                </a>
              )}
              
              {file.status === 'failed' && (
                <span className="flex items-center text-error text-sm" title={file.error}>
                  <AlertCircle className="w-4 h-4 mr-1.5" /> Failed
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
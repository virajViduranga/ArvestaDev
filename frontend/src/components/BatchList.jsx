'use client';
import { FileText, Loader2, CheckCircle, AlertCircle, Download } from 'lucide-react';

export default function BatchList({ files }) {
  if (!files || files.length === 0) return null;

return (
  <div className="w-full max-w-2xl mx-auto mt-6 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] overflow-hidden">
    <div className="px-6 py-4 bg-[var(--color-secondary)] border-b border-[var(--color-border)]">
      <h3 className="font-semibold text-[var(--color-text-primary)]">Processing {files.length} files</h3>
    </div>
    <ul className="divide-y divide-[var(--color-border)]">
      {files.map((file, i) => (
        <li key={i} className="p-4 flex items-center justify-between hover:bg-[var(--color-secondary-hover)] transition-colors">
          <div className="flex items-center truncate mr-4">
            <FileText className="w-5 h-5 text-[var(--color-text-muted)] mr-3 shrink-0" />
            <span className="truncate text-[var(--color-text-primary)] font-medium">{file.name}</span>
          </div>
          
          <div className="flex items-center shrink-0">
            {file.status === 'waiting' && <span className="text-[var(--color-text-muted)] text-sm">Waiting...</span>}
            
            {file.status === 'processing' && (
              <span className="flex items-center text-[var(--color-primary)] text-sm font-medium">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Converting
              </span>
            )}
            
            {file.status === 'success' && (
              <a 
                href={file.url} 
                download 
                className="flex items-center px-3 py-1.5 bg-[var(--color-success-bg)] text-[var(--color-success)] hover:bg-[var(--color-success)] hover:text-[var(--color-text-on-primary)] rounded-md text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4 mr-1.5" /> Download
              </a>
            )}
            
            {file.status === 'failed' && (
              <span className="flex items-center text-[var(--color-error)] text-sm" title={file.error}>
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
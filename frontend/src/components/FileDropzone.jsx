'use client';
import { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';

export default function FileDropzone({ onFilesSelected, accept, maxSizeMB = 50, multiple = true }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validateAndProcessFiles = (files) => {
    setError(null);
    const validFiles = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    for (let file of files) {
      if (file.size > maxSizeBytes) {
        setError(`"${file.name}" is too large. Maximum size is ${maxSizeMB}MB.`);
        return;
      }
      // Simple type validation based on 'accept' string (e.g., "application/pdf" or "image/jpeg")
      if (accept && !file.type.match(accept.replace('*', '.*'))) {
        setError(`"${file.name}" is not a supported file type.`);
        return;
      }
      validFiles.push(file);
    }
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
          ${isDragging ? 'border-primary bg-secondary' : 'border-border hover:border-primary'}`}
        tabIndex="0"
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
      >
        <UploadCloud className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-text-primary mb-2">Drag & drop your files here</h3>
        <p className="text-text-secondary mb-4">or click to browse your device</p>
        <p className="text-text-muted text-sm">Maximum file size: {maxSizeMB} MB</p>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={(e) => validateAndProcessFiles(Array.from(e.target.files))} 
          accept={accept}
          multiple={multiple}
          className="hidden" 
        />
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-error-bg text-error rounded-lg text-sm flex items-center">
          <span className="font-semibold mr-2">Error:</span> {error}
        </div>
      )}
    </div>
  );
}
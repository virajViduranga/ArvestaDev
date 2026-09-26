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
      // 1. Check File Size
      if (file.size > maxSizeBytes) {
        setError(`"${file.name}" is too large. Maximum size is ${maxSizeMB}MB.`);
        return;
      }

      // 2. Check File Type (The Fix)
      if (accept) {
        const acceptedTypes = accept.split(',').map(type => type.trim().toLowerCase());
        const fileType = file.type.toLowerCase();
        const fileName = file.name.toLowerCase();

        const isSupported = acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            // Checks extensions (e.g., .jpeg, .docx)
            return fileName.endsWith(type);
          } else if (type.endsWith('/*')) {
            // Checks wildcards (e.g., image/*)
            return fileType.startsWith(type.replace('/*', ''));
          } else {
            // Checks exact MIME types (e.g., image/jpeg)
            return fileType === type;
          }
        });

        if (!isSupported) {
          setError(`"${file.name}" is not a supported file type.`);
          return;
        }
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
  <div className="w-full h-screen p-4 flex flex-col">
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`flex-1 flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
        ${isDragging ? 'border-[var(--color-primary)] bg-[var(--color-secondary)]' : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'}`}
      tabIndex="0"
      onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
    >
      <UploadCloud className="w-16 h-16 text-[var(--color-primary)] mx-auto mb-6" />
      <h3 className="text-3xl font-semibold text-[var(--color-text-primary)] mb-4">Drag & drop your files here</h3>
      <p className="text-lg text-[var(--color-text-secondary)] mb-6">or click to browse your device</p>
      <p className="text-[var(--color-text-muted)] text-base">Maximum file size: {maxSizeMB} MB</p>

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
      <div className="mt-4 p-4 bg-[var(--color-error-bg)] text-[var(--color-error)] rounded-lg text-base flex items-center shrink-0">
        <span className="font-semibold mr-2">Error:</span> {error}
      </div>
    )}
  </div>
);
}
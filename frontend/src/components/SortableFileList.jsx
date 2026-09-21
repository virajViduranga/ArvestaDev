'use client';
import { useRef } from 'react';
import { GripVertical, X, FileText, Image as ImageIcon, Info } from 'lucide-react';

export default function SortableFileList({ files, setFiles, onRemove, iconType = 'file' }) {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    
    // Create a copy of the files array
    const _files = [...files];
    
    // Remove the dragged item and insert it at the hovered index
    const draggedFileContent = _files.splice(dragItem.current, 1)[0];
    _files.splice(dragOverItem.current, 0, draggedFileContent);
    
    // Reset refs
    dragItem.current = null;
    dragOverItem.current = null;
    
    // Update state in the parent component
    setFiles(_files);
  };

  return (
    <div>
      <p className="text-sm text-text-secondary flex items-center mb-3">
        <Info className="w-4 h-4 mr-2 text-primary" />
        You can drag and drop items to change their order before converting.
      </p>
      
      <ul className="space-y-2 mb-6 max-h-96 overflow-y-auto pr-2">
        {files.map((file, index) => (
          <li
            key={`${file.name}-${index}`}
            draggable
            onDragStart={(e) => {
              dragItem.current = index;
              e.dataTransfer.effectAllowed = 'move';
            }}
            onDragEnter={(e) => {
              dragOverItem.current = index;
            }}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            className="flex items-center justify-between p-3 bg-background border border-border rounded-lg cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
          >
            <div className="flex items-center w-full truncate pr-4">
              <GripVertical className="w-5 h-5 text-text-muted mr-3 shrink-0" />
              {iconType === 'image' ? (
                <ImageIcon className="w-5 h-5 text-primary mr-3 shrink-0" />
              ) : (
                <FileText className="w-5 h-5 text-primary mr-3 shrink-0" />
              )}
              <span className="text-text-primary font-medium truncate">{file.name}</span>
              <span className="text-text-muted text-sm ml-3 shrink-0">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
            <button 
              type="button"
              onClick={() => onRemove(index)} 
              className="text-text-muted hover:text-error p-1 transition-colors z-10 shrink-0"
              aria-label="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
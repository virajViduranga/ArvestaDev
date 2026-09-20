'use client';
import { useState } from 'react';
import { Settings, ChevronDown, ChevronUp } from 'lucide-react';

export default function AdvancedOptions({ onOptionsChange, showOcr = false }) {
  const [expanded, setExpanded] = useState(false);
  const [options, setOptions] = useState({ pageRange: '', useOcr: false, ocrLanguage: 'eng' });

  const handleChange = (key, value) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    onOptionsChange(newOptions);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 border border-border rounded-lg bg-surface overflow-hidden">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-text-secondary hover:bg-secondary-hover transition-colors"
      >
        <span className="flex items-center font-medium"><Settings className="w-4 h-4 mr-2" /> Advanced options</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="p-4 border-t border-border space-y-4 bg-background">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Page Range (e.g., 1-5, 8, 12)</label>
            <input 
              type="text" 
              placeholder="All pages" 
              className="w-full p-2 border border-border rounded bg-surface text-text-primary focus:border-primary outline-none"
              onChange={(e) => handleChange('pageRange', e.target.value)}
            />
          </div>

          {showOcr && (
            <div className="flex items-center justify-between p-3 bg-info-bg rounded border border-info border-opacity-20">
              <div>
                <span className="block font-medium text-text-primary text-sm">Enable OCR</span>
                <span className="block text-xs text-text-muted">Extract text from scanned images. Processing takes longer.</span>
              </div>
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-primary"
                onChange={(e) => handleChange('useOcr', e.target.checked)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
'use client';

import React, { useState, useEffect,useMemo, useRef } from 'react';
import { 
  FileJson, Copy, Download, Trash2, FileUp, Braces, 
  AlignLeft, Minimize, CheckCircle, AlertTriangle, 
  Settings2, ChevronRight, ChevronDown, ListTree, 
  Code, FileCode2, Table, Hash, Type, ToggleLeft
} from 'lucide-react';

// ==========================================
// 1. UTILITY FUNCTIONS (Data Processing)
// ==========================================

const analyzeJson = (obj) => {
  const stats = { keys: 0, objects: 0, arrays: 0, strings: 0, numbers: 0, booleans: 0, nulls: 0, maxDepth: 0 };
  
  const traverse = (node, depth) => {
    if (depth > stats.maxDepth) stats.maxDepth = depth;
    
    if (node === null) {
      stats.nulls++;
    } else if (Array.isArray(node)) {
      stats.arrays++;
      node.forEach(child => traverse(child, depth + 1));
    } else if (typeof node === 'object') {
      stats.objects++;
      const keys = Object.keys(node);
      stats.keys += keys.length;
      keys.forEach(key => traverse(node[key], depth + 1));
    } else if (typeof node === 'string') {
      stats.strings++;
    } else if (typeof node === 'number') {
      stats.numbers++;
    } else if (typeof node === 'boolean') {
      stats.booleans++;
    }
  };
  
  traverse(obj, 0);
  return stats;
};

const getErrorDetails = (errorStr, jsonString) => {
  // Try to extract position from standard JSON.parse errors
  const match = errorStr.match(/position (\d+)/);
  if (match && match[1]) {
    const pos = parseInt(match[1], 10);
    const upToError = jsonString.substring(0, pos);
    const lines = upToError.split('\n');
    return { line: lines.length, column: lines[lines.length - 1].length + 1 };
  }
  return { line: 'Unknown', column: 'Unknown' };
};

const removeEmptyValues = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(removeEmptyValues).filter(val => val !== null && val !== '' && !(Array.isArray(val) && val.length === 0) && !(typeof val === 'object' && Object.keys(val).length === 0));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, val]) => {
      const cleaned = removeEmptyValues(val);
      if (cleaned !== null && cleaned !== '' && !(Array.isArray(cleaned) && cleaned.length === 0) && !(typeof cleaned === 'object' && Object.keys(cleaned).length === 0)) {
        acc[key] = cleaned;
      }
      return acc;
    }, {});
  }
  return obj;
};

const sortJsonKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(sortJsonKeys);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = sortJsonKeys(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

const generateTsInterface = (obj, interfaceName = 'Root') => {
  if (obj === null) return 'any';
  if (Array.isArray(obj)) {
    const type = obj.length > 0 ? generateTsInterface(obj[0], '') : 'any';
    return interfaceName ? `interface ${interfaceName} extends Array<${type}> {}` : `${type}[]`;
  }
  if (typeof obj === 'object') {
    let props = Object.entries(obj).map(([key, val]) => {
      const type = generateTsInterface(val, '');
      return `  ${key}: ${type};`;
    }).join('\n');
    return interfaceName ? `interface ${interfaceName} {\n${props}\n}` : `{\n${props}\n}`;
  }
  return typeof obj;
};

const exampleJson = {
  "project": "ArvestaDev JSON Tool",
  "active": true,
  "version": 1.0,
  "features": ["format", "minify", "validate"],
  "metadata": {
    "author": "Viraj",
    "framework": "Next.js",
    "emptyExample": null
  }
};

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

const JsonTreeNode = ({ nodeKey, value, path = '$', isLast }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  const isEmpty = isObject && Object.keys(value).length === 0;

  const copyPath = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(path);
    alert(`Path copied: ${path}`);
  };

  if (!isObject) {
    let valueColor = 'text-blue-600';
    if (typeof value === 'string') valueColor = 'text-green-600';
    if (typeof value === 'boolean') valueColor = 'text-purple-600';
    if (value === null) valueColor = 'text-gray-500';

    return (
      <div className="flex group pl-4 py-0.5 hover:bg-gray-50 text-sm font-mono transition-colors">
        <span className="text-[#4F73F6] font-medium mr-1">`{nodeKey}`</span>: 
        <span className={`${valueColor} ml-1`}>
          {typeof value === 'string' ? `"${value}"` : String(value)}
        </span>
        {!isLast && <span className="text-gray-500">,</span>}
        <button onClick={copyPath} className="ml-4 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-800 transition-opacity" title="Copy Path">
          <Copy size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="font-mono text-sm">
      <div 
        className="flex items-center group cursor-pointer hover:bg-gray-50 py-0.5 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-gray-400 mr-1 w-4 flex justify-center">
          {!isEmpty && (isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
        </span>
        {nodeKey && <span className="text-[#4F73F6] font-medium mr-1">`{nodeKey}`</span>}
        {nodeKey && <span>: </span>}
        <span className="text-gray-600">{isArray ? '[' : '{'}</span>
        {!isExpanded && !isEmpty && <span className="text-gray-400 mx-1">...</span>}
        {isEmpty && <span className="text-gray-600">{isArray ? ']' : '}'}{!isLast && ','}</span>}
        
        <button onClick={copyPath} className="ml-4 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-800 transition-opacity" title="Copy Path">
          <Copy size={14} />
        </button>
      </div>

      {isExpanded && !isEmpty && (
        <div className="pl-4 border-l border-gray-200 ml-2">
          {Object.entries(value).map(([childKey, childValue], index) => {
            const childPath = isArray ? `${path}[${childKey}]` : `${path}.${childKey}`;
            const isChildLast = index === Object.keys(value).length - 1;
            return (
              <JsonTreeNode 
                key={childKey} 
                nodeKey={isArray ? null : childKey} 
                value={childValue} 
                path={childPath}
                isLast={isChildLast}
              />
            );
          })}
        </div>
      )}
      
      {isExpanded && !isEmpty && (
        <div className="pl-2 text-gray-600">
          {isArray ? ']' : '}'}{!isLast && ','}
        </div>
      )}
    </div>
  );
};


// ==========================================
// 3. MAIN WORKSPACE
// ==========================================

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  
  const [indent, setIndent] = useState(2);
  const [activeTab, setActiveTab] = useState('viewer'); // viewer, tree, stats, transform

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Validate and parse JSON whenever input changes
const { parsedData, error } = useMemo(() => {
    if (!input.trim()) {
      return { parsedData: null, error: null };
    }

    try {
      const parsed = JSON.parse(input);
      return { parsedData: parsed, error: null };
    } catch (err) {
      const details = getErrorDetails(err.message, input);
      return {
        parsedData: null,
        error: { message: err.message, line: details.line, column: details.column }
      };
    }
  }, [input]);

  // Editor Actions
  const handleFormat = () => {
    if (parsedData) {
      const space = indent === 'tab' ? '\t' : Number(indent);
      setInput(JSON.stringify(parsedData, null, space));
    }
  };

  const handleMinify = () => {
    if (parsedData) setInput(JSON.stringify(parsedData));
  };

  const loadExample = () => setInput(JSON.stringify(exampleJson, null, 2));
  
  const handleClear = () => {
    setInput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    alert('JSON copied to clipboard');
  };

  const handleDownload = () => {
    const blob = new Blob([input], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted.json';
    link.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Please upload files under 5MB to ensure browser performance.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => setInput(event.target.result);
    reader.readAsText(file);
  };

  // Transformation Actions
  const applySort = () => {
    if (parsedData) setInput(JSON.stringify(sortJsonKeys(parsedData), null, indent === 'tab' ? '\t' : Number(indent)));
  };

  const applyRemoveEmpty = () => {
    if (parsedData) setInput(JSON.stringify(removeEmptyValues(parsedData), null, indent === 'tab' ? '\t' : Number(indent)));
  };

  const stats = parsedData ? analyzeJson(parsedData) : null;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans flex flex-col">
      
      {/* 1. Tool Header */}
      <header className="bg-gray-950 border-b border-gray-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <Braces className="text-[#4F73F6]" size={28} />
          <div>
            <h1 className="text-xl font-bold text-white">JSON Formatter & Validator</h1>
            <p className="text-xs text-gray-500">Format, validate, minify, and analyze JSON instantly.</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2 text-xs text-gray-500 bg-gray-900 px-3 py-1.5 border border-gray-800">
          <CheckCircle size={14} className="text-[#ECBE13]" />
          Your JSON is processed locally in your browser.
        </div>
      </header>

      {/* 2. Main Workspace */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        
        {/* LEFT PANEL: Input Editor */}
        <section className="flex flex-col border-r border-gray-800 bg-gray-950 h-full">
          
          {/* Editor Toolbar */}
          <div className="flex flex-wrap items-center justify-between p-2 border-b border-gray-800 bg-gray-900 gap-2 shrink-0">
            <div className="flex gap-1">
              <button onClick={loadExample} className="px-3 py-1.5 text-xs font-bold bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white rounded-none transition-colors">Example</button>
              <button onClick={handleClear} className="px-3 py-1.5 text-xs font-bold bg-gray-800 text-gray-300 hover:bg-red-900 hover:text-red-300 rounded-none transition-colors">Clear</button>
              
              <div className="w-px h-6 bg-gray-700 mx-2 self-center hidden sm:block"></div>
              
              <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white rounded-none transition-colors">
                <FileUp size={14} /> Upload
              </button>
              <input type="file" accept=".json,application/json" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            </div>

            <div className="flex items-center gap-2">
              <select 
                value={indent} 
                onChange={(e) => setIndent(e.target.value)}
                className="bg-gray-800 text-xs text-gray-300 border border-gray-700 rounded-none px-2 py-1.5 focus:outline-none focus:border-[#4F73F6]"
              >
                <option value="2">2 Spaces</option>
                <option value="4">4 Spaces</option>
                <option value="tab">Tabs</option>
              </select>
              <button onClick={handleFormat} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-[#4F73F6] text-white hover:bg-blue-600 rounded-none transition-colors">
                <AlignLeft size={14} /> Format
              </button>
              <button onClick={handleMinify} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-[#ECBE13] text-black hover:bg-yellow-500 rounded-none transition-colors">
                <Minimize size={14} /> Minify
              </button>
            </div>
          </div>

          {/* Textarea Area */}
          <div className="relative flex-1 flex bg-[#0d1117] overflow-hidden">
            <textarea
              ref={textareaRef}
              className="w-full h-full p-4 font-mono text-sm leading-relaxed bg-transparent text-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[#4F73F6]"
              placeholder="Paste or type your JSON here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck="false"
            />
          </div>

          {/* Status Bar / Error Handling */}
          <div className={`p-2 text-xs font-mono border-t border-gray-800 shrink-0 flex justify-between items-center ${error ? 'bg-red-950/50 text-red-400' : 'bg-gray-900 text-gray-500'}`}>
            {error ? (
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} />
                <span>Invalid JSON: {error.message} (Line {error.line}, Col {error.column})</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-green-500" />
                <span>Valid JSON</span>
              </div>
            )}
            <div className="flex gap-4">
              <span>{input.length} chars</span>
              <span>{input.split('\n').length} lines</span>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: Output & Tools */}
        <section className="flex flex-col bg-white h-full overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50 shrink-0">
            {[
              { id: 'viewer', icon: FileJson, label: 'Formatted' },
              { id: 'tree', icon: ListTree, label: 'Tree View' },
              { id: 'stats', icon: Settings2, label: 'Statistics' },
              { id: 'transform', icon: Code, label: 'Transform / Convert' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors rounded-none
                  ${activeTab === tab.id ? 'border-[#4F73F6] text-[#4F73F6] bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`}
              >
                <tab.icon size={16} /> <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-auto bg-white p-4 text-gray-800">
            
            {!parsedData && !error && input.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <FileJson size={48} className="mb-4 opacity-50" />
                <p>Awaiting JSON input...</p>
              </div>
            ) : error ? (
              <div className="h-full flex flex-col items-center justify-center text-red-400">
                <AlertTriangle size={48} className="mb-4 opacity-50" />
                <p className="font-bold mb-2">Failed to parse output</p>
                <p className="text-sm">Please fix the JSON errors in the editor.</p>
              </div>
            ) : (
              <>
                {/* View 1: Formatted Output */}
                {activeTab === 'viewer' && (
                  <div className="relative h-full">
                    <div className="absolute top-0 right-0 flex gap-2">
                      <button onClick={handleCopy} className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-none transition-colors" title="Copy"><Copy size={16} /></button>
                      <button onClick={handleDownload} className="p-2 bg-[#4F73F6] hover:bg-blue-600 text-white rounded-none transition-colors" title="Download"><Download size={16} /></button>
                    </div>
                    <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap pt-10 pb-4">
                      {JSON.stringify(parsedData, null, indent === 'tab' ? '\t' : Number(indent))}
                    </pre>
                  </div>
                )}

                {/* View 2: Tree Viewer */}
                {activeTab === 'tree' && (
                  <div className="bg-gray-50 border border-gray-200 p-4 min-h-full">
                    <JsonTreeNode nodeKey="root" value={parsedData} isLast={true} />
                  </div>
                )}

                {/* View 3: Statistics */}
                {activeTab === 'stats' && stats && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-6 border-l-4 border-[#ECBE13] pl-3">JSON Analysis</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { icon: Hash, label: 'Total Keys', val: stats.keys },
                        { icon: Braces, label: 'Objects', val: stats.objects },
                        { icon: ListTree, label: 'Arrays', val: stats.arrays },
                        { icon: Type, label: 'Strings', val: stats.strings },
                        { icon: Hash, label: 'Numbers', val: stats.numbers },
                        { icon: ToggleLeft, label: 'Booleans', val: stats.booleans },
                        { icon: Trash2, label: 'Nulls', val: stats.nulls },
                        { icon: ChevronDown, label: 'Max Depth', val: stats.maxDepth },
                      ].map((stat, idx) => (
                        <div key={idx} className="bg-gray-50 border border-gray-200 p-4 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <stat.icon size={16} className="text-[#4F73F6]" /> {stat.label}
                          </div>
                          <p className="text-2xl font-bold text-gray-800">{stat.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* View 4: Transforms & Conversions */}
                {activeTab === 'transform' && (
                  <div className="space-y-8">
                    
                    {/* Actions */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Transform Data</h3>
                      <div className="flex flex-wrap gap-4">
                        <button onClick={applySort} className="px-4 py-2 bg-[#4F73F6] text-white font-bold text-sm hover:bg-blue-700 transition-colors">
                          Sort Keys (A-Z)
                        </button>
                        <button onClick={applyRemoveEmpty} className="px-4 py-2 bg-gray-200 text-gray-800 font-bold text-sm hover:bg-gray-300 transition-colors">
                          Remove Empty Values
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">These actions will modify the JSON in the editor.</p>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Developer Generators */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Developer Tools</h3>
                      
                      <div className="bg-gray-50 border border-gray-200 p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-gray-800 flex items-center gap-2"><FileCode2 size={18} className="text-[#4F73F6]"/> TypeScript Interface</h4>
                          <button onClick={() => navigator.clipboard.writeText(generateTsInterface(parsedData))} className="text-[#4F73F6] text-xs font-bold hover:underline">COPY</button>
                        </div>
                        <pre className="text-xs text-gray-600 bg-white p-3 border border-gray-100 overflow-x-auto">
                          {generateTsInterface(parsedData)}
                        </pre>
                      </div>

                    </div>

                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
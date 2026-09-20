'use client';

import React, { useState, useEffect, useRef } from 'react';



// --- Helper Data & Functions ---
const STOP_WORDS = new Set(['a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with']);

const calculateReadability = (words, sentences) => {
  if (words === 0 || sentences === 0) return 'N/A';
  const wordsPerSentence = words / sentences;
  if (wordsPerSentence < 8) return 'Very Easy (8th Grade)';
  if (wordsPerSentence < 15) return 'Conversational (High School)';
  if (wordsPerSentence < 22) return 'Professional (College)';
  return 'Complex (Academic)';
};

export default function WordCounter() {
  // --- State Management ---
  const [text, setText] = useState('');
  const [history, setHistory] = useState(['']);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Settings & Goals
  const [goal, setGoal] = useState(0);
  const [wordLimit, setWordLimit] = useState(0);
  const [ignoreStopWords, setIgnoreStopWords] = useState(true);
  
  // Search & Replace
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceQuery, setReplaceQuery] = useState('');
  
  // Auto-save loader
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Auto-Save Effect (Local Storage) ---
 useEffect(() => {
    const savedText = localStorage.getItem('arvesta-word-counter-text');
    
    // Defer state update to avoid synchronous cascading renders
    setTimeout(() => {
      if (savedText) {
        setText(savedText);
        setHistory([savedText]);
      }
      setIsLoaded(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('arvesta-word-counter-text', text);
    }
  }, [text, isLoaded]);

  // --- Real-time Calculations ---
  const textArray = text.trim() ? text.trim().split(/\s+/) : [];
  const words = textArray.length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  
  const readingTime = Math.ceil(words / 238); // Avg adult reading speed
  const speakingTime = Math.ceil(words / 130); // Avg speaking speed
  
  const longestWord = textArray.reduce((longest, current) => current.length > longest.length ? current : longest, '');
  const avgWordLength = words > 0 ? (charsNoSpaces / words).toFixed(1) : 0;
  
  const readability = calculateReadability(words, sentences);

  // Keyword Analysis
  const getKeywords = () => {
    if (words === 0) return [];
    const frequency = {};
    const cleanWords = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    cleanWords.forEach(w => {
      if (ignoreStopWords && STOP_WORDS.has(w)) return;
      frequency[w] = (frequency[w] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };
  const keywords = getKeywords();

  // Goals & Limits Calculations
  const goalProgress = goal > 0 ? Math.min((words / goal) * 100, 100) : 0;
  const isOverLimit = wordLimit > 0 && words > wordLimit;

  // --- Actions & Utilities ---
  const updateText = (newText) => {
    setText(newText);
    // Add to history for undo
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newText);
    if (newHistory.length > 20) newHistory.shift(); // Keep last 20 changes
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setText(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setText(history[historyIndex + 1]);
    }
  };

  const handleClear = () => updateText('');
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };
  
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      updateText(text + clipboardText);
    } catch (err) {
      alert('Failed to read clipboard.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'arvesta-document.txt';
    link.click();
  };

  const transformUpper = () => updateText(text.toUpperCase());
  const transformLower = () => updateText(text.toLowerCase());
  const transformCapitalize = () => {
    const capitalized = text.replace(/\b\w/g, c => c.toUpperCase());
    updateText(capitalized);
  };
  const removeExtraSpaces = () => updateText(text.replace(/\s+/g, ' ').trim());
  const removeBlankLines = () => updateText(text.replace(/\n\s*\n/g, '\n'));

  // Search & Replace logic
  const searchMatches = searchQuery ? (text.match(new RegExp(searchQuery, 'gi')) || []).length : 0;
  
  const replaceOne = () => {
    if (!searchQuery) return;
    updateText(text.replace(new RegExp(searchQuery, 'i'), replaceQuery));
  };
  
  const replaceAll = () => {
    if (!searchQuery) return;
    updateText(text.replace(new RegExp(searchQuery, 'gi'), replaceQuery));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-16">
      {/* Top Navigation / Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold text-[#4F73F6]">Advanced Word Counter</h1>
        <div className="flex gap-2">
          <button onClick={handleUndo} disabled={historyIndex === 0} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-none hover:bg-gray-200 disabled:opacity-50">Undo</button>
          <button onClick={handleRedo} disabled={historyIndex === history.length - 1} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-none hover:bg-gray-200 disabled:opacity-50">Redo</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Workspace */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Main Editor Card */}
          <div className="bg-white border-t-4 border-[#4F73F6] shadow-sm flex flex-col">
            
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 p-3 border-b border-gray-100 bg-gray-50">
              <button onClick={handleCopy} className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 rounded-none transition-colors">Copy</button>
              <button onClick={handlePaste} className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 rounded-none transition-colors">Paste</button>
              <button onClick={handleClear} className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-300 text-red-600 hover:bg-red-50 rounded-none transition-colors">Clear</button>
              <div className="w-px h-8 bg-gray-300 mx-2 hidden sm:block"></div>
              <button onClick={transformUpper} className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 rounded-none transition-colors">UPPER</button>
              <button onClick={transformLower} className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 rounded-none transition-colors">lower</button>
              <button onClick={transformCapitalize} className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 rounded-none transition-colors">Capitalize</button>
              <div className="w-px h-8 bg-gray-300 mx-2 hidden sm:block"></div>
              <button onClick={removeExtraSpaces} className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 rounded-none transition-colors" title="Remove extra spaces">Fix Spaces</button>
              <button onClick={removeBlankLines} className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 rounded-none transition-colors" title="Remove empty lines">Fix Lines</button>
            </div>

            {/* Text Area */}
            <textarea
              className="w-full h-[400px] p-6 resize-y focus:outline-none focus:ring-inset focus:ring-2 focus:ring-[#4F73F6] text-lg leading-relaxed bg-white"
              placeholder="Start typing or paste your text here..."
              value={text}
              onChange={(e) => updateText(e.target.value)}
              spellCheck="false"
            ></textarea>
            
            {/* Editor Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
              <span>Auto-saved to browser</span>
              <button onClick={handleDownload} className="flex items-center gap-2 text-[#4F73F6] font-bold hover:underline">
                Export .txt
              </button>
            </div>
          </div>

          {/* Search & Replace Utility */}
          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-4 text-gray-800 border-l-4 border-[#ECBE13] pl-3">Search & Replace</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <input 
                  type="text" 
                  placeholder="Find word..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:border-[#4F73F6]"
                />
                <span className="text-xs text-gray-500">{searchMatches} matches found</span>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <input 
                  type="text" 
                  placeholder="Replace with..." 
                  value={replaceQuery}
                  onChange={(e) => setReplaceQuery(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:border-[#4F73F6]"
                />
              </div>
              <div className="flex flex-col gap-2 justify-start">
                <button onClick={replaceOne} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-none font-medium transition-colors">Replace 1</button>
                <button onClick={replaceAll} className="px-4 py-2 bg-[#4F73F6] text-white hover:bg-blue-700 rounded-none font-bold transition-colors">Replace All</button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Live Statistics & Analysis */}
        <div className="flex flex-col gap-6">
          
          {/* Primary Stats Grid */}
          <div className="bg-[#4F73F6] text-white p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Live Statistics</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-blue-200 text-sm uppercase tracking-wider">Words</p>
                <p className={`text-4xl font-bold ${isOverLimit ? 'text-red-300' : 'text-white'}`}>{words}</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm uppercase tracking-wider">Characters</p>
                <p className="text-4xl font-bold">{chars}</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm uppercase tracking-wider">Sentences</p>
                <p className="text-2xl font-bold">{sentences}</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm uppercase tracking-wider">Paragraphs</p>
                <p className="text-2xl font-bold">{paragraphs}</p>
              </div>
            </div>
          </div>

          {/* Goals & Limits */}
          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <h3 className="font-bold mb-4 border-l-4 border-[#ECBE13] pl-3">Writing Goal</h3>
            <div className="flex gap-4 mb-4">
              <input 
                type="number" 
                placeholder="Target words" 
                onChange={(e) => setGoal(Number(e.target.value))}
                className="w-1/2 p-2 border border-gray-300 rounded-none focus:outline-none focus:border-[#4F73F6] text-sm"
              />
              <input 
                type="number" 
                placeholder="Max word limit" 
                onChange={(e) => setWordLimit(Number(e.target.value))}
                className="w-1/2 p-2 border border-gray-300 rounded-none focus:outline-none focus:border-[#4F73F6] text-sm"
              />
            </div>
            
            {goal > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1 font-medium">
                  <span>{words} / {goal} words</span>
                  <span>{Math.floor(goalProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-none overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${goalProgress >= 100 ? 'bg-green-500' : 'bg-[#ECBE13]'}`}
                    style={{ width: `${goalProgress}%` }}
                  ></div>
                </div>
                {goalProgress >= 100 && <p className="text-xs text-green-600 mt-2 font-bold">Goal Reached!</p>}
              </div>
            )}
            
            {isOverLimit && (
              <p className="text-xs text-red-600 mt-2 font-bold bg-red-50 p-2 border border-red-200">
                Warning: You are {words - wordLimit} words over your limit.
              </p>
            )}
          </div>

          {/* Text Analysis */}
          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <h3 className="font-bold mb-4 border-l-4 border-[#4F73F6] pl-3">Text Analysis</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm border-b pb-2">
                <span className="text-gray-500">Readability</span>
                <span className="font-medium text-right">{readability}</span>
              </div>
              <div className="flex justify-between text-sm border-b pb-2">
                <span className="text-gray-500">Est. Reading Time</span>
                <span className="font-medium">{readingTime} min</span>
              </div>
              <div className="flex justify-between text-sm border-b pb-2">
                <span className="text-gray-500">Est. Speaking Time</span>
                <span className="font-medium">{speakingTime} min</span>
              </div>
              <div className="flex justify-between text-sm border-b pb-2">
                <span className="text-gray-500">Avg. Word Length</span>
                <span className="font-medium">{avgWordLength} chars</span>
              </div>
              <div className="flex justify-between text-sm pb-2">
                <span className="text-gray-500">Longest Word</span>
                <span className="font-medium truncate max-w-[120px]" title={longestWord}>{longestWord || '-'}</span>
              </div>
            </div>

            {/* Keyword Density */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-sm">Top Keywords</h4>
                <label className="text-xs flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={ignoreStopWords} 
                    onChange={() => setIgnoreStopWords(!ignoreStopWords)}
                    className="accent-[#4F73F6] rounded-none w-3 h-3"
                  />
                  Ignore common words
                </label>
              </div>
              
              {keywords.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {keywords.map(([word, count], idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 border border-gray-100">
                      <span className="text-sm font-medium text-gray-700 truncate w-32">{word}</span>
                      <span className="text-xs bg-[#4F73F6] text-white px-2 py-1 rounded-none font-bold">{count}x</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">Not enough text to analyze.</p>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
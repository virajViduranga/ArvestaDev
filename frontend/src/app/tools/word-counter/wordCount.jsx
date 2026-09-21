"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ToolSeoSection from "@/components/ToolSeoSection";

// --- Helper Data & Functions ---
const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "for",
  "if",
  "in",
  "into",
  "is",
  "it",
  "no",
  "not",
  "of",
  "on",
  "or",
  "such",
  "that",
  "the",
  "their",
  "then",
  "there",
  "these",
  "they",
  "this",
  "to",
  "was",
  "will",
  "with",
]);

const calculateReadability = (words, sentences) => {
  if (words === 0 || sentences === 0) return "N/A";
  const wordsPerSentence = words / sentences;
  if (wordsPerSentence < 8) return "Very Easy (8th Grade)";
  if (wordsPerSentence < 15) return "Conversational (High School)";
  if (wordsPerSentence < 22) return "Professional (College)";
  return "Complex (Academic)";
};

export default function WordCounter() {
  const router = useRouter();
  // --- State Management ---
  const [text, setText] = useState("");
  const [history, setHistory] = useState([""]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Settings & Goals
  const [goal, setGoal] = useState(0);
  const [wordLimit, setWordLimit] = useState(0);
  const [ignoreStopWords, setIgnoreStopWords] = useState(true);

  // Search & Replace
  const [searchQuery, setSearchQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");

  // Auto-save loader
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Auto-Save Effect (Local Storage) ---
  useEffect(() => {
    const savedText = localStorage.getItem("arvesta-word-counter-text");

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
      localStorage.setItem("arvesta-word-counter-text", text);
    }
  }, [text, isLoaded]);

  // --- Real-time Calculations ---
  const textArray = text.trim() ? text.trim().split(/\s+/) : [];
  const words = textArray.length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s+/g, "").length;
  const paragraphs = text
    .split(/\n+/)
    .filter((p) => p.trim().length > 0).length;
  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;

  const readingTime = Math.ceil(words / 238); // Avg adult reading speed
  const speakingTime = Math.ceil(words / 130); // Avg speaking speed

  const longestWord = textArray.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    "",
  );
  const avgWordLength = words > 0 ? (charsNoSpaces / words).toFixed(1) : 0;

  const readability = calculateReadability(words, sentences);

  // Keyword Analysis
  const getKeywords = () => {
    if (words === 0) return [];
    const frequency = {};
    const cleanWords = text.toLowerCase().match(/\b\w+\b/g) || [];

    cleanWords.forEach((w) => {
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

  const handleClear = () => updateText("");

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      updateText(text + clipboardText);
    } catch (err) {
      alert("Failed to read clipboard.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "arvesta-document.txt";
    link.click();
  };

  const transformUpper = () => updateText(text.toUpperCase());
  const transformLower = () => updateText(text.toLowerCase());
  const transformCapitalize = () => {
    const capitalized = text.replace(/\b\w/g, (c) => c.toUpperCase());
    updateText(capitalized);
  };
  const removeExtraSpaces = () => updateText(text.replace(/\s+/g, " ").trim());
  const removeBlankLines = () => updateText(text.replace(/\n\s*\n/g, "\n"));

  // Search & Replace logic
  const searchMatches = searchQuery
    ? (text.match(new RegExp(searchQuery, "gi")) || []).length
    : 0;

  const replaceOne = () => {
    if (!searchQuery) return;
    updateText(text.replace(new RegExp(searchQuery, "i"), replaceQuery));
  };

  const replaceAll = () => {
    if (!searchQuery) return;
    updateText(text.replace(new RegExp(searchQuery, "gi"), replaceQuery));
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans pb-16">
      {/* Top Navigation / Header */}
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => router.back()}
              className="p-2 text-white bg-[var(--color-primary-hover)] hover:bg-white hover:text-[var(--color-primary-hover)] transition-all duration-200 rounded-full cursor-pointer shadow-sm hover:shadow-md"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg md:text-xl font-bold text-[var(--color-text-primary)]">
              Word Counter
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-[var(--color-secondary)] p-1 rounded-lg">
            <button
              onClick={handleUndo}
              disabled={historyIndex === 0}
              className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-[var(--color-surface)] hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none cursor-pointer transition-all"
            >
              Undo
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex === history.length - 1}
              className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-[var(--color-surface)] hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none cursor-pointer transition-all"
            >
              Redo
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto mt-8 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Main Workspace */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Main Editor Card */}
          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-sm flex flex-col overflow-hidden transition-shadow focus-within:shadow-md focus-within:border-[var(--color-border-hover)]">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 border-b border-[var(--color-border)] bg-[var(--color-secondary)]">
              <div className="flex bg-[var(--color-surface)] rounded-md border border-[var(--color-border)] p-0.5">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-xs md:text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)] rounded cursor-pointer transition-colors"
                >
                  Copy
                </button>
                <button
                  onClick={handlePaste}
                  className="px-3 py-1.5 text-xs md:text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)] rounded cursor-pointer transition-colors"
                >
                  Paste
                </button>
                <button
                  onClick={handleClear}
                  className="px-3 py-1.5 text-xs md:text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error-bg)] rounded cursor-pointer transition-colors"
                >
                  Clear
                </button>
              </div>

              <div className="w-px h-6 bg-[var(--color-border-hover)] mx-1 hidden sm:block"></div>

              <div className="flex bg-[var(--color-surface)] rounded-md border border-[var(--color-border)] p-0.5">
                <button
                  onClick={transformUpper}
                  className="px-3 py-1.5 text-xs md:text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)] rounded cursor-pointer transition-colors"
                >
                  UPPER
                </button>
                <button
                  onClick={transformLower}
                  className="px-3 py-1.5 text-xs md:text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)] rounded cursor-pointer transition-colors"
                >
                  lower
                </button>
                <button
                  onClick={transformCapitalize}
                  className="px-3 py-1.5 text-xs md:text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)] rounded cursor-pointer transition-colors"
                >
                  Capitalize
                </button>
              </div>

              <div className="w-px h-6 bg-[var(--color-border-hover)] mx-1 hidden sm:block"></div>

              <div className="flex bg-[var(--color-surface)] rounded-md border border-[var(--color-border)] p-0.5">
                <button
                  onClick={removeExtraSpaces}
                  className="px-3 py-1.5 text-xs md:text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)] rounded cursor-pointer transition-colors"
                  title="Remove extra spaces"
                >
                  Fix Spaces
                </button>
                <button
                  onClick={removeBlankLines}
                  className="px-3 py-1.5 text-xs md:text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)] rounded cursor-pointer transition-colors"
                  title="Remove empty lines"
                >
                  Fix Lines
                </button>
              </div>
            </div>

            {/* Text Area */}
            <textarea
              className="w-full min-h-[450px] p-6 resize-y outline-none text-base md:text-lg leading-relaxed bg-[var(--color-surface)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
              placeholder="Start typing or paste your text here..."
              value={text}
              onChange={(e) => updateText(e.target.value)}
              spellCheck="false"
            ></textarea>

            {/* Editor Footer */}
            <div className="px-6 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex justify-between items-center text-xs text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-1 cursor-default">
                <span className="w-2 h-2 rounded-full bg-[var(--color-success)]"></span>
                Auto-saved to browser
              </span>
              <button
                onClick={handleDownload}
                className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] cursor-pointer transition-colors"
              >
                Export as .txt
              </button>
            </div>
          </div>

          {/* Search & Replace Utility */}
          <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] shadow-sm">
            <h3 className="text-sm font-semibold mb-4 text-[var(--color-text-primary)] uppercase tracking-wider">
              Search & Replace
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Find word..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all bg-[var(--color-background)]"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[var(--color-text-muted)] bg-[var(--color-surface)] px-1">
                    {searchMatches} found
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Replace with..."
                  value={replaceQuery}
                  onChange={(e) => setReplaceQuery(e.target.value)}
                  className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all bg-[var(--color-background)]"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={replaceOne}
                  className="px-4 py-2 text-sm bg-[var(--color-secondary)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] font-medium cursor-pointer transition-colors"
                >
                  Replace 1
                </button>
                <button
                  onClick={replaceAll}
                  className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] font-medium cursor-pointer transition-colors shadow-sm"
                >
                  Replace All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Statistics & Analysis */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Primary Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)] shadow-sm flex flex-col items-center justify-center text-center">
              <p className="text-[var(--color-text-secondary)] text-xs font-semibold uppercase tracking-wider mb-1">
                Words
              </p>
              <p
                className={`text-4xl md:text-5xl font-bold tracking-tight ${isOverLimit ? "text-[var(--color-error)]" : "text-[var(--color-primary)]"}`}
              >
                {words}
              </p>
            </div>
            <div className="bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)] shadow-sm flex flex-col items-center justify-center text-center">
              <p className="text-[var(--color-text-secondary)] text-xs font-semibold uppercase tracking-wider mb-1">
                Characters
              </p>
              <p className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)]">
                {chars}
              </p>
            </div>
            <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-sm flex flex-col items-center justify-center text-center">
              <p className="text-[var(--color-text-secondary)] text-xs font-semibold uppercase tracking-wider mb-1">
                Sentences
              </p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {sentences}
              </p>
            </div>
            <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-sm flex flex-col items-center justify-center text-center">
              <p className="text-[var(--color-text-secondary)] text-xs font-semibold uppercase tracking-wider mb-1">
                Paragraphs
              </p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {paragraphs}
              </p>
            </div>
          </div>

          {/* Goals & Limits */}
          <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] shadow-sm">
            <h3 className="text-sm font-semibold mb-4 text-[var(--color-text-primary)] uppercase tracking-wider">
              Writing Goal
            </h3>
            <div className="flex gap-4 mb-5">
              <div className="flex-1">
                <label className="block text-xs text-[var(--color-text-muted)] mb-1">
                  Target Words
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1000"
                  onChange={(e) => setGoal(Number(e.target.value))}
                  className="w-full p-2 text-sm border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all bg-[var(--color-background)]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-[var(--color-text-muted)] mb-1">
                  Max Limit
                </label>
                <input
                  type="number"
                  placeholder="e.g. 2000"
                  onChange={(e) => setWordLimit(Number(e.target.value))}
                  className="w-full p-2 text-sm border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all bg-[var(--color-background)]"
                />
              </div>
            </div>

            {goal > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-2 font-medium text-[var(--color-text-primary)]">
                  <span>
                    {words} / {goal} words
                  </span>
                  <span>{Math.floor(goalProgress)}%</span>
                </div>
                <div className="w-full bg-[var(--color-secondary)] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${goalProgress >= 100 ? "bg-[var(--color-success)]" : "bg-[var(--color-primary)]"}`}
                    style={{ width: `${Math.min(goalProgress, 100)}%` }}
                  ></div>
                </div>
                {goalProgress >= 100 && (
                  <p className="text-xs text-[var(--color-success)] mt-2 font-medium flex items-center gap-1">
                    <span className="text-sm">✓</span> Target reached
                  </p>
                )}
              </div>
            )}

            {isOverLimit && (
              <p className="text-xs text-[var(--color-error)] mt-3 bg-[var(--color-error-bg)] p-3 rounded-lg border border-[var(--color-error)]/30 font-medium">
                Warning: You are {words - wordLimit} words over your limit.
              </p>
            )}
          </div>

          {/* Text Analysis */}
          <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] shadow-sm">
            <h3 className="text-sm font-semibold mb-4 text-[var(--color-text-primary)] uppercase tracking-wider">
              Text Analysis
            </h3>

            <ul className="space-y-3 mb-6">
              <li className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">
                  Readability
                </span>
                <span className="font-medium text-[var(--color-text-primary)] bg-[var(--color-secondary)] px-2 py-0.5 rounded">
                  {readability}
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">
                  Est. Reading Time
                </span>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {readingTime} min
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">
                  Est. Speaking Time
                </span>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {speakingTime} min
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">
                  Avg. Word Length
                </span>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {avgWordLength} chars
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">
                  Longest Word
                </span>
                <span
                  className="font-medium text-[var(--color-text-primary)] truncate max-w-[120px]"
                  title={longestWord}
                >
                  {longestWord || "-"}
                </span>
              </li>
            </ul>

            {/* Keyword Density */}
            <div className="pt-4 border-t border-[var(--color-border)]">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-sm text-[var(--color-text-primary)]">
                  Top Keywords
                </h4>
                <label className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1.5 cursor-pointer hover:text-[var(--color-text-primary)] transition-colors">
                  <input
                    type="checkbox"
                    checked={ignoreStopWords}
                    onChange={() => setIgnoreStopWords(!ignoreStopWords)}
                    className="accent-[var(--color-primary)] rounded w-3.5 h-3.5 cursor-pointer"
                  />
                  Ignore common
                </label>
              </div>

              {keywords.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {keywords.map(([word, count], idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-[var(--color-background)] p-2 rounded-lg border border-[var(--color-border)]"
                    >
                      <span className="text-sm font-medium text-[var(--color-text-primary)] truncate max-w-[150px]">
                        {word}
                      </span>
                      <span className="text-xs bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-full font-medium">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 bg-[var(--color-background)] rounded-lg border border-dashed border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Not enough text to analyze keywords.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-16 px-4">
        <ToolSeoSection
          steps={[
            {
              title: "Type or Paste Text",
              description:
                "Start typing directly into the editor or paste your document from your clipboard.",
            },
            {
              title: "Analyze Real-Time Data",
              description:
                "View live statistics including word count, character count, readability, and reading time.",
            },
            {
              title: "Export or Copy",
              description:
                "Once your content is ready, copy the text to your clipboard or download it as a .txt file.",
            },
          ]}
          faqs={[
            {
              question: "Is this word counter free to use?",
              answer:
                "Yes, our advanced word counter is completely free with no limits on word or character counts.",
            },
            {
              question: "Is my text saved or sent to any servers?",
              answer:
                "No. Your text is processed entirely within your local browser. It is auto-saved locally so you don't lose your work if you accidentally refresh, but it is never transmitted over the internet.",
            },
            {
              question: "Does it count spaces as characters?",
              answer:
                "Yes, standard character count includes spaces. However, we also analyze your text to determine average word length, which ignores spaces.",
            },
          ]}
        />
      </div>
    </main>
  );
}

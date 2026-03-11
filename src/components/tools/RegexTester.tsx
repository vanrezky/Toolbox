import React, { useState, useMemo } from 'react';
import { Code2, AlertCircle, Check, Info } from 'lucide-react';

export function RegexTester() {
  const [regex, setRegex] = useState('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('example@mail.com\ninvalid-email\ntest.user@domain.co.id');
  const [error, setError] = useState<string | null>(null);

  const matches = useMemo(() => {
    if (!regex) return [];
    setError(null);
    try {
      const re = new RegExp(regex, flags);
      const results = Array.from(testText.matchAll(re));
      return results;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid Regular Expression');
      return [];
    }
  }, [regex, flags, testText]);

  const highlightedText = useMemo(() => {
    if (!regex || error) return testText;
    try {
      const re = new RegExp(regex, flags);
      const parts = testText.split(re);
      const matchesFound = testText.match(re);
      
      if (!matchesFound) return testText;

      // This is a simple highlighting logic, for complex regex it might need more robust handling
      return testText.replace(re, (match) => `<mark class="bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-100 rounded px-0.5 border-b-2 border-indigo-500">${match}</mark>`);
    } catch (e) {
      return testText;
    }
  }, [regex, flags, testText, error]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-500" />
          RegEx Tester
        </h2>

        <div className="space-y-6">
          {/* Regex Input */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-3 space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Regular Expression</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">/</span>
                <input
                  type="text"
                  value={regex}
                  onChange={(e) => setRegex(e.target.value)}
                  className="w-full p-4 pl-8 pr-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
                  placeholder="Enter regex pattern..."
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">/</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Flags</label>
              <input
                type="text"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
                placeholder="gim"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl flex items-center gap-3 border border-rose-200 dark:border-rose-800">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Test Text */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Test String</label>
              <textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm h-64 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                placeholder="Enter text to test against..."
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Matches ({matches.length})</label>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Info className="w-3 h-3" />
                  Visual Highlight
                </div>
              </div>
              <div 
                className="w-full p-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm h-64 overflow-y-auto whitespace-pre-wrap break-all"
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              />
            </div>
          </div>

          {/* Match Details */}
          {matches.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Match Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.slice(0, 12).map((match, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Match {idx + 1}</span>
                    <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 truncate">{match[0]}</span>
                    <span className="text-[10px] text-slate-500">Index: {match.index}</span>
                  </div>
                ))}
                {matches.length > 12 && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs text-slate-400 italic">
                    + {matches.length - 12} more matches
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Database, Copy, Check, Trash2, Download } from 'lucide-react';
import { format } from 'sql-formatter';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('sql');
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleFormat = () => {
    try {
      const formatted = format(input, {
        language: language as any,
        keywordCase: 'upper',
        tabWidth: 2,
      });
      setOutput(formatted);
    } catch (e) {
      setOutput('Error: Could not format SQL. Please check your syntax.');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted-query.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-500" />
            SQL Formatter
          </h2>
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="sql">Standard SQL</option>
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="mariadb">MariaDB</option>
              <option value="sqlite">SQLite</option>
              <option value="tsql">T-SQL (SQL Server)</option>
            </select>
            <button
              onClick={handleFormat}
              disabled={!input}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-medium transition-colors"
            >
              Format SQL
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Raw Query</label>
              <button onClick={handleClear} className="text-slate-400 hover:text-rose-500 transition-colors" title="Clear">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm h-[400px] outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              placeholder="Paste your messy SQL query here..."
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Formatted Query</label>
              <div className="flex items-center gap-3">
                <button onClick={handleDownload} className="text-slate-400 hover:text-indigo-500 transition-colors" title="Download .sql">
                  <Download className="w-4 h-4" />
                </button>
                <button onClick={() => copyToClipboard(output)} className="text-slate-400 hover:text-indigo-500 transition-colors" title="Copy output">
                  {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              className="w-full p-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm h-[400px] outline-none resize-none"
              placeholder="Formatted result will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

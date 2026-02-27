import React, { useState } from 'react';
import { Copy, Check, Download, FileJson, AlignLeft, Minimize2 } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export function JsonTools() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON');
    }
  };

  const handleUglify = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON');
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <FileJson className="w-5 h-5 text-amber-500" />
          JSON Formatter & Uglifier
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="flex flex-col space-y-4">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Input JSON</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 min-h-[400px] p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-shadow resize-none font-mono text-sm leading-relaxed"
              placeholder="Paste your JSON here..."
              spellCheck={false}
            />
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleFormat}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors font-medium"
              >
                <AlignLeft className="w-4 h-4" />
                Format (Pretty)
              </button>
              <button
                onClick={handleUglify}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-xl transition-colors font-medium"
              >
                <Minimize2 className="w-4 h-4" />
                Uglify (Minify)
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Output</label>
              {output && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(output)}
                    className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    <Download className="w-4 h-4" />
                    Download .txt
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative flex-1 min-h-[400px]">
              <textarea
                readOnly
                value={error ? '' : output}
                className={`w-full h-full p-4 bg-slate-100 dark:bg-slate-900/50 border ${error ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl font-mono text-sm leading-relaxed outline-none resize-none`}
                placeholder="Result will appear here..."
                spellCheck={false}
              />
              {error && (
                <div className="absolute inset-0 p-4 flex items-center justify-center text-rose-500 bg-rose-50/50 dark:bg-rose-900/10 rounded-xl font-mono text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Copy, Check, Fingerprint, RefreshCw, Download, Minus, Plus } from 'lucide-react';
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export function UuidGenerator() {
  const [version, setVersion] = useState<'v1' | 'v4'>('v4');
  const [count, setCount] = useState<number>(1);
  const [uuids, setUuids] = useState<string[]>([uuidv4()]);
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => {
      return version === 'v1' ? uuidv1() : uuidv4();
    });
    setUuids(newUuids);
  };

  const handleCopyAll = () => {
    copyToClipboard(uuids.join('\n'));
  };

  const handleDownload = () => {
    if (uuids.length === 0) return;
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${version}-${count}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
          <Fingerprint className="w-5 h-5 text-rose-500" />
          UUID Generator
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">UUID Version</label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as 'v1' | 'v4')}
              className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-shadow appearance-none"
            >
              <option value="v4">Version 4 (Random)</option>
              <option value="v1">Version 1 (Time-based)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Quantity (Bulk Generate)</label>
            <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-rose-500 transition-shadow">
              <button
                onClick={() => setCount(Math.max(1, count - 1))}
                className="p-3 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min="1"
                max="500"
                value={count}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) setCount(Math.min(500, Math.max(1, val)));
                }}
                className="w-full p-3 text-center bg-transparent outline-none font-mono"
              />
              <button
                onClick={() => setCount(Math.min(500, count + 1))}
                className="p-3 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full flex items-center justify-center gap-2 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors font-medium mb-6"
        >
          <RefreshCw className="w-4 h-4" />
          Generate UUIDs
        </button>

        {uuids.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Results ({uuids.length})
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleCopyAll}
                  className="flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400 hover:underline"
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {isCopied ? 'Copied All!' : 'Copy All'}
                </button>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400 hover:underline"
                >
                  <Download className="w-4 h-4" />
                  Export .txt
                </button>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 max-h-96 overflow-y-auto border border-slate-200 dark:border-slate-700">
              <ul className="space-y-2">
                {uuids.map((uuid, idx) => (
                  <li key={idx} className="font-mono text-sm flex justify-between items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <span>{uuid}</span>
                    <CopyButton text={uuid} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  
  return (
    <button
      onClick={() => copyToClipboard(text)}
      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
      title="Copy to clipboard"
    >
      {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

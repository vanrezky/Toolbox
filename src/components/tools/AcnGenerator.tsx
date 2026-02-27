import React, { useState } from 'react';
import { Copy, Check, Plus, Minus, RefreshCw } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { generateMultipleACNs } from '../../utils/acn';

export function AcnGenerator() {
  const [count, setCount] = useState(1);
  const [acns, setAcns] = useState<string[]>([]);
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleGenerate = () => {
    setAcns(generateMultipleACNs(count));
  };

  const handleCopyAll = () => {
    copyToClipboard(acns.join('\n'));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-medium mb-4">Generate Australian Company Numbers</h2>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
            <button
              onClick={() => setCount(Math.max(1, count - 1))}
              className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-mono">{count}</span>
            <button
              onClick={() => setCount(Math.min(100, count + 1))}
              className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Generate
          </button>
        </div>

        {acns.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Results</h3>
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {isCopied ? 'Copied All!' : 'Copy All'}
              </button>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 max-h-96 overflow-y-auto border border-slate-200 dark:border-slate-700">
              <ul className="space-y-2">
                {acns.map((acn, idx) => (
                  <li key={idx} className="font-mono text-sm flex justify-between items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <span>{acn.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')}</span>
                    <CopyButton text={acn} />
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

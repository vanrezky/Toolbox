import React, { useState, useMemo } from 'react';
import { Copy, Check, Hash } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export function Sha1Tool() {
  const [sha1Input, setSha1Input] = useState('');
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const sha1Hash = useMemo(() => {
    return sha1Input ? CryptoJS.SHA1(sha1Input).toString() : '';
  }, [sha1Input]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-emerald-500" />
          SHA1 Generator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Input Text</label>
            <textarea
              value={sha1Input}
              onChange={(e) => setSha1Input(e.target.value)}
              className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow resize-none"
              placeholder="Enter text to hash..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SHA1 Hash</label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={sha1Hash}
                className="w-full p-3 pr-12 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm outline-none"
                placeholder="Hash will appear here..."
              />
              {sha1Hash && (
                <button
                  onClick={() => copyToClipboard(sha1Hash)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-emerald-500 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
                  title="Copy hash"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

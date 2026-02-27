import React, { useState, useMemo } from 'react';
import { Copy, Check, Lock, Unlock } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export function Md5Tool() {
  const [md5Input, setMd5Input] = useState('');
  const [md5DecryptInput, setMd5DecryptInput] = useState('');
  
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const md5Hash = useMemo(() => {
    return md5Input ? CryptoJS.MD5(md5Input).toString() : '';
  }, [md5Input]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-teal-500" />
          MD5 Encrypt & Decrypt
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Encrypt */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Encrypt</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Plain Text</label>
              <textarea
                value={md5Input}
                onChange={(e) => setMd5Input(e.target.value)}
                className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-shadow resize-none"
                placeholder="Enter text to encrypt..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">MD5 Hash</label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={md5Hash}
                  className="w-full p-3 pr-12 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm outline-none"
                />
                {md5Hash && (
                  <button
                    onClick={() => copyToClipboard(md5Hash)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-teal-500 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Decrypt (Simulated) */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Unlock className="w-4 h-4" />
              Decrypt (Simulated)
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">MD5 Hash</label>
              <textarea
                value={md5DecryptInput}
                onChange={(e) => setMd5DecryptInput(e.target.value)}
                className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-shadow resize-none font-mono text-sm"
                placeholder="Enter MD5 hash..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Result</label>
              <div className="w-full p-3 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm min-h-[46px] flex items-center text-slate-500 italic">
                {md5DecryptInput ? (
                  md5DecryptInput === md5Hash ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium not-italic">{md5Input}</span>
                  ) : (
                    <span className="text-rose-500">Decryption failed. MD5 is a one-way hash.</span>
                  )
                ) : (
                  "Waiting for input..."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

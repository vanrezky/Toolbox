import React, { useState } from 'react';
import { Key, ShieldCheck, AlertCircle, Copy, Check } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export function JwtDebugger() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleDecode = (val: string) => {
    setToken(val);
    setError(null);
    if (!val) {
      setHeader(null);
      setPayload(null);
      return;
    }

    try {
      const decodedHeader = jwtDecode(val, { header: true });
      const decodedPayload = jwtDecode(val);
      setHeader(decodedHeader);
      setPayload(decodedPayload);
    } catch (e) {
      setError('Invalid JWT Token format');
      setHeader(null);
      setPayload(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
          <Key className="w-5 h-5 text-violet-500" />
          JWT Debugger
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider">Encoded Token</label>
            <textarea
              value={token}
              onChange={(e) => handleDecode(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm h-96 outline-none focus:ring-2 focus:ring-violet-500 transition-shadow break-all"
              placeholder="Paste your JWT here..."
            />
            {error && (
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl flex items-center gap-3 border border-rose-200 dark:border-rose-800">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider">Header</label>
                {header && (
                  <button onClick={() => copyToClipboard(JSON.stringify(header, null, 2))} className="text-slate-400 hover:text-violet-500 transition-colors">
                    {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>
              <pre className="p-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs overflow-x-auto min-h-[120px]">
                {header ? JSON.stringify(header, null, 2) : '// Header will appear here'}
              </pre>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider">Payload</label>
                {payload && (
                  <button onClick={() => copyToClipboard(JSON.stringify(payload, null, 2))} className="text-slate-400 hover:text-violet-500 transition-colors">
                    {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>
              <pre className="p-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs overflow-x-auto min-h-[240px]">
                {payload ? JSON.stringify(payload, null, 2) : '// Payload will appear here'}
              </pre>
            </div>

            {payload && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl flex items-center gap-3 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-medium uppercase tracking-widest">Client-Side Decoded Only</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check, Trash2 } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

type Mode = 'base64' | 'url';

export function EncoderDecoder() {
  const [mode, setMode] = useState<Mode>('base64');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleEncode = () => {
    try {
      if (mode === 'base64') {
        setOutput(btoa(input));
      } else {
        setOutput(encodeURIComponent(input));
      }
    } catch (e) {
      setOutput('Error: Invalid input for encoding');
    }
  };

  const handleDecode = () => {
    try {
      if (mode === 'base64') {
        setOutput(atob(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      setOutput('Error: Invalid input for decoding');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleSwap = () => {
    setInput(output);
    setOutput('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-indigo-500" />
            Encoder & Decoder
          </h2>
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
            <button
              onClick={() => setMode('base64')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'base64' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Base64
            </button>
            <button
              onClick={() => setMode('url')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'url' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700'}`}
            >
              URL
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Input</label>
              <button onClick={handleClear} className="text-slate-400 hover:text-rose-500 transition-colors" title="Clear">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm h-64 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              placeholder={`Enter text to ${mode === 'base64' ? 'Base64' : 'URL'} encode/decode...`}
            />
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleEncode}
                className="py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
              >
                Encode
              </button>
              <button
                onClick={handleDecode}
                className="py-2.5 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
              >
                Decode
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Output</label>
              <div className="flex items-center gap-3">
                <button onClick={handleSwap} className="text-slate-400 hover:text-indigo-500 transition-colors text-xs font-medium" title="Move output to input">
                  Swap to Input
                </button>
                <button onClick={() => copyToClipboard(output)} className="text-slate-400 hover:text-indigo-500 transition-colors" title="Copy output">
                  {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              className="w-full p-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm h-64 outline-none resize-none"
              placeholder="Result will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { Copy, Check, Image as ImageIcon, Download } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export function ThumbnailGenerator() {
  const [width, setWidth] = useState('600');
  const [height, setHeight] = useState('400');
  const [text, setText] = useState('Hello World');
  const [ext, setExt] = useState('.png');
  
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const generatedUrl = useMemo(() => {
    const w = width || '600';
    const h = height || '400';
    const extStr = ext || '.png';
    const textStr = text ? `?text=${encodeURIComponent(text)}` : '';
    
    return `https://placehold.co/${w}x${h}${extStr}${textStr}`;
  }, [width, height, text, ext]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-sky-500" />
          Thumbnail Generator (Placehold.co)
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-shadow"
                  placeholder="600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-shadow"
                  placeholder="400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Custom Text (Optional)</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-shadow"
                placeholder="Hello World"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Extension</label>
              <select
                value={ext}
                onChange={(e) => setExt(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-shadow appearance-none"
              >
                <option value=".png">.png</option>
                <option value=".jpg">.jpg</option>
                <option value=".webp">.webp</option>
                <option value=".gif">.gif</option>
              </select>
            </div>
            
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Generated URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedUrl}
                  className="flex-1 p-3 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm outline-none"
                />
                <button
                  onClick={() => copyToClipboard(generatedUrl)}
                  className="p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-colors flex items-center justify-center"
                  title="Copy URL"
                >
                  {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Live Preview</h3>
            <div className="flex-1 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center p-4 min-h-[300px]">
              <img
                src={generatedUrl}
                alt="Thumbnail Preview"
                className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

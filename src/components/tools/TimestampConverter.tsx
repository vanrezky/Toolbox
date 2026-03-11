import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, Calendar, Copy, Check } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [dateStr, setDateStr] = useState<string>(new Date().toISOString());
  const [currentUnix, setCurrentUnix] = useState<number>(Math.floor(Date.now() / 1000));
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentUnix(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTimestampChange = (val: string) => {
    setTimestamp(val);
    const num = parseInt(val);
    if (!isNaN(num)) {
      // Handle both seconds and milliseconds
      const date = new Date(val.length > 10 ? num : num * 1000);
      if (!isNaN(date.getTime())) {
        setDateStr(date.toISOString());
      }
    }
  };

  const handleDateChange = (val: string) => {
    setDateStr(val);
    const date = new Date(val);
    if (!isNaN(date.getTime())) {
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
    }
  };

  const setToNow = () => {
    const now = Date.now();
    setTimestamp(Math.floor(now / 1000).toString());
    setDateStr(new Date(now).toISOString());
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Unix Timestamp Converter
          </h2>
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-mono text-slate-500">Current Unix:</span>
            <span className="text-sm font-mono font-bold text-amber-600 dark:text-amber-400">{currentUnix}</span>
          </div>
        </div>

        <div className="space-y-8">
          {/* Unix to Date */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider">Unix Timestamp (Seconds)</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={timestamp}
                  onChange={(e) => handleTimestampChange(e.target.value)}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg focus:ring-2 focus:ring-amber-500 outline-none transition-shadow"
                  placeholder="Enter Unix timestamp..."
                />
                <button
                  onClick={() => copyToClipboard(timestamp)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={setToNow}
                className="px-6 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                title="Set to current time"
              >
                <RefreshCw className="w-4 h-4" />
                Now
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
          </div>

          {/* Date to Unix */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider">ISO 8601 / Human Readable</label>
            <div className="relative">
              <input
                type="text"
                value={dateStr}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg focus:ring-2 focus:ring-amber-500 outline-none transition-shadow"
                placeholder="YYYY-MM-DDTHH:MM:SSZ"
              />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="block text-xs text-slate-500 mb-1">Local Time</span>
                <span className="text-sm font-medium">{new Date(dateStr).toLocaleString()}</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="block text-xs text-slate-500 mb-1">UTC Time</span>
                <span className="text-sm font-medium">{new Date(dateStr).toUTCString()}</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 col-span-2 md:col-span-1">
                <span className="block text-xs text-slate-500 mb-1">Relative</span>
                <span className="text-sm font-medium">{getRelativeTime(new Date(dateStr))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getRelativeTime(date: Date) {
  const diff = date.getTime() - Date.now();
  const seconds = Math.floor(Math.abs(diff) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const prefix = diff > 0 ? 'In ' : '';
  const suffix = diff > 0 ? '' : ' ago';

  if (seconds < 60) return `${prefix}${seconds}s${suffix}`;
  if (minutes < 60) return `${prefix}${minutes}m${suffix}`;
  if (hours < 24) return `${prefix}${hours}h${suffix}`;
  return `${prefix}${days}d${suffix}`;
}

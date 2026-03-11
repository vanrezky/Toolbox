import React, { useState } from 'react';
import { Copy, Check, Shield, ShieldCheck } from 'lucide-react';
import bcrypt from 'bcryptjs';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export function BcryptTool() {
  // Generator State
  const [genInput, setGenInput] = useState('');
  const [saltRounds, setSaltRounds] = useState(10);
  const [generatedHash, setGeneratedHash] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Verify State
  const [verifyInput, setVerifyInput] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleGenerate = () => {
    if (!genInput) return;
    setIsGenerating(true);
    // Use setTimeout to allow UI to update before heavy computation
    setTimeout(() => {
      bcrypt.hash(genInput, saltRounds, (err, hash) => {
        if (!err && hash) {
          setGeneratedHash(hash);
        }
        setIsGenerating(false);
      });
    }, 10);
  };

  const handleVerify = () => {
    if (!verifyInput || !verifyHash) return;
    setIsVerifying(true);
    setTimeout(() => {
      bcrypt.compare(verifyInput, verifyHash, (err, res) => {
        setVerifyResult(res);
        setIsVerifying(false);
      });
    }, 10);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-500" />
          Bcrypt Generator & Verifier
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Generator */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Generate Hash
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Plain Text</label>
              <input
                type="text"
                value={genInput}
                onChange={(e) => setGenInput(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
                placeholder="Enter text to hash..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Salt Rounds: {saltRounds}</label>
              <input
                type="range"
                min="4"
                max="16"
                value={saltRounds}
                onChange={(e) => setSaltRounds(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <p className="text-xs text-slate-400 mt-1">Higher rounds = more secure but slower.</p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!genInput || isGenerating}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl transition-colors font-medium flex justify-center items-center"
            >
              {isGenerating ? 'Generating...' : 'Generate Bcrypt Hash'}
            </button>

            {generatedHash && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Result</label>
                <div className="relative">
                  <textarea
                    readOnly
                    value={generatedHash}
                    className="w-full p-3 pr-12 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm outline-none resize-none h-24"
                  />
                  <button
                    onClick={() => copyToClipboard(generatedHash)}
                    className="absolute right-2 top-2 p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
                    title="Copy hash"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Verifier */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Verify Hash
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Plain Text</label>
              <input
                type="text"
                value={verifyInput}
                onChange={(e) => {
                  setVerifyInput(e.target.value);
                  setVerifyResult(null);
                }}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                placeholder="Enter text to verify..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bcrypt Hash</label>
              <textarea
                value={verifyHash}
                onChange={(e) => {
                  setVerifyHash(e.target.value);
                  setVerifyResult(null);
                }}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow font-mono text-sm resize-none h-24"
                placeholder="$2a$10$..."
              />
            </div>

            <button
              onClick={handleVerify}
              disabled={!verifyInput || !verifyHash || isVerifying}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl transition-colors font-medium flex justify-center items-center"
            >
              {isVerifying ? 'Verifying...' : 'Verify Match'}
            </button>

            {verifyResult !== null && (
              <div className={`p-4 rounded-xl flex items-center gap-3 ${verifyResult ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'}`}>
                {verifyResult ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Match! The text corresponds to the hash.</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold text-lg leading-none">×</span>
                    <span className="font-medium">No Match. The text does not match the hash.</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

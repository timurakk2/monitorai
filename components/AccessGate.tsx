
import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { ACCESS_CODE } from '../constants';

interface AccessGateProps {
  onUnlock: () => void;
}

const AccessGate: React.FC<AccessGateProps> = ({ onUnlock }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === ACCESS_CODE) {
      localStorage.setItem('monitor_ai_unlocked', 'true');
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
      setCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
      <div className={`w-full max-w-sm p-8 bg-white border border-gray-100 rounded-[32px] shadow-2xl transition-all duration-300 ${error ? 'animate-bounce' : 'animate-fade-in'}`}>
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white shadow-lg animate-breathing">
            <ShieldCheck size={32} />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Access Gate</h1>
            <p className="text-sm text-gray-400">Enter your 6-digit identification code</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="••••••"
                className={`w-full h-14 bg-[#F5F5F7] rounded-2xl text-center text-2xl font-mono tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-black/5 border border-transparent transition-all ${error ? 'border-red-500' : ''}`}
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              disabled={code.length < 6}
              className="w-full h-14 bg-black text-white rounded-2xl flex items-center justify-center space-x-2 font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              <span>Unlock Monitor</span>
              <ArrowRight size={20} />
            </button>
          </form>
          
          <p className="text-[10px] text-gray-300 uppercase tracking-widest font-medium">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessGate;

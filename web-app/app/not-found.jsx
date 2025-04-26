'use client';

import { useRouter } from 'next/navigation';
import { X, Wallet, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Large glowing circle in background that pulses */}
      <div className={`absolute w-96 h-96 rounded-full bg-white opacity-0 transition-all duration-2000 ${mounted ? 'animate-pulse-strong opacity-5' : ''}`}></div>
      
      <div className="max-w-md w-full mx-auto text-center space-y-8 px-4 z-10">
        {/* Error Icon with visible animation */}
        <div className="flex justify-center mb-6">
          <div className={`relative transition-all duration-700 ${mounted ? 'animate-float-visible' : 'scale-0'}`}>
            <Wallet className="w-24 h-24 text-white" />
            <div className="absolute -top-5 -right-5 ">
              <X className="w-12 h-12 text-white animate-pulse" color='red'/>
            </div>
          </div>
        </div>
        
        {/* Error Message with slide-in animation */}
        <div className="space-y-4">
          <h1 className={`text-6xl font-bold text-white transition-all duration-700 ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'}`}>404</h1>
          <h2 className={`text-3xl font-semibold transition-all duration-700 delay-100 ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>Wallet Not Found</h2>
          <p className={`text-white opacity-80 mt-4 transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-80' : 'translate-y-8 opacity-0'}`}>
            The digital asset you're looking for seems to have wandered into another blockchain.
          </p>
        </div>
        
        {/* Return Home Button with distinct hover animation */}
        <button
          onClick={() => router.push('/')}
          className={`group flex items-center justify-center space-x-2 mx-auto bg-white text-black font-medium py-3 px-8 rounded-lg transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:scale-105`}
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Return Home</span>
        </button>
        
        {/* Error Code with visible typing animation */}
        <div className={`mt-10 py-3 px-4 border border-white/20 rounded-md inline-block mx-auto transition-all duration-700 delay-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <code className="text-sm text-white font-mono whitespace-nowrap overflow-hidden" style={{ 
            animation: mounted ? 'typing 3.5s steps(30, end), blink-caret 0.75s step-end infinite' : 'none',
            borderRight: '2px solid white',
            width: mounted ? '100%' : '0'
          }}>
            Error: WALLET_NOT_FOUND
          </code>
        </div>
      </div>

      {/* Visible floating particles */}
      {mounted && Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i}
          className="absolute bg-white rounded-full animate-float-particle"
          style={{
            width: `${Math.random() * 8 + 3}px`,
            height: `${Math.random() * 8 + 3}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: `${Math.random() * 0.2 + 0.1}`,
            animationDuration: `${Math.random() * 8 + 7}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      {/* Add global animation styles - more pronounced */}
      <style jsx global>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: white }
        }
        
        @keyframes float-visible {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float-visible {
          animation: float-visible 3s ease-in-out infinite;
        }
        
        @keyframes pulse-strong {
          0%, 100% { transform: scale(1); opacity: 0.05; }
          50% { transform: scale(1.1); opacity: 0.08; }
        }
        
        .animate-pulse-strong {
          animation: pulse-strong 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes float-particle {
          0% { transform: translate(0, 0); }
          25% { transform: translate(10px, -20px); }
          50% { transform: translate(-15px, -40px); }
          75% { transform: translate(-20px, -20px); }
          100% { transform: translate(0, 0); }
        }
        
        .animate-float-particle {
          animation: float-particle infinite linear;
        }
      `}</style>
    </div>
  );
}
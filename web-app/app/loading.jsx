'use client';

import { useState, useEffect } from 'react';

export default function LoadingAnimation() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-50">
      {/* Background pulse effect */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white opacity-5 animate-pulse-slow"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', 
             backgroundSize: '40px 40px'
           }}></div>
      
      {/* Main loading container */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Circular orbit animation */}
        <div className="relative w-40 h-40">
          {/* Center wallet logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center animate-float">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 4H6C3.79 4 2 5.79 2 8v8c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zm-1 10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM18 7H6c-.55 0-1-.45-1-1 0-.55.45-1 1-1h12c.55 0 1 .45 1 1 0 .55-.45 1-1 1z" />
            </svg>
          </div>
          
          {/* Orbiting dots */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
              style={{
                animation: `orbit ${2 + i * 0.1}s linear infinite`,
                transform: `rotate(${i * 30}deg) translateX(60px) rotate(${i * 30}deg)`,
                opacity: mounted ? 0.6 : 0
              }}
            ></div>
          ))}
          
          {/* Spinning rings */}
          <div className="absolute inset-0 border-2 border-white opacity-20 rounded-full animate-spin" style={{animationDuration: '10s'}}></div>
          <div className="absolute inset-0 border-2 border-white opacity-30 rounded-full animate-reverse-spin" style={{animationDuration: '15s'}}></div>
          <div className="absolute inset-2 border-2 border-dashed border-white opacity-20 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
        </div>
        
        {/* Loading text with typing effect */}
        <div className={`mt-8 text-white text-xl font-medium ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 delay-300`}>
          <div className="typing-effect overflow-hidden whitespace-nowrap border-r-2 border-white pr-1">
            Loading Smart Wallet
          </div>
        </div>
        
        {/* Progress bar */}
        <div className={`mt-6 w-48 h-1 bg-white bg-opacity-20 rounded-full overflow-hidden ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 delay-400`}>
          <div className="h-full bg-white animate-progress-indeterminate"></div>
        </div>
      </div>
      
      {/* Binary code effect in background */}
      {mounted && [...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="absolute select-none text-white opacity-10 animate-binary-fall"
          style={{
            top: `-${Math.random() * 20}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 10 + 8}px`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          {generateBinaryString(20)}
        </div>
      ))}
      
      {/* Floating particles */}
      {mounted && [...Array(20)].map((_, i) => (
        <div 
          key={`particle-${i}`}
          className="absolute bg-white rounded-full animate-float-particle"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: `${Math.random() * 0.15 + 0.05}`,
            animationDuration: `${Math.random() * 8 + 7}s`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}

      {/* Global styles */}
      <style jsx global>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes reverse-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }
        
        .animate-spin {
          animation: spin linear infinite;
        }
        
        .animate-reverse-spin {
          animation: reverse-spin linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.05; }
          50% { transform: scale(1.2); opacity: 0.1; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes float-particle {
          0% { transform: translate(0, 0); }
          25% { transform: translate(10px, -20px); }
          50% { transform: translate(-15px, -30px); }
          75% { transform: translate(-10px, -10px); }
          100% { transform: translate(0, 0); }
        }
        
        .animate-float-particle {
          animation: float-particle infinite linear;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 2.5s steps(20, end) infinite alternate;
        }
        
        @keyframes progress-indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-progress-indeterminate {
          animation: progress-indeterminate 2s ease-in-out infinite;
          width: 100%;
        }
        
        @keyframes binary-fall {
          0% { transform: translateY(-20px); opacity: 0.1; }
          10% { opacity: 0.2; }
          90% { opacity: 0.1; }
          100% { transform: translateY(1000px); opacity: 0; }
        }
        
        .animate-binary-fall {
          animation: binary-fall linear infinite;
        }
      `}</style>
    </div>
  );
}

// Helper function to generate random binary strings
function generateBinaryString(length) {
  return Array.from({ length }, () => Math.round(Math.random())).join('');
}
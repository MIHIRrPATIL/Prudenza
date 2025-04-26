"use client"

import { Plus, ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateDrawer from "./CreateDrawer";
import { Card, CardContent } from "./ui/card";

// Improved dot pattern component with wave animation
function DotPattern() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 5 }).map((_, row) => (
            Array.from({ length: 5 }).map((_, col) => {
              // Calculate position for wave effect
              const cx = 6 + col * 9;
              const cy = 6 + row * 9;
              
              return (
                <motion.circle 
                  key={`${row}-${col}`}
                  cx={cx}
                  cy={cy}
                  r="2"
                  fill="white"
                  fillOpacity="0.6"
                  initial={{ opacity: 0.4 }}
                  animate={{ 
                    opacity: [0.4, 0.8, 0.4],
                    y: [0, -2, 0, 2, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    delay: (row * 0.2 + col * 0.1) % 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              );
            })
          ))}
        </svg>
      </div>
    </div>
  );
}

// Animated counter for amounts
function AnimatedCounter({ value, prefix = "₹" }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const numericValue = parseFloat(String(value).replace(/,/g, ''));
    const duration = 1000; // 1 second animation
    const startTime = Date.now();
    const startValue = displayValue;
    const updateValue = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easeProgress = progress * (2 - progress); // Ease out quad
        const currentValue = startValue + (numericValue - startValue) * easeProgress;
        setDisplayValue(currentValue);
        requestAnimationFrame(updateValue);
      } else {
        setDisplayValue(numericValue);
      }
    };
    
    requestAnimationFrame(updateValue);
  }, [value]);
  
  return (
    <span>{prefix} {displayValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
  );
}

export default function TopBar({ children }) {
  return (
    <motion.header 
      className="border flex flex-col sm:flex-row justify-start items-center rounded-3xl mt-5 text-white/70 gap-6 border-white/40 p-4 bg-black/20 backdrop-blur-sm w-full  mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4 sm:mb-0">
        <motion.div
          className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15 6H9L12 2Z" fill="white"/>
            <path d="M19 10V20H5V10H19ZM21 8H3V22H21V8Z" fill="white"/>
            <path d="M12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12Z" fill="white"/>
          </svg>
        </motion.div>
        <h1 className="text-white font-semibold text-2xl tracking-tight">
          Available Balance
        </h1>
      </div>
      
      <div className="flex-1 w-full overflow-x-visible py-2 ag-scrollbar-invisible">
        <ul className="flex gap-4 min-w-max">{children}</ul>
      </div>
    </motion.header>
  );
}

export function BalanceCard({
  title,
  amount,
  icon,
  details_1,
  details_2,
  overview,
}) {
  const isPositive = overview >= 0;
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <motion.li 
      className="border border-white/20 bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-sm rounded-2xl overflow-hidden group min-w-[280px] sm:min-w-[350px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(255, 255, 255, 0.05)"
      }}
    >
      <div className="w-full px-6 py-5 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-2 rounded-lg bg-white/10"
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              {icon || (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </motion.div>
            <div>
              <h3 className="font-medium text-base text-white/90">{title}</h3>
              <p className="text-xs text-white/50 mt-1">{details_1}</p>
            </div>
          </div>
          
          <div className="relative">
            <DotPattern />
            <motion.div
              className={`absolute inset-0 flex items-center justify-center font-medium text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="flex items-center">
                {isPositive ? (
                  <ArrowUpRight size={14} className="mr-1" />
                ) : (
                  <ArrowDownRight size={14} className="mr-1" />
                )}
                {overview}%
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-2">
          <h2 className="text-3xl font-bold text-white font-mono tracking-tight">
            <AnimatedCounter value={amount} />
          </h2>
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
          <p className="text-sm text-white/60">{!showDetails ? "View details" : "Hide details"}</p>
          <motion.button
            className="text-white/80 text-xs font-medium bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(!showDetails)}
          >
            Details
            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </motion.button>
        </div>
        
        <AnimatePresence>
          {showDetails && (
            <motion.div 
              className="mt-4 pt-4 border-t border-white/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white/5 p-3 rounded-lg">
                  <h4 className="text-white/70 text-xs font-medium mb-1">Account Details</h4>
                  <p className="text-white text-sm">{details_1}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <h4 className="text-white/70 text-xs font-medium mb-1">Transaction Summary</h4>
                  <p className="text-white text-sm">{details_2}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className={`h-full ${isPositive ? 'bg-green-500/30' : 'bg-red-500/30'}`}></div>
        </motion.div>
      </div>
    </motion.li>
  );
}

export function AddAccountCard() {
  return (
    <CreateDrawer>
      <motion.li 
        className="border border-white/20 bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-sm rounded-2xl overflow-hidden group min-w-[280px] sm:min-w-[350px] cursor-pointer"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ 
          y: -5,
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(255, 255, 255, 0.05)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center px-6 py-10 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <motion.div 
            className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4"
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.5 }}
          >
            <Plus size={32} className="text-white" />
          </motion.div>
          
          <h3 className="text-white/90 font-medium text-lg">Add Account</h3>
          <p className="text-white/50 text-sm mt-2 text-center">Connect a new bank account or card</p>
          
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="h-full bg-white/30"></div>
          </motion.div>
        </div>
      </motion.li>
    </CreateDrawer>
  );
}
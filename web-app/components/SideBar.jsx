"use client";
import {
  Bot,
  ChevronFirst,
  ChevronLast,
  CirclePlus,
  CircleUserRoundIcon,
  LogIn,
  LogOut,
  Search,
} from "lucide-react";
import Image from "next/image";
import { createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const SidebarContext = createContext();

export default function SideBar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const { user, isSignedIn } = useUser();
  
  return (
    <motion.aside
      className="border rounded-3xl text-white/80 border-white/20 bg-gradient-to-b from-gray-900 to-black/95 backdrop-blur-md overflow-hidden"
      initial={{ width: expanded ? 288 : 88 }}
      animate={{ width: expanded ? 288 : 88 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav className="h-full flex flex-col p-4">
        {/* Logo */}
        <div className={`${expanded ? "flex justify-between" : "flex flex-col"} items-center mb-8`}>
          <motion.div 
            className={`${expanded ? "flex" : "flex flex-col"} items-center`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl overflow-hidden">
              <Image
                src="/assets/Logo.png"
                alt="logo"
                width={50}
                height={50}
                className="object-cover"
              />
              <motion.div 
                className="absolute inset-0 bg-white/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <AnimatePresence>
              {expanded && (
                <motion.div
                  className="ml-3 overflow-hidden"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-bold text-lg text-white whitespace-nowrap tracking-wide">
                    PRUDENZA
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.button
            className={`p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 ${expanded ? "" : "mt-4"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronFirst size={18} /> : <ChevronLast size={18} />}
          </motion.button>
        </div>
        
        {/* Action Buttons */}
        <div className={`flex mb-8 ${expanded ? "justify-between" : "flex-col gap-4"}`}>
          <TooltipProvider>
            {/* Add Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  className="bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  <div className={`flex ${expanded ? "flex-row" : "flex-col"} items-center justify-center p-3 gap-2`}>
                    <CirclePlus size={20} />
                    <AnimatePresence>
                      {expanded && (
                        <motion.span
                          className="text-sm font-medium"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          ADD
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </TooltipTrigger>
              {!expanded && <TooltipContent side="right">ADD</TooltipContent>}
            </Tooltip>
            
            {/* Search Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  className="bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  <div className={`flex ${expanded ? "flex-row" : "flex-col"} items-center justify-center p-3 gap-2`}>
                    <Search size={20} />
                    <AnimatePresence>
                      {expanded && (
                        <motion.span
                          className="text-sm font-medium"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          FIND
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </TooltipTrigger>
              {!expanded && <TooltipContent side="right">FIND</TooltipContent>}
            </Tooltip>
            
            {/* Bot Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  className="bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  <div className={`flex ${expanded ? "flex-row" : "flex-col"} items-center justify-center p-3 gap-2`}>
                    <Bot size={20} />
                    <AnimatePresence>
                      {expanded && (
                        <motion.span
                          className="text-sm font-medium"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          BOT
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </TooltipTrigger>
              {!expanded && <TooltipContent side="right">BOT</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <SidebarContext.Provider value={{ expanded }}>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  className="mb-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-medium text-white/50 px-2 uppercase tracking-wider">
                    Main Menu
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.ul layout className="space-y-2">
              {children}
            </motion.ul>
          </SidebarContext.Provider>
        </div>
        
        {/* User Details */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <SignedIn>
            <motion.div 
              className={`${expanded ? "flex items-center" : "flex flex-col"} gap-3`}
              layout
            >
              <div className="relative mx-auto">
                <UserButton 
                  appearance={{
                    elements: { 
                      avatarBox: "w-10 h-10 rounded-xl"
                    }
                  }}
                />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-black"></div>
              </div>
              
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    className="overflow-hidden flex-1"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm font-medium text-white whitespace-nowrap truncate">
                      {isSignedIn ? user.fullName : "User"}
                    </p>
                    <p className="text-xs text-white/50 whitespace-nowrap truncate">
                      {isSignedIn ? user.primaryEmailAddress.emailAddress : ""}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {expanded && (
                  <motion.button
                    className="p-2 rounded-lg hover:bg-white/10 text-white/70"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LogOut size={16} />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </SignedIn>
          
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <motion.button
                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white py-2 px-4 rounded-xl transition-colors border border-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <LogIn size={18} />
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      className="font-medium"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      LOGIN
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </motion.aside>
  );
}

export function SidebarItem({ title, alert, active, icon, path = "/" }) {
  const { expanded } = useContext(SidebarContext);
  const router = useRouter();
  
  const handleClick = (e) => {
    e.preventDefault();
    router.push(path);
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.li
            layout
            onClick={handleClick}
            className={`flex items-center relative cursor-pointer px-3 py-2 rounded-xl transition-colors ${
              active 
                ? "bg-white/20 text-white" 
                : "hover:bg-white/10 text-white/70"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`flex-shrink-0 ${active ? "text-white" : "text-white/70"} ${!expanded && "mx-auto"}`}>
              {icon}
            </div>
            
            <AnimatePresence>
              {expanded && (
                <motion.div
                  className="ml-3 overflow-hidden flex-1"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="whitespace-nowrap font-medium">{title}</span>
                </motion.div>
              )}
            </AnimatePresence>
            
            {alert && !active && (
              <motion.div
                className="absolute w-2 h-2 bg-white rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.8
                }}
                style={{ 
                  right: expanded ? 12 : "50%", 
                  top: expanded ? "50%" : 8,
                  translateY: expanded ? "-50%" : 0,
                  translateX: expanded ? 0 : "50%"
                }}
              />
            )}
          </motion.li>
        </TooltipTrigger>
        {!expanded && <TooltipContent side="right">{title}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}

// Custom scrollbar styles - add to your global CSS
/* 
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
*/
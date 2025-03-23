"use client";

import {
  ChevronFirst,
  ChevronLast,
  CircleUserRoundIcon,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { createContext, useState, useContext } from "react";
const SidebarContext = createContext();

export default function SideBar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`border rounded-4xl text-white/70 p-3 border-white/40 
      fixed left-5 top-1/2 transform -translate-y-1/2 bg-black transition-all duration-300 ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      <nav className="h-full flex flex-col">
        {/* Logo */}
        <div className={`justify-between items-center border-b border-white/20 pb-3 ${expanded ? "flex" : "flex-col items-center justify-between mx-auto"}`}>
          <div className={`p-2 items-center ${expanded ? "flex" : "flex-col gap-3"}`}>
            <Image
              src="/assets/White-Logo-Only.png"
              alt="logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expanded ? "ml-2 w-28 opacity-100" : "w-0 opacity-0 hidden"
              }`}
            >
              <p className="font-bold text-gray-50/70 whitespace-nowrap">PRUDENZA</p>
            </div>
          </div>
          <button
            className={`p-1.5 rounded-full bg-white/10 hover:bg-gray-100/30 transition-all ${expanded ? "" : "mx-2"}`}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Navigation */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="my-5 items-center justify-center">
            <div
              className={`transition-all duration-300 overflow-hidden ${
                expanded ? "h-8 opacity-100 mb-4" : "h-0 opacity-0 mb-0"
              }`}
            >
              <p className="text-md text-white/90 px-2">Main Menu</p>
            </div>
            {children}
          </ul>
        </SidebarContext.Provider>

        {/* User Details */}
        <div className={`border-t border-white/20 justify-center items-center py-2 pt-5 ${expanded ? "flex gap-2" : "flex-col mx-auto"}`}>
          <CircleUserRoundIcon size={25} className="flex-shrink-0" />
          <div
            className={`overflow-hidden transition-all duration-300 justify-center text-xs ${
              expanded ? "w-32 opacity-100" : "w-0 opacity-0 hidden"
            }`}
          >
            <p className="text-white font-semibold whitespace-nowrap">John Doe</p>
            <p className="text-white/50 whitespace-nowrap">john.doe@example.com</p>
          </div>
          <div
            className={`ml-auto overflow-hidden transition-all duration-300 ${
              expanded ? "w-8 opacity-100" : "w-0 opacity-0 hidden"
            }`}
          >
            <button
              className="bg-red-500/70 flex-shrink-0 hover:bg-red-500/90 rounded-xl p-1.5"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ title, alert, active, icon, path }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`flex cursor-pointer relative items-center py-2 justify-center rounded-xl transition-colors mb-2
        ${
          active
            ? "bg-gray-50/70 text-black"
            : "hover:bg-white/10 transition-all duration-300"
        }`}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "ml-3 w-32 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <span className="whitespace-nowrap">{title}</span>
      </div>
      {alert && !active && (
        <div 
          className={`absolute w-2 h-2 rounded-full bg-white/90 transition-all duration-300 ${
            expanded ? "right-3 top-1/2 -translate-y-1/2" : "right-2 top-2"
          }`}
        ></div>
      )}
    </li>
  );
}
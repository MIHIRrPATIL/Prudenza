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
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
const SidebarContext = createContext();

export default function SideBar({ children }) {
  const [expanded, setExpanded] = useState(true);

  const { user , isSignedIn } = useUser();

  return (
    <aside
      className={`border rounded-4xl text-white/70 p-3 border-white/40 
       bg-black transition-[width] duration-300 ${expanded ? "w-72" : "w-20"}`}
    >
      <nav className="h-full flex flex-col">
        {/* Logo */}
        <div
          className={`justify-between items-center border-b border-white/20 pb-3 ${
            expanded ? "flex" : "flex-col items-center justify-between mx-auto"
          }`}
        >
          <div
            className={`p-2 items-center ${
              expanded ? "flex" : "flex-col gap-3"
            }`}
          >
            <Image
              src="/assets/Logo.png"
              alt="logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div
              className={`overflow-hidden transition-[width,opacity] duration-300 ${
                expanded ? "ml-2 w-28 opacity-100" : "w-0 opacity-0 hidden"
              }`}
            >
              <p className="font-bold text-gray-50/70 whitespace-nowrap">
                PRUDENZA
              </p>
            </div>
          </div>
          <button
            className={`p-1.5 rounded-full bg-white/10 hover:bg-gray-100/30 transition-colors ${
              expanded ? "" : "mx-2"
            }`}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Cards */}
        <div
          className={`flex p-5 align-middle justify-between items-center border-b border-white/30 mb-3 ${
            expanded ? "flex-row gap-5" : "flex-col gap-1"
          }`}
        >
          {/* Add Button */}
          <button
            className={`rounded-xl hover:scale-110 transition-transform duration-300 ${
              expanded ? "p-2 border border-white/20" : ""
            }`}
          >
            <div className="flex-col items-center justify-center p-1">
              <CirclePlus size={25} className="mx-auto m-1" />
              <p className={`text-sm ${expanded ? "" : "hidden"}`}>ADD</p>
            </div>
          </button>

          {/* Search Button */}
          <button
            className={`rounded-xl hover:scale-110 transition-transform duration-300 ${
              expanded ? "p-2 border border-white/20" : ""
            }`}
          >
            <div className="flex-col items-center justify-center p-1">
              <Search size={25} className="mx-auto m-1" />
              <p className={`text-sm ${expanded ? "" : "hidden"}`}>FIND</p>
            </div>
          </button>

          {/* Bot Button */}
          <button
            className={`rounded-xl hover:scale-110 transition-transform duration-300 ${
              expanded ? "p-2 border border-white/20" : ""
            }`}
          >
            <div className="flex-col items-center justify-center p-1">
              <Bot size={25} className="mx-auto m-1" />
              <p className={`text-sm ${expanded ? "" : "hidden"}`}>BOT</p>
            </div>
          </button>
        </div>

        {/* Navigation */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="my-5 items-center justify-center">
            <div
              className={`transition-[height,opacity] duration-300 overflow-hidden ${
                expanded ? "h-8 opacity-100 mb-4" : "h-0 opacity-0 mb-0"
              }`}
            >
              <p className="text-md text-white/90 px-2">Main Menu</p>
            </div>
            {children}
          </ul>
        </SidebarContext.Provider>

        {/* User Details */}
        <SignedIn>
          <div
            className={`border-t border-white/20 justify-between items-center py-2 pt-5 ${
              expanded ? "flex gap-5" : "flex-col mx-auto"
            }`}
          >
            {/* <CircleUserRoundIcon size={25} className="flex-shrink-0" /> */}
            <UserButton appearance={{
              elements : { 
                avatarBox : "w-16 h-16" 
              }
            }} /> 
            <div
              className={`overflow-hidden transition-[width,opacity] duration-300 justify-center text-xs ${
                expanded ? "opacity-100" : "w-0 opacity-0 hidden"
              }`}
            >
              <p className="text-white font-semibold whitespace-nowrap">
                {isSignedIn ? user.fullName : "User"}{" "}
              </p>
              <p className="text-white/50 whitespace-nowrap">
              {isSignedIn ? user.primaryEmailAddress.emailAddress : " "}{" "}
              </p>
            </div>
            <div
              className={`ml-auto overflow-hidden transition-[width,opacity] duration-300 ${
                expanded ? "w-8 opacity-100" : "w-0 opacity-0 hidden"
              }`}
            ></div>
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="ghost" className={'${expanded ? "" : "w-8 mx-auto rounded-full" '}>
              <LogIn /> {expanded ? " LOGIN " : ""}
            </Button>
          </SignInButton>
        </SignedOut>
      </nav>
    </aside>
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
    <li
      className={`flex cursor-pointer relative items-center py-1 justify-center rounded-xl transition-colors group mb-2 ${
        active
          ? "bg-gray-50/70 text-black"
          : "hover:bg-white/10 transition-colors duration-300"
      }`}
      onClick={handleClick}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div
        className={`overflow-hidden transition-[margin,width,opacity] duration-300 ${
          expanded ? "ml-3 w-32 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <span className="whitespace-nowrap">{title}</span>
      </div>
      {alert && !active && (
        <div
          className={`absolute w-2 h-2 rounded-full bg-white/90 transition-[right,top] duration-300 ${
            expanded ? "right-3 top-1/2 -translate-y-1/2" : "right-2 top-2"
          }`}
        ></div>
      )}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 invisible opacity-20 transition-[opacity,transform] duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 ${
            active
              ? "bg-blue-200/60 text-white/70"
              : "bg-white/60 text-black/70"
          }`}
        >
          {title}
        </div>
      )}
    </li>
  );
}

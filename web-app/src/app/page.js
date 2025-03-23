"use client"; // ✅ Ensure it's a Client Component

import {  
  HomeIcon, 
  CreditCard, 
  BarChart, 
  Wallet, 
  Target, 
  Users, 
  Settings 
} from "lucide-react";

import SideBar from "src/components/SideBar";
import { SidebarItem } from "src/components/SideBar"; 

export default function Home() {
  return (
    <SideBar>
      <SidebarItem title="Dashboard" icon={<HomeIcon />} active={true} alert={true}/>
      <SidebarItem title="Transactions" icon={<CreditCard />} alert={true}/>
      <SidebarItem title="Insights" icon={<BarChart />} />
      <SidebarItem title="Budget" icon={<Wallet />} />
      <SidebarItem title="Savings" icon={<Target />} />
      <SidebarItem title="Split" icon={<Users />} />
      <SidebarItem title="Settings" icon={<Settings />} />
    </SideBar>
  );
}

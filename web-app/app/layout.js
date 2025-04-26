import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import SideBar, { SidebarItem } from "@/components/SideBar";
import TopBar, { AddAccountCard, BalanceCard } from "@/components/TopBar";
import { dark, neobrutalism } from "@clerk/themes";
import { LayoutDashboard, PiggyBank } from "lucide-react";
import FloatingButton from "@/components/FloatingButton";
import { Toaster } from "sonner";

export const metadata = {
  title: "Prudenza",
  description: "Next Gen app for your Next Gen finances",
};

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={`${inter.className} bg-black space-y-3`}>
          <TopBar>
            <BalanceCard
              title="Savings"
              amount={12000}
              icon={<PiggyBank/>}
              details_1="Master card 1687" 
              details_2="Updated: Today"
              overview={12.5}
            />
            <BalanceCard
              title="Savings"
              amount={12000}
              icon={<PiggyBank/>}
              details_1="Last Transaction: ₹500"
              details_2="Updated: Today"
              overview={12.5}
            />
            <BalanceCard
              title="Savings"
              amount={12000}
              icon={<PiggyBank />}
              details_1="Last Transaction: ₹500"
              details_2="Updated: Today"
              overview={12.5}
            />
            <AddAccountCard/>
          </TopBar>
          <div className="flex gap-4">
            <SideBar>
              <SidebarItem
                title="dashboard"
                icon={<LayoutDashboard size={20} />}
                path="/dashboard"
              />
            </SideBar>
            <FloatingButton/>
            <main className="flex-1 p-5">{children}</main>
            <Toaster richColors/>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { dark, neobrutalism } from "@clerk/themes";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
    appearance={{
      baseTheme: dark,
    }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-black`}>
          <div className="flex items-start gap-5 p-5">
          <SideBar/>
          <TopBar/>
          </div>
          {children}
          </body>
      </html>
    </ClerkProvider>
  );
}

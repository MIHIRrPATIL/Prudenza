  "use client"; // ✅ Ensure it's a Client Component

  import {
    HomeIcon,
    CreditCard,
    BarChart,
    Wallet,
    Target,
    Users,
    Settings,
    PiggyBank
  } from "lucide-react";

  import SideBar from "src/components/SideBar";
  import { SidebarItem } from "src/components/SideBar";
  import TopBar, { BalanceCard } from "src/components/TopBar";

  export default function Home() {
    return (
      <div className="flex m-5 p-5 gap-10">
        {/* Sidebar Column */}
        <aside>
          <SideBar>
            <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              path="/"
              active={true}
              alert={true}
            />
            <SidebarItem
              title="Transactions"
              icon={<CreditCard />}
              path="/transactions"
              alert={true}
            />
            <SidebarItem title="Insights" icon={<BarChart />} path="/insights" />
            <SidebarItem title="Budget" icon={<Wallet />} path="/budget" />
            <SidebarItem title="Savings" icon={<Target />} path="/savings" />
            <SidebarItem title="Split" icon={<Users />} path="/split" />
            <SidebarItem title="Settings" icon={<Settings />} path="/settings" />
          </SideBar>
        </aside>
        {/* Main Area Column */}
        <div className="flex flex-col gap-5">
          <header>
            <TopBar>
              <BalanceCard amount={3000} title={'Savings Card'} icon={<PiggyBank/>} details_1={"Chase"} overview={15} details_2={"XXXX491"}/>
              <BalanceCard amount={3000} title={'Savings Card'} icon={<PiggyBank/>} details_1={"Chase"} overview={-8} details_2={"XXXX491"}/>
              <BalanceCard amount={3000} title={'Savings Card'} icon={<PiggyBank/>} details_1={"Chase"} overview={12} details_2={"XXXX491"}/>
              <BalanceCard amount={3000} title={'Savings Card'} icon={<PiggyBank/>} details_1={"Chase"} overview={0} details_2={"XXXX491"}/>
            </TopBar>
          </header>
          <main className="flex-1">
            {/* Dynamic page content goes here */}
            <p>Dynamic content area</p>
          </main>
        </div>
      </div>
    );
  }

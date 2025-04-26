import React, { Suspense } from "react";
import Dashboard from "./page";
import ComponentLoader from "@/components/ComponentLoader";

export default function DashboardLayout() {
  return (
    <div>
      <Suspense
        fallback={
          <ComponentLoader text="Loading component..." showText={true} />
        }
      >
        <Dashboard />
      </Suspense>
    </div>
  );
}

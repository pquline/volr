"use client";

import * as React from "react";
import ReportADanger from "@/components/report-a-danger";
import ReportedDangers from "@/components/reported-dangers";
// import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="grid place-items-center">
      <div className="grid grid-cols-1 gap-6 max-w-xl w-full px-6 pb-4 sm:pt-6">
        <ReportADanger />
        <ReportedDangers />
        {/* <Toaster theme="dark" position="top-center" /> */}
      </div>
    </div>
  );
}

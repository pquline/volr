"use client";

import * as React from "react";
import ReportADanger from "@/components/report-a-danger";
import ReportedDangers from "@/components/reported-dangers";
// import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="container mx-auto justify-between items-center lg:items-start py-4 px-6 sm:px-16 md:px-32 grid grid-cols-1 lg:grid-cols-3 space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="lg:col-span-1">
        <ReportADanger />
      </div>
      <div className="lg:col-span-2">
        <ReportedDangers />
      </div>
      {/* <Toaster theme="dark" position="top-center" /> */}
    </div>
  );
}

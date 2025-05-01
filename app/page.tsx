"use client";

import * as React from "react";
import ReportADisruption from "@/components/report-a-disruption";
import ReportedDisruptions from "@/components/reported-disruptions";
// import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="grid place-items-center">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 max-w-xl w-full px-6 pb-4 sm:pt-2">
        <ReportADisruption />
        <ReportedDisruptions />
        {/* <Toaster theme="dark" position="top-center" /> */}
      </div>
    </div>
  );
}

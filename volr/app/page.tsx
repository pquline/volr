"use client";

import * as React from "react";
import ReportADanger from "@/components/report-a-danger";
import ReportedDangers from "@/components/reported-dangers";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="container mx-auto flex justify-between items-center sm:items-start py-4 px-4 sm:px-16 md:px-32 lg:px-56 xl:px-80 2xl:px-96 grid grid-cols-1 md:grid-cols-3 space-y-6 md:space-y-0 md:space-x-6">
      <div className="w-full md:col-span-1 space-y-4">
        <h2 className="px-4 text-base font-black truncate">Report A Danger</h2>
        <ReportADanger />
      </div>
      <div className="w-full md:col-span-2 space-y-4">
        <h2 className="px-4 text-base font-black truncate">Reported Dangers</h2>
        <ReportedDangers />
      </div>
      {/* <Toaster theme="dark" position="top-center" /> */}
    </div>
  );
}

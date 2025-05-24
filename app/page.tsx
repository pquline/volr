"use client";

import * as React from "react";
import ReportADisruption from "@/components/report-a-disruption";
import ReportedDisruptions from "@/components/reported-disruptions";

export default function Home() {
  const [lastUpdate, setLastUpdate] = React.useState<number>(Date.now());

  const handleDisruptionUpdate = () => {
    setLastUpdate(Date.now());
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pb-4 sm:pt-2 flex flex-col md:flex-row gap-8 sm:gap-6">
      <div className="w-full md:w-1/3">
        <ReportADisruption onDisruptionSubmitted={handleDisruptionUpdate} />
      </div>
      <div className="w-full md:w-2/3">
        <ReportedDisruptions lastUpdate={lastUpdate} />
      </div>
    </div>
  );
}

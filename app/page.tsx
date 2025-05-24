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
    <div className="max-w-5xl mx-auto px-8 pb-4 sm:pt-2 flex flex-col lg:flex-row gap-8 sm:gap-6">
      <div className="w-full lg:w-2/5">
        <ReportADisruption onDisruptionSubmitted={handleDisruptionUpdate} />
      </div>
      <div className="w-full lg:w-3/5">
        <ReportedDisruptions lastUpdate={lastUpdate} />
      </div>
    </div>
  );
}

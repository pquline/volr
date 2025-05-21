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
    <div className="grid place-items-center">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 max-w-xl w-full px-6 pb-4 sm:pt-2">
        <ReportADisruption onDisruptionSubmitted={handleDisruptionUpdate} />
        <ReportedDisruptions lastUpdate={lastUpdate} />
      </div>
    </div>
  );
}

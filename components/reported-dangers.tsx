"use client";

import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { EntryCard } from "./entry-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Entry {
  id: string;
  station: string;
  line: string;
  last_edit: string;
  comment: string | null;
  edits: number;
}

const mockEntries: Entry[] = [
  {
    id: "1",
    station: "Châtelet",
    line: "1",
    last_edit: "5m",
    comment: null,
    edits: 3,
  },
  {
    id: "2",
    station: "Gare de Lyon",
    line: "14",
    last_edit: "10m",
    comment: "Les controleurs sont la mdr",
    edits: 1,
  },
  {
    id: "3",
    station: "Bastille",
    line: "5",
    last_edit: "15m",
    comment: "Les controleurs sont la mdr",
    edits: 2,
  },
  {
    id: "4",
    station: "Nation",
    line: "6",
    last_edit: "20m",
    comment: null,
    edits: 4,
  },
  {
    id: "5",
    station: "République",
    line: "3",
    last_edit: "25m",
    comment: "Les controleurs sont la mdr",
    edits: 2,
  },
  {
    id: "6",
    station: "Opéra",
    line: "8",
    last_edit: "30m",
    comment: "Les controleurs sont la mdr",
    edits: 5,
  },
  {
    id: "7",
    station: "Montparnasse",
    line: "4",
    last_edit: "35m",
    comment: "Les controleurs sont la mdr",
    edits: 1,
  },
  {
    id: "8",
    station: "Saint-Lazare",
    line: "14",
    last_edit: "4m",
    comment:
      "Quai dir. Saint-Denis Pleyel",
    edits: 7,
  },
  {
    id: "9",
    station: "La Défense",
    line: "1",
    last_edit: "1h45m",
    comment: "sortie 2, mobiles",
    edits: 2,
  },
];

type SortField = "line" | "station" | "edits";
type SortDirection = "asc" | "desc";

export default function ReportedDangers() {
  const [entries, setEntries] = useState<Entry[]>(mockEntries);
  const [sortField, setSortField] = useState<SortField>("edits");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filteredEntries = mockEntries.filter(
      (entry) =>
        entry.line.toLowerCase().includes(filter.toLowerCase()) ||
        (entry.comment && entry.comment.toLowerCase().includes(filter.toLowerCase())) ||
        entry.station.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedEntries = [...filteredEntries].sort((a, b) => {
      if (sortField === "line" || sortField === "station") {
        return sortDirection === "asc"
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }
      return sortDirection === "asc" ? a.edits - b.edits : b.edits - a.edits;
    });

    setEntries(sortedEntries);
  }, [sortField, sortDirection, filter]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setIsOpen(false);
  };

  const getSortIcon = (field: SortField) => {
    if (field === sortField) {
      return sortDirection === "asc" ? (
        <ArrowUp className="h-4 w-4" />
      ) : (
        <ArrowDown className="h-4 w-4" />
      );
    }
    return <ArrowUpDown className="h-4 w-4 opacity-40" />;
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-black truncate lg:text-xl">
          Reported Dangers
        </h2>
        <div className="flex space-x-4 w-full sm:w-auto">
          <Input
            placeholder="Filter Dangers..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyDown={handleInputKeyDown}
            ref={inputRef}
            className="max-w-auto border-foreground/10 dark:border-foreground/20 hover:bg-foreground/5 dark:bg-background dark:hover:bg-foreground/5"
          />
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                aria-label="dropdown-sort-filter"
                aria-labelledby="dropdown-sort-filter"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-auto">
              <DropdownMenuItem onClick={() => handleSort("line")}>
                {getSortIcon("line")} Line
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("station")}>
                {getSortIcon("station")} Station
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("edits")}>
                {getSortIcon("edits")} Number of Updates
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="space-y-6">
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

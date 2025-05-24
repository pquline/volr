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
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { fetchDisruptions, Disruption } from "@/actions/fetchDisruptions";
import { useCity } from "./city-toggle";
import React from "react";

type SortField = "line" | "station" | "votes";
type SortDirection = "asc" | "desc";

const sanitizeText = (text: string) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

interface ReportedDisruptionsProps {
  lastUpdate?: number;
}

export default function ReportedDisruptions({
  lastUpdate,
}: ReportedDisruptionsProps) {
  const { city, isLoading: isCityLoading } = useCity();
  const [originalEntries, setOriginalEntries] = useState<Disruption[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Disruption[]>([]);
  const [sortField, setSortField] = useState<SortField>("votes");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const loadDisruptions = React.useCallback(
    async (isInitialLoad = false) => {
      if (!city) return;
      try {
        if (isInitialLoad) {
          setIsLoading(true);
        }
        const data = await fetchDisruptions(city);
        setOriginalEntries(data);
        setFilteredEntries(data);
      } finally {
        if (isInitialLoad) {
          setIsLoading(false);
        }
      }
    },
    [city]
  );

  const handleEntryUpdate = async (updatedEntry: Disruption) => {
    if (!city) return;
    try {
      setUpdatingIds((prev) => new Set([...prev, updatedEntry.id]));
      const data = await fetchDisruptions(city);
      setOriginalEntries(data);
      setFilteredEntries(data);
    } finally {
      setTimeout(() => {
        setUpdatingIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(updatedEntry.id);
          return newSet;
        });
      }, 100);
    }
  };

  const handleEntryDelete = async (deletedId: string) => {
    if (!city) return;
    try {
      setUpdatingIds((prev) => new Set([...prev, deletedId]));
      const data = await fetchDisruptions(city);
      setOriginalEntries(data);
      setFilteredEntries(data);
    } finally {
      setTimeout(() => {
        setUpdatingIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(deletedId);
          return newSet;
        });
      }, 100);
    }
  };

  useEffect(() => {
    if (!isCityLoading && city) {
      setIsLoading(true);
      setOriginalEntries([]);
      setFilteredEntries([]);
      loadDisruptions(true);
    }
  }, [city, isCityLoading, loadDisruptions]);

  useEffect(() => {
    if (lastUpdate) {
      loadDisruptions(false);
    }
  }, [lastUpdate, loadDisruptions]);

  useEffect(() => {
    const normalizedFilter = sanitizeText(filter);
    const filtered = originalEntries.filter(
      (entry) =>
        sanitizeText(entry.line).includes(normalizedFilter) ||
        sanitizeText(entry.station).includes(normalizedFilter)
    );

    const sorted = [...filtered].sort((a, b) => {
      const compareLines = (a: string, b: string) => {
        const numA = parseInt(a);
        const numB = parseInt(b);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        if (!isNaN(numA)) return sortDirection === "asc" ? -1 : 1;
        if (!isNaN(numB)) return sortDirection === "asc" ? 1 : -1;
        return a.localeCompare(b);
      };

      if (sortField === "votes") {
        const scoreCompare =
          sortDirection === "asc" ? a.votes - b.votes : b.votes - a.votes;
        if (scoreCompare !== 0) return scoreCompare;
        const stationCompare = sanitizeText(a.station).localeCompare(
          sanitizeText(b.station)
        );
        if (stationCompare !== 0) return stationCompare;
        return compareLines(getLineValue(a.line), getLineValue(b.line));
      } else if (sortField === "station") {
        const stationCompare =
          sortDirection === "asc"
            ? sanitizeText(a.station).localeCompare(sanitizeText(b.station))
            : sanitizeText(b.station).localeCompare(sanitizeText(a.station));
        if (stationCompare !== 0) return stationCompare;
        const scoreCompare = b.votes - a.votes;
        if (scoreCompare !== 0) return scoreCompare;
        return compareLines(getLineValue(a.line), getLineValue(b.line));
      } else {
        const lineCompare = compareLines(
          getLineValue(a.line),
          getLineValue(b.line)
        );
        if (lineCompare !== 0) return lineCompare;
        const scoreCompare = b.votes - a.votes;
        if (scoreCompare !== 0) return scoreCompare;
        return sanitizeText(a.station).localeCompare(sanitizeText(b.station));
      }
    });

    setFilteredEntries(sorted);
  }, [sortField, sortDirection, filter, originalEntries]);

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

  const getLineValue = (line: string) => {
    const match = line.match(/Line (.+)/);
    if (!match) return line;
    return match[1];
  };

  return (
    <div className="w-full flex flex-col gap-4 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-0">
        <h2 className="text-lg font-black truncate lg:text-xl">
          Reported Disruptions
        </h2>
        <div className="flex space-x-4 w-full sm:w-auto">
          <Input
            placeholder="Filter by line or station..."
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
              <DropdownMenuItem onClick={() => handleSort("votes")}>
                {getSortIcon("votes")} Accuracy Score
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="space-y-6">
        {isLoading ? (
          <>
            <div className="mb-6 rounded-lg border bg-white dark:bg-secondary border-foreground/10 dark:border-foreground/20 shadow">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold truncate">
                    Loading disruptions...
                  </h3>
                </div>
              </div>
            </div>
          </>
        ) : filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onRefresh={() => handleEntryUpdate(entry)}
              onDelete={() => handleEntryDelete(entry.id)}
              isLoading={updatingIds.has(entry.id)}
            />
          ))
        ) : (
          <div className="mb-6 rounded-lg border bg-white dark:bg-secondary border-foreground/10 dark:border-foreground/20 shadow">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold truncate">
                  No reported disruptions
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

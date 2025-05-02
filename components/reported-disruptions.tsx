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

type SortField = "line" | "station" | "edits";
type SortDirection = "asc" | "desc";

const normalizeText = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

export default function ReportedDisruptions() {
  const { city } = useCity();
  const [originalEntries, setOriginalEntries] = useState<Disruption[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Disruption[]>([]);
  const [sortField, setSortField] = useState<SortField>("edits");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadDisruptions = async () => {
    try {
      setIsLoading(true);
      const data = await fetchDisruptions(city || "paris");
      setOriginalEntries(data);
      setFilteredEntries(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEntryUpdate = async (updatedEntry: any) => {
    setOriginalEntries(prev =>
      prev.map(entry =>
        entry.id === updatedEntry.id
          ? {
              ...entry,
              edits: updatedEntry.edits,
              last_edit: new Date(updatedEntry.last_edit)
            }
          : entry
      )
    );
    setFilteredEntries(prev =>
      prev.map(entry =>
        entry.id === updatedEntry.id
          ? {
              ...entry,
              edits: updatedEntry.edits,
              last_edit: new Date(updatedEntry.last_edit)
            }
          : entry
      )
    );
  };

  const handleEntryDelete = async (deletedId: string) => {
    setOriginalEntries(prev => prev.filter(entry => entry.id !== deletedId));
    setFilteredEntries(prev => prev.filter(entry => entry.id !== deletedId));
  };

  useEffect(() => {
    loadDisruptions();
  }, [city]);

  useEffect(() => {
    const normalizedFilter = normalizeText(filter);
    const filtered = originalEntries.filter(
      (entry) =>
        normalizeText(entry.line).includes(normalizedFilter) ||
        normalizeText(entry.station).includes(normalizedFilter)
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortField === "line") {
        // Extract numeric parts from line strings
        const numA = parseInt(a.line.match(/\d+/)?.[0] || "0");
        const numB = parseInt(b.line.match(/\d+/)?.[0] || "0");
        return sortDirection === "asc" ? numA - numB : numB - numA;
      } else if (sortField === "station") {
        return sortDirection === "asc"
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }
      return sortDirection === "asc" ? a.edits - b.edits : b.edits - a.edits;
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

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
              <DropdownMenuItem onClick={() => handleSort("edits")}>
                {getSortIcon("edits")} Number of Updates
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
                  <h3 className="text-base font-semibold truncate">Loading disruptions...</h3>
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
            />
          ))
        ) : (
          <div className="mb-6 rounded-lg border bg-white dark:bg-secondary border-foreground/10 dark:border-foreground/20 shadow">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold truncate">No reported disruptions</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

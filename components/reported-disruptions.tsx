"use client";

import { Disruption, fetchDisruptions } from "@/actions/fetchDisruptions";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useCity } from "./city-toggle";
import { EntryCard } from "./entry-card";

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
  const t = useTranslations();
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
    <div className="w-full space-y-4">
      <div className="h-[40px] flex items-center">
        <h2 className="text-lg font-black truncate lg:text-xl">
          {t('disruptions.title')}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder={t('disruptions.search.placeholder')}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="w-full"
          />
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                {t('disruptions.sort.title')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSort("line")}>
                <div className="flex items-center gap-2">
                  {getSortIcon("line")}
                  {t('disruptions.sort.byLine')}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("station")}>
                <div className="flex items-center gap-2">
                  {getSortIcon("station")}
                  {t('disruptions.sort.byStation')}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("votes")}>
                <div className="flex items-center gap-2">
                  {getSortIcon("votes")}
                  {t('disruptions.sort.byVotes')}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-2">
          {isLoading ? (
            <div className="text-center py-4">{t('common.loading')}</div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-4">
              {filter
                ? t('disruptions.noResults')
                : t('disruptions.noDisruptions')}
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onUpdate={handleEntryUpdate}
                onDelete={handleEntryDelete}
                isUpdating={updatingIds.has(entry.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

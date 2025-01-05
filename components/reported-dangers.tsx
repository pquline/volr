"use client"

import { useState, useEffect } from "react"
import { EntryCard } from "./entry-card"

interface Entry {
  id: string
  state: "danger" | "warning"
  station: string
  line: string
  last_edit: string
  edits: number
}

const mockEntries: Entry[] = [
  {
    id: "1",
    state: "danger",
    station: "Châtelet",
    line: "1",
    last_edit: "5 minutes",
    edits: 3
  },
  {
    id: "2",
    state: "warning",
    station: "Gare de Lyon",
    line: "14",
    last_edit: "10 minutes",
    edits: 1
  },
  {
    id: "3",
    state: "danger",
    station: "Bastille",
    line: "5",
    last_edit: "15 minutes",
    edits: 2
  },
  {
    id: "4",
    state: "danger",
    station: "Nation",
    line: "6",
    last_edit: "20 minutes",
    edits: 4
  },
  {
    id: "5",
    state: "warning",
    station: "République",
    line: "3",
    last_edit: "25 minutes",
    edits: 2
  },
  {
    id: "6",
    state: "danger",
    station: "Opéra",
    line: "8",
    last_edit: "30 minutes",
    edits: 5
  },
  {
    id: "7",
    state: "warning",
    station: "Montparnasse",
    line: "4",
    last_edit: "35 minutes",
    edits: 1
  },
  {
    id: "8",
    state: "danger",
    station: "Saint-Lazare",
    line: "13",
    last_edit: "40 minutes",
    edits: 3
  },
  {
    id: "9",
    state: "warning",
    station: "La Défense",
    line: "1",
    last_edit: "45 minutes",
    edits: 2
  }
]

export default function ReportedDangers() {
  const [entries, setEntries] = useState<Entry[]>(mockEntries)
  const [sortBy, setSortBy] = useState<"line" | "station" | "last_edit">("last_edit")
  const [isAscending, setIsAscending] = useState(true)

  useEffect(() => {
    const sortedEntries = [...entries].sort((a, b) => {
      if (sortBy === "line" || sortBy === "station") {
        return isAscending
          ? b[sortBy].localeCompare(a[sortBy])
          : a[sortBy].localeCompare(b[sortBy])
      } else {
        const dateA = new Date(a.last_edit).getTime()
        const dateB = new Date(b.last_edit).getTime()
        return isAscending ? dateA - dateB : dateB - dateA
      }
    })
    setEntries(sortedEntries)
  }, [sortBy, isAscending])

  return (
    <div>
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
    </div>
    );
};
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, Text, Trash, Clock } from 'lucide-react'
import Image from "next/image"

interface EntryCardProps {
  entry: {
    id: string
    state: "danger" | "warning"
    station: string
    line: string
    last_edit: string
    edits: number
  }
}

export function EntryCard({ entry }: EntryCardProps) {
  return (
    <Card className="mb-6 border-muted">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold truncate">{entry.station}</h3>
          <Badge variant="secondary">{entry.edits}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-4">
              <Image width={15} height={15} src={`/public/${entry.line}.png`} alt={entry.line} />
              <span>Ligne {entry.line}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Clock className="h-4 w-4" />
              <span>{entry.last_edit} ago</span>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="sm">Update</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Check className="mr-2 h-4 w-4 text-valid" />
                  <span>Confirmer</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Text className="mr-2 h-4 w-4 text-tertiary" />
                  <span>Modifier</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash className="mr-2 h-4 w-4 text-destructive" />
                  <span>Supprimer</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
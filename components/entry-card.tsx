import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, Trash, Clock, Text } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// import Image from "next/image"

interface EntryCardProps {
  entry: {
    id: string
    station: string
    line: string
    last_edit: string
    comment: string | null
    edits: number
  }
}

export function EntryCard({ entry }: EntryCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><h3 className="text-base font-semibold truncate">{entry.station}</h3></TooltipTrigger>
              <TooltipContent><p>Station</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><Badge variant="default">{entry.edits}</Badge></TooltipTrigger>
              <TooltipContent><p>Number of Updates</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex justify-between flex-grow">
            <div className="space-y-2 text-sm flex-grow overflow-hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center space-x-4">
                    {/* <Image width={15} height={15} src={`/public/${entry.line}.png`} alt={entry.line} /> */}
                    <Check className="h-4 w-4 text-valid flex-shrink-0" />
                    <span className="truncate">Line {entry.line}</span>
                  </TooltipTrigger>
                  <TooltipContent><p>Line</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center space-x-4">
                    {/* <Image width={15} height={15} src={`/public/${entry.line}.png`} alt={entry.line} /> */}
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{entry.last_edit} ago</span>
                  </TooltipTrigger>
                  <TooltipContent><p>Last Update</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {entry.comment ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center space-x-4">
                      {/* <Image width={15} height={15} src={`/public/${entry.line}.png`} alt={entry.line} /> */}
                      <Text className="h-4 w-4 flex-shrink-0" />
                      <div className="flex px-2 py-1 rounded-sm border border-foreground/10 bg-background/50">
                        <p className="text-foreground/80 line-clamp-3 text-left font-mono text-xs">{entry.comment}</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent><p>Last Comment</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
            </div>
            <div className="flex flex-col justify-end ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="tertiary">Update</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Check className="mr-2 h-4 w-4 text-valid" />
                    <span>Confirm</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4 text-destructive" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

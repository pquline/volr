import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Trash, Clock, Text } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { SkeletonCard } from "./skeleton-card"

interface EntryCardProps {
  entry: {
    id: string
    station: string
    line: string
    last_edit: string
    comment: string | null
    edits: number
  }
  isLoading?: boolean
}

export function EntryCard({ entry, isLoading = false }: EntryCardProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleConfirm = () => {
    console.log("[DEBUG]: Confirm on", entry.station, "(Line", entry.line + ") #" + entry.id)
  }

  const handleDelete = () => {
    console.log("[DEBUG]: Delete on", entry.station, "(Line", entry.line + ") #" + entry.id)
  }

  if (isLoading) {
    return <SkeletonCard />
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <h3 className="text-base font-semibold truncate">
                    {entry.station}
                  </h3>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Station</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="default">{entry.edits}</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of Updates</p>
                </TooltipContent>
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
                      <Check className="h-4 w-4 text-valid flex-shrink-0" />
                      <span className="truncate">Line {entry.line}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Line</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center space-x-4">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{entry.last_edit} ago</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Last Update</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {entry.comment ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center space-x-4">
                        <Text className="h-4 w-4 flex-shrink-0" />
                        <div className="flex px-2 py-1 rounded-sm border border-foreground/10 bg-background/50">
                          <p className="text-foreground/80 line-clamp-3 text-left font-mono text-xs">
                            {entry.comment}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Comment</p>
                      </TooltipContent>
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
                    <DropdownMenuItem
                      onClick={() => setShowConfirmDialog(true)}
                    >
                      <Check className="mr-2 h-4 w-4 text-valid" />
                      <span>Confirm</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
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

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="w-[calc(100%-2rem)] max-w-sm mx-auto p-4 rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold mb-2">
              Confirm Entry
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm mb-4">
              Are you sure you want to confirm{" "}
              <span className="font-bold">
                {entry.station} (Line {entry.line})
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-end sm:space-x-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-valid hover:bg-valid/90"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="w-[calc(100%-2rem)] max-w-sm mx-auto p-4 rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold mb-2">
              Delete Entry
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm mb-4">
              Are you sure you want to delete{" "}
              <span className="font-bold">
                {entry.station} (Line {entry.line})
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-end sm:space-x-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

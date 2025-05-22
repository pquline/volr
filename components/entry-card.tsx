import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Clock, Text, ArrowUp, ArrowDown } from 'lucide-react'
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
import { useState, useEffect } from "react"
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { updateDisruption } from "@/actions/updateDisruption";
import { deleteDisruption } from "@/actions/deleteDisruption";
import { toast } from "sonner";
import { logger } from '@/lib/logger';
import { voteDisruption } from "@/actions/voteDisruption";

interface EntryCardProps {
  entry: {
    id: string
    station: string
    line: string
    last_edit: Date
    comment: string | null
    edits: number
    votes: number
  }
  isLoading?: boolean
  onRefresh?: () => void
  onDelete?: () => void
}

export function EntryCard({ entry, isLoading = false, onRefresh, onDelete }: EntryCardProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const lastEditDate = entry.last_edit instanceof Date ? entry.last_edit : new Date(entry.last_edit)

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true)
      const result = await updateDisruption(entry.id, entry.edits)
      if (result.success) {
        onRefresh?.()
        setShowConfirmDialog(false)
        toast.success("Disruption updated successfully!")
      } else {
        toast.error(result.error || "Failed to update disruption")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      logger.error('Error updating disruption:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsSubmitting(true)
      const result = await deleteDisruption(entry.id)
      if (result.success) {
        onDelete?.()
        setShowDeleteDialog(false)
        toast.success("Disruption deleted successfully!")
      } else {
        toast.error(result.error || "Failed to delete disruption")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      logger.error('Error deleting disruption:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDialogClose = () => {
    if (!isSubmitting) {
      setShowConfirmDialog(false)
      setShowDeleteDialog(false)
    }
  }

  const handleVote = async (voteType: 'up' | 'down') => {
    try {
      setIsSubmitting(true)

      // Check if this device has already voted on this entry
      const votedEntries = JSON.parse(localStorage.getItem('votedEntries') || '{}')
      const previousVote = votedEntries[entry.id]

      // If there's a previous vote and it's the same as the new vote, remove the vote
      if (previousVote === voteType) {
        const result = await voteDisruption(entry.id, 'remove', previousVote)
        if (result.success) {
          // Remove the vote from localStorage
          delete votedEntries[entry.id]
          localStorage.setItem('votedEntries', JSON.stringify(votedEntries))

          onRefresh?.()
          toast.success('Vote removed successfully!')
        } else {
          toast.error(result.error || "Failed to remove vote")
        }
        return
      }

      const result = await voteDisruption(entry.id, voteType, previousVote)
      if (result.success) {
        // Store the vote in localStorage
        votedEntries[entry.id] = voteType
        localStorage.setItem('votedEntries', JSON.stringify(votedEntries))

        onRefresh?.()
        toast.success(`${voteType === 'up' ? 'Upvoted' : 'Downvoted'} successfully!`)
      } else {
        toast.error(result.error || "Failed to update accuracy")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      logger.error('Error voting:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Check if this device has already voted on this entry
  const votedEntries = JSON.parse(localStorage.getItem('votedEntries') || '{}')
  const previousVote = votedEntries[entry.id]

  useEffect(() => {
    if (!isLoading) {
      setIsSubmitting(false)
    }
  }, [isLoading])

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
                  <Badge variant="default">{entry.votes}</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Accuracy Score</p>
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
                      <ArrowUp className="h-4 w-4 text-valid flex-shrink-0" />
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
                      <span className="truncate">
                        {formatDistanceToNow(lastEditDate, {
                          locale: enUS
                        })} ago
                      </span>
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
              <div className="flex flex-col justify-end ml-4 space-y-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="tertiary" disabled={isSubmitting || isLoading}>Update</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleVote('up')}
                      disabled={isSubmitting || isLoading}
                    >
                      <ArrowUp className="h-4 w-4 mr-2 text-valid" />
                      {previousVote === 'up' ? 'Remove upvote' : 'Upvote'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleVote('down')}
                      disabled={isSubmitting || isLoading}
                    >
                      <ArrowDown className="h-4 w-4 mr-2 text-destructive" />
                      {previousVote === 'down' ? 'Remove downvote' : 'Downvote'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showConfirmDialog && (
        <AlertDialog
          open={showConfirmDialog}
          onOpenChange={(open) => {
            if (!open) handleDialogClose()
          }}
        >
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
              <AlertDialogCancel disabled={isSubmitting || isLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirm}
                className="bg-valid hover:bg-valid/90"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? "Updating..." : "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {showDeleteDialog && (
        <AlertDialog
          open={showDeleteDialog}
          onOpenChange={(open) => {
            if (!open) handleDialogClose()
          }}
        >
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
              <AlertDialogCancel disabled={isSubmitting || isLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive hover:bg-destructive/90"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}

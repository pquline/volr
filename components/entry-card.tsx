import { deleteDisruption } from "@/actions/deleteDisruption"
import { updateDisruption } from "@/actions/updateDisruption"
import { voteDisruption } from "@/actions/voteDisruption"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { logger } from '@/lib/logger'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ArrowDown, ArrowUp, Clock, Text, Train } from 'lucide-react'
import { useTranslations, useLocale } from "next-intl"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface EntryCardProps {
  entry: {
    id: string
    station: string
    line: string
    last_edit: Date
    comment: string | null
    votes: number
  }
  isLoading?: boolean
  onRefresh?: () => void
  onDelete?: (id: string) => void
  onUpdate?: (updatedEntry: EntryCardProps['entry']) => Promise<void>
}

export function EntryCard({ entry, isLoading = false, onRefresh, onDelete, onUpdate }: EntryCardProps) {
  const t = useTranslations("disruptions");
  const locale = useLocale();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const lastEditDate = entry.last_edit instanceof Date ? entry.last_edit : new Date(entry.last_edit)

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true)
      const result = await updateDisruption(entry.id, 0)
      if (result.success) {
        onRefresh?.()
        onUpdate?.(entry)
        setShowConfirmDialog(false)
        toast.success(t("update.success"))
      } else {
        toast.error(result.error || t("update.error"))
      }
    } catch (error) {
      toast.error(t("common.error"))
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
        onDelete?.(entry.id)
        setShowDeleteDialog(false)
        toast.success(t("delete.success"))
      } else {
        toast.error(result.error || t("delete.error"))
      }
    } catch (error) {
      toast.error(t("common.error"))
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

      const votedEntries = JSON.parse(localStorage.getItem('votedEntries') || '{}')
      const previousVote = votedEntries[entry.id]

      if (previousVote === voteType) {
        const result = await voteDisruption(entry.id, 'remove', previousVote)
        if (result.success) {
          delete votedEntries[entry.id]
          localStorage.setItem('votedEntries', JSON.stringify(votedEntries))

          onRefresh?.()
          toast.success(t("vote.removeSuccess"))
        } else {
          toast.error(result.error || t("vote.removeError"))
        }
        return
      }

      const result = await voteDisruption(entry.id, voteType, previousVote)
      if (result.success) {
        votedEntries[entry.id] = voteType
        localStorage.setItem('votedEntries', JSON.stringify(votedEntries))

        onRefresh?.()
        toast.success(voteType === 'up' ? t("vote.upSuccess") : t("vote.downSuccess"))
      } else {
        toast.error(result.error || t("vote.error"))
      }
    } catch (error) {
      toast.error(t("common.error"))
      logger.error('Error voting:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  <p>{t("card.station")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="default">{entry.votes}</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("card.accuracyScore")}</p>
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
                      <Train className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{t("card.line", { line: entry.line })}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("card.line")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center space-x-4">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {formatDistanceToNow(lastEditDate, {
                          locale: locale === 'fr' ? fr : undefined,
                          addSuffix: true
                        })}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("card.lastUpdated")}</p>
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
                        <p>{t("card.comment")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
              </div>
              <div className="flex flex-col justify-end ml-4 space-y-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="tertiary" disabled={isSubmitting || isLoading}>{t("card.actions")}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleVote('up')}
                      disabled={isSubmitting || isLoading}
                    >
                      <ArrowUp className="h-4 w-4 mr-2 text-valid" />
                      {previousVote === 'up' ? t("vote.removeUpvote") : t("vote.upvote")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleVote('down')}
                      disabled={isSubmitting || isLoading}
                    >
                      <ArrowDown className="h-4 w-4 mr-2 text-destructive" />
                      {previousVote === 'down' ? t("vote.removeDownvote") : t("vote.downvote")}
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
                {t("confirm.title")}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm mb-4">
                {t("confirm.description")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-end sm:space-x-2">
              <AlertDialogCancel disabled={isSubmitting || isLoading}>{t("common.cancel")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirm}
                className="bg-valid hover:bg-valid/90"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? t("common.loading") : t("card.confirm")}
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
                {t("delete.title")}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm mb-4">
                {t("delete.description")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-end sm:space-x-2">
              <AlertDialogCancel disabled={isSubmitting || isLoading}>{t("common.cancel")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive hover:bg-destructive/90"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? t("common.loading") : t("card.delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}

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
import { enUS } from 'date-fns/locale'
import { ArrowDown, ArrowUp, Clock, Text, Train } from 'lucide-react'
import { useTranslations } from "next-intl"
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
  isUpdating?: boolean
}

export function EntryCard({ entry, isLoading = false, onRefresh, onDelete, onUpdate, isUpdating = false }: EntryCardProps) {
  const t = useTranslations();
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
        toast.success(t('disruptions.update.success'))
      } else {
        toast.error(result.error || t('disruptions.update.error'))
      }
    } catch (error) {
      toast.error(t('common.error'))
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
        toast.success(t('disruptions.delete.success'))
      } else {
        toast.error(result.error || t('disruptions.delete.error'))
      }
    } catch (error) {
      toast.error(t('common.error'))
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
          toast.success(t('disruptions.vote.removeSuccess'))
        } else {
          toast.error(result.error || t('disruptions.vote.removeError'))
        }
        return
      }

      const result = await voteDisruption(entry.id, voteType, previousVote)
      if (result.success) {
        // Store the vote in localStorage
        votedEntries[entry.id] = voteType
        localStorage.setItem('votedEntries', JSON.stringify(votedEntries))

        onRefresh?.()
        toast.success(voteType === 'up' ? t('disruptions.vote.upSuccess') : t('disruptions.vote.downSuccess'))
      } else {
        toast.error(result.error || t('disruptions.vote.error'))
      }
    } catch (error) {
      toast.error(t('common.error'))
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
                  <p>{t('disruptions.card.station')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="default">{entry.votes}</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('disruptions.card.accuracyScore')}</p>
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
                      <span className="truncate">{t('disruptions.card.line', { line: entry.line })}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('disruptions.card.line')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center space-x-4">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {formatDistanceToNow(lastEditDate, { addSuffix: true, locale: enUS })}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('disruptions.card.lastUpdated')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {entry.comment && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center space-x-4">
                        <Text className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{entry.comment}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('disruptions.card.comment')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="flex flex-col items-end justify-between ml-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleVote('up')}
                    disabled={isSubmitting || isUpdating}
                    className={previousVote === 'up' ? 'text-green-500' : ''}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleVote('down')}
                    disabled={isSubmitting || isUpdating}
                    className={previousVote === 'down' ? 'text-red-500' : ''}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={isUpdating}>
                      <span className="sr-only">{t('disruptions.card.actions')}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowConfirmDialog(true)}>
                      {t('disruptions.card.confirm')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                      {t('disruptions.card.delete')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showConfirmDialog} onOpenChange={handleDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('disruptions.confirm.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('disruptions.confirm.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              {t('common.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isSubmitting}>
              {isSubmitting ? t('common.loading') : t('common.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={handleDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('disruptions.delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('disruptions.delete.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              {t('common.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isSubmitting}>
              {isSubmitting ? t('common.loading') : t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

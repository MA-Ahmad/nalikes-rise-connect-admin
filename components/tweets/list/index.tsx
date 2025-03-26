'use client'

import * as React from 'react'
import { useEffect, useState, useTransition } from 'react'
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createColumns } from './columns'
import { showToast } from '@/utils/toast'
import { AxiosError } from 'axios'
import { DeleteConfirmationDialog } from '@/components/shared/delete-confirmation-dialog'
import { Tweet, Meta } from '@/types/tweets'
import { fetchTweets, removeTweet } from '@/actions/tweets'
import TweetDialog from '../tweet-dialog'

export function Tweets() {
  const [data, setData] = useState<Tweet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [meta, setMeta] = useState<Meta>({
    totalTweets: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleDeleteTweet = (tweet: Tweet) => {
    setSelectedTweet(tweet)
  }

  const handleConfirmDelete = async () => {
    if (!selectedTweet) return

    startTransition(async () => {
      try {
        const response = await removeTweet(selectedTweet.id)

        if (response.error) {
          showToast.error(response.error)
        } else {
          showToast.success('Tweet removed successfully')
          loadTweets()
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          showToast.error(
            error.response?.data?.message || 'Failed to remove app'
          )
        } else {
          showToast.error('Failed to remove app')
        }
      } finally {
        setSelectedTweet(null)
      }
    })
  }

  const loadTweets = async () => {
    try {
      setIsLoading(true)
      const result = await fetchTweets(meta.currentPage, meta.pageSize)

      if (result.tweets) {
        setData(result.tweets)
        console.log('result', result)

        setMeta(
          result.meta
            ? result.meta
            : {
                totalTweets: 0,
                currentPage: 1,
                pageSize: 10,
                totalPages: 1,
              }
        )
      }
    } catch (error) {
      console.error('Error loading apps:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadTweets()
  }, [meta.currentPage, meta.pageSize])

  //   const columnsWithHandlers = createColumns()
  const columnsWithHandlers = createColumns(handleDeleteTweet)

  const table = useReactTable({
    data,
    columns: columnsWithHandlers,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="relative h-full p-3 sm:p-6">
      <Card className="pt-6">
        <CardContent>
          {/* <div className="mb-4 flex items-center justify-end gap-4">
            <Button asChild>
              <Link href="/tweets/new">New Tweet</Link>
            </Button>
          </div> */}
          <div className="mb-4 flex items-center justify-end gap-4">
            <TweetDialog refetchTweets={loadTweets} />
          </div>

          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="whitespace-nowrap first:pl-3 [&:has([role=checkbox])]:pl-3"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    index={index}
                    data-state={row.getIsSelected() && 'selected'}
                    animate
                    className="whitespace-nowrap"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="first:pl-3 [&:has([role=checkbox])]:pl-3"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : isLoading ? (
                Array.from({ length: 10 }, (_, i) => i + 1).map((rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Array.from({ length: 4 }, (_, i) => i + 1).map(
                      (cellIndex) => (
                        <TableCell key={`${rowIndex}-${cellIndex}`}>
                          <Skeleton className="h-4" />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columnsWithHandlers.length}
                    className="h-24 text-center"
                  >
                    No results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex flex-col-reverse items-center justify-end space-x-2 pt-4 sm:flex-row">
            <div className="text-muted-foreground flex-1 text-sm">
              Total: {meta.totalTweets} &nbsp; Page: {meta.currentPage} of{' '}
              {meta.totalPages}
            </div>
            <div className="mb-3 space-x-2 sm:mb-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setMeta((prev) => ({
                    ...prev,
                    currentPage: Math.max(prev.currentPage - 1, 1),
                  }))
                }
                disabled={meta.currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setMeta((prev) => ({
                    ...prev,
                    currentPage: Math.min(
                      prev.currentPage + 1,
                      prev.totalPages
                    ),
                  }))
                }
                disabled={meta.currentPage === meta.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog
        open={!!selectedTweet}
        onOpenChange={() => setSelectedTweet(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isPending}
        description="This action cannot be undone. This will permanently delete the tweet."
      />
    </div>
  )
}

'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
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
import { App, Meta } from '@/types/apps'
// import { showToast } from '@/utils/toast'
import { fetchApps } from '@/actions/apps'
// import { AxiosError } from 'axios'
export function Apps() {
  const [data, setData] = useState<App[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [meta, setMeta] = useState<Meta>({
    totalApps: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  //   const [selectedApp, setSelectedApp] = useState<App | null>(null)
  //   const [isPending, startTransition] = useTransition()

  //   const handleDeleteApp = (app: App) => {
  //     setSelectedApp(app)
  //   }

  //   const handleConfirmDelete = async () => {
  //     if (!selectedApp) return

  //     startTransition(async () => {
  //       try {
  //         const response = await removeApp(selectedApp.id)

  //         if (response.error) {
  //           showToast.error(response.error)
  //         } else {
  //           showToast.success('App removed successfully')
  //           // Refresh the data
  //           loadApps()
  //         }
  //       } catch (error) {
  //         if (error instanceof AxiosError) {
  //           showToast.error(
  //             error.response?.data?.message || 'Failed to remove app'
  //           )
  //         } else {
  //           showToast.error('Failed to remove app')
  //         }
  //       } finally {
  //         setSelectedApp(null)
  //       }
  //     })
  //   }

  const loadApps = async () => {
    try {
      setIsLoading(true)
      const result = await fetchApps(meta.currentPage, meta.pageSize)

      console.log(result)
      if (result.success && result.apps) {
        setData(result.apps)
        setMeta(
          result.meta
            ? result.meta
            : {
                totalApps: 0,
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
    loadApps()
  }, [meta.currentPage, meta.pageSize])

  const columnsWithHandlers = createColumns()
  //   const columnsWithHandlers = createColumns(handleDeleteApp)

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
          <div className="mb-4 flex items-center justify-end gap-4">
            {/* <Input
              placeholder="Filter apps by name..."
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
              className="max-w-sm md:w-80"
            /> */}
            <Button asChild>
              <Link href="/apps/new">New App</Link>
            </Button>
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
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
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
              Total: {meta.totalApps} &nbsp; Page: {meta.currentPage} of{' '}
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
    </div>
  )
}

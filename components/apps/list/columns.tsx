'use client'

import * as React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { App } from '@/types/apps'

export const createColumns = (
  onDeleteApp: (app: App) => void
): ColumnDef<App>[] => {
  return [
    // {
    //   accessorKey: 'rank',
    //   header: 'Rank',
    //   cell: ({ row }) => (
    //     <div className="text-center">{row.getValue('rank')}</div>
    //   ),
    // },
    {
      accessorKey: 'index', // Changed from 'rank' to 'index'
      header: 'Rank',
      cell: ({ row }) => (
        <div className="text-center">{row.index + 1}</div> // Displaying the index (1-based)
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => <div>{row.getValue('category')}</div>,
    },
    {
      accessorKey: 'tvl',
      header: 'TVL',
      cell: ({ row }) => (
        <div>${(row.getValue('tvl') as number).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: 'change1D',
      header: '1D Change',
      cell: ({ row }) => <div>{row.getValue('change1D')}%</div>,
    },
    {
      accessorKey: 'change7D',
      header: '7D Change',
      cell: ({ row }) => <div>{row.getValue('change7D')}%</div>,
    },
    {
      accessorKey: 'change1M',
      header: '1M Change',
      cell: ({ row }) => <div>{row.getValue('change1M')}%</div>,
    },
    {
      accessorKey: 'mcapTvl',
      header: 'MCAP/TVL',
      cell: ({ row }) => <div>{row.getValue('mcapTvl')}</div>,
    },
    {
      accessorKey: 'revenue1D',
      header: '1D Revenue',
      cell: ({ row }) => (
        <div>${(row.getValue('revenue1D') as number).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: 'revenue7D',
      header: '7D Revenue',
      cell: ({ row }) => (
        <div>${(row.getValue('revenue7D') as number).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: 'revenue1M',
      header: '1M Revenue',
      cell: ({ row }) => (
        <div>${(row.getValue('revenue1M') as number).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const createdAt = row.getValue('createdAt')
        return (
          <div className="font-medium">
            {new Date(createdAt as string).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const app = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem asChild>
                <a href={`/apps/${app.id}`}>View App</a>
              </DropdownMenuItem> */}
              <DropdownMenuItem asChild>
                <a href={`/apps/edit/${app.id}`}>Edit App</a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteApp(app)}>
                Delete App
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

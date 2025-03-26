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
import { Tweet } from '@/types/tweets'
import { Badge } from '@/components/ui/badge'
export const createColumns = (
  onDeleteTweet: (tweet: Tweet) => void
): ColumnDef<Tweet>[] => {
  return [
    // {
    //   accessorKey: 'index',
    //   header: '',
    //   cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    // },
    {
      accessorKey: 'tweetId',
      header: 'Tweet ID',
      cell: ({ row }) => (
        <div className="text-left">{row.getValue('tweetId')}</div>
      ),
    },
    {
      accessorKey: 'isRiseAccount',
      header: 'Rise Tweet?',
      cell: ({ row }) => (
        <div className="text-left">
          {row.getValue('isRiseAccount') ? (
            <Badge>Rise</Badge>
          ) : (
            <Badge>Not Rise</Badge>
          )}
        </div>
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
        const tweet = row.original

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
                <a href={`/tweets/edit/${tweet.id}`}>Edit Tweet</a>
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => onDeleteTweet(tweet)}>
                Delete Tweet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

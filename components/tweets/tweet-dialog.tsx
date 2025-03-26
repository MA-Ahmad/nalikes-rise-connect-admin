'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { showToast } from '@/utils/toast'
import { AxiosError } from 'axios'
import { createTweet } from '@/actions/tweets'
import { Plus } from 'lucide-react'
import { Loader2 } from 'lucide-react'

// Define the form schema with zod
const tweetFormSchema = z.object({
  tweetId: z.string().refine((val) => /^\d+$/.test(val), {
    message: 'Tweet ID must contain only numbers',
  }),
})

// Infer the type from the schema
type TweetFormValues = z.infer<typeof tweetFormSchema>

export default function TweetDialog({
  refetchTweets,
}: {
  refetchTweets: () => void
}) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form
  const form = useForm<TweetFormValues>({
    resolver: zodResolver(tweetFormSchema),
    defaultValues: {
      tweetId: '',
    },
  })

  // Handle form submission
  const onSubmit = async (data: TweetFormValues) => {
    setIsSubmitting(true)
    try {
      const response = await createTweet({
        tweetId: data.tweetId,
        isRiseAccount: true,
      })
      if (response.error) {
        showToast.error(response.error)
      } else {
        showToast.success('Tweet added successfully.')
        form.reset()
        setOpen(false)
        refetchTweets()
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showToast.error(
          error.response?.data?.message ||
            'An unexpected error occurred. Please try again.'
        )
      } else {
        showToast.error('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Tweet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tweet</DialogTitle>
          <DialogDescription>Enter Rise tweet ID</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tweetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tweet ID</FormLabel>
                  <FormControl>
                    <Input placeholder="123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? 'Adding...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

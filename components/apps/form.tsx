'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { appSchema } from '@/utils/schema'
import { showToast } from '@/utils/toast'
import { AxiosError } from 'axios'
interface AppFormProps {
  initialData?: z.infer<typeof appSchema>
  onSubmit: (values: z.infer<typeof appSchema>) => Promise<{
    error?: string
  }>
  submitButtonText?: string
}

export function AppForm({
  initialData,
  onSubmit,
  submitButtonText = 'Save',
}: AppFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const router = useRouter()

  const defaultValues = {
    ...initialData,
  }

  const form = useForm<z.infer<typeof appSchema>>({
    resolver: zodResolver(appSchema),
    defaultValues,
  })

  async function handleSubmit(values: z.infer<typeof appSchema>) {
    setIsSubmitting(true)
    try {
      const response = await onSubmit(values)
      if (response.error) {
        showToast.error(response.error)
      } else {
        showToast.success('App saved successfully.')
        if (!initialData) {
          form.reset(defaultValues)
        }
        router.push('/apps')
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
    <Card className="pt-6">
      <CardContent>
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="mx-auto w-full max-w-[60rem]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value?.toString() ?? ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tvl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TVL</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="any"
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? parseFloat(e.target.value)
                                    : null
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mcapTvl"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>MCAP/TVL</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="any"
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? parseFloat(e.target.value)
                                    : null
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-row gap-4">
                      <FormField
                        control={form.control}
                        name="change1D"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>1D Change</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ''}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? parseFloat(e.target.value)
                                      : null
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="change7D"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>7D Change</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ''}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? parseFloat(e.target.value)
                                      : null
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="change1M"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>1M Change</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ''}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? parseFloat(e.target.value)
                                      : null
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-row gap-4">
                      <FormField
                        control={form.control}
                        name="revenue1D"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Revenue (1D)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ''}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? parseFloat(e.target.value)
                                      : null
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="revenue7D"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Revenue (7D)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ''}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? parseFloat(e.target.value)
                                      : null
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="revenue1M"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Revenue (1M)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ''}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? parseFloat(e.target.value)
                                      : null
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {submitButtonText}
                </Button>
              </form>
            </Form>
          </div>
        </motion.main>
      </CardContent>
    </Card>
  )
}

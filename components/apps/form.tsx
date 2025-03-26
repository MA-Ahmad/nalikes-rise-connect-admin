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
import { AppCategory, appSchema } from '@/utils/schema'
import { showToast } from '@/utils/toast'
import { AxiosError } from 'axios'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import Image from 'next/image'
import { Pencil, Plus } from 'lucide-react'
import { Loader2 } from 'lucide-react'

interface AppFormProps {
  initialData?: z.infer<typeof appSchema>
  onSubmit: (values: FormData) => Promise<{
    error?: string
  }>
  submitButtonText?: string
  edit?: boolean
}

export function AppForm({
  initialData,
  onSubmit,
  submitButtonText = 'Save',
  edit = false,
}: AppFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [logoPreview, setLogoPreview] = React.useState<string | null>(
    initialData?.logo instanceof File ? null : initialData?.logo || null
  )
  const [bannerPreview, setBannerPreview] = React.useState<string | null>(
    initialData?.banner instanceof File ? null : initialData?.banner || null
  )
  const router = useRouter()

  const defaultValues = {
    ...initialData,
  }

  const form = useForm<z.infer<typeof appSchema>>({
    resolver: zodResolver(appSchema),
    defaultValues,
  })

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('logo', file)
      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('banner', file)
      const reader = new FileReader()
      reader.onload = () => {
        setBannerPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(values: z.infer<typeof appSchema>) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()

      // Append all text fields
      Object.entries(values).forEach(([key, value]) => {
        if (key !== 'logo' && key !== 'banner' && value !== undefined) {
          formData.append(key, String(value))
        }
      })

      // Append file fields if they exist
      if (values.logo instanceof File) {
        formData.append('logo', values.logo)
      }

      if (values.banner instanceof File) {
        formData.append('banner', values.banner)
      }

      const response = await onSubmit(formData)
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

  console.log('bannerPreview', bannerPreview)

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
                        <FormLabel className="gap-1">
                          Name<span>*</span>
                        </FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-1">
                          Category<span>*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(AppCategory).map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.replace('_', ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-1">
                          Description<span>*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="tvl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="gap-1">
                            TVL<span>*</span>
                          </FormLabel>
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
                          <FormLabel className="gap-1">
                            MCAP/TVL<span>*</span>
                          </FormLabel>
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
                            <FormLabel className="gap-1">
                              1D Change<span>*</span>
                            </FormLabel>
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
                            <FormLabel className="gap-1">
                              7D Change<span>*</span>
                            </FormLabel>
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
                            <FormLabel className="gap-1">
                              1M Change<span>*</span>
                            </FormLabel>
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
                            <FormLabel className="gap-1">
                              Revenue (1D)<span>*</span>
                            </FormLabel>
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
                            <FormLabel className="gap-1">
                              Revenue (7D)<span>*</span>
                            </FormLabel>
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
                            <FormLabel className="gap-1">
                              Revenue (1M)<span>*</span>
                            </FormLabel>
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

                    <div className="space-y-2">
                      <Label htmlFor="logo" className="gap-1">
                        Logo<span>*</span>
                      </Label>
                      <div className="flex items-center gap-4">
                        {logoPreview && (
                          <div className="relative h-12 w-12 overflow-hidden rounded-full border">
                            <Image
                              src={logoPreview}
                              alt="Logo preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <Input
                          id="logo"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="banner" className="gap-1">
                        Banner<span>*</span>
                      </Label>
                      <div className="flex items-center gap-4">
                        {bannerPreview && (
                          <div className="relative h-24 w-48 overflow-hidden rounded-md border">
                            <Image
                              src={bannerPreview}
                              alt="Banner preview"
                              width={100}
                              height={100}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <Input
                          id="banner"
                          type="file"
                          accept="image/*"
                          onChange={handleBannerChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : edit ? (
                    <Pencil className="mr-2 h-4 w-4" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
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

import * as React from 'react'
import { HTMLMotionProps, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto rounded-xl border">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'border-border dark:border-border-dark [&_tr]:border-b bg-muted',
      className
    )}
    {...props}
  />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    animate?: boolean
    index?: number
  }
>(({ className, animate, index = 0, ...props }, ref) => {
  const baseClassName =
    'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'

  if (animate) {
    return (
      <motion.tr
        ref={ref}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
        className={cn(baseClassName, className)}
        {...(props as HTMLMotionProps<'tr'>)}
      />
    )
  }

  return <tr ref={ref} className={cn(baseClassName, className)} {...props} />
})
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'px-4 py-4 sm:py-6 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

// 'use client'
// import * as React from 'react'

// import { cn } from '@/lib/utils'

// function Table({ className, ...props }: React.ComponentProps<'table'>) {
//   return (
//     <div
//       data-slot="table-container"
//       className="relative w-full overflow-x-auto"
//     >
//       <table
//         data-slot="table"
//         className={cn('w-full caption-bottom text-sm', className)}
//         {...props}
//       />
//     </div>
//   )
// }

// function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
//   return (
//     <thead
//       data-slot="table-header"
//       className={cn('[&_tr]:border-b', className)}
//       {...props}
//     />
//   )
// }

// function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
//   return (
//     <tbody
//       data-slot="table-body"
//       className={cn('[&_tr:last-child]:border-0', className)}
//       {...props}
//     />
//   )
// }

// function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
//   return (
//     <tfoot
//       data-slot="table-footer"
//       className={cn(
//         'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
//   return (
//     <tr
//       data-slot="table-row"
//       className={cn(
//         'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
//   return (
//     <th
//       data-slot="table-head"
//       className={cn(
//         'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
//   return (
//     <td
//       data-slot="table-cell"
//       className={cn(
//         'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function TableCaption({
//   className,
//   ...props
// }: React.ComponentProps<'caption'>) {
//   return (
//     <caption
//       data-slot="table-caption"
//       className={cn('text-muted-foreground mt-4 text-sm', className)}
//       {...props}
//     />
//   )
// }

// export {
//   Table,
//   TableHeader,
//   TableBody,
//   TableFooter,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableCaption,
// }

import { LockIcon, UsersIcon } from 'lucide-react'

export const adminNavLinks = [
  {
    title: 'Apps',
    url: '/apps',
    icon: LockIcon,
    isActive: true,
  },
  {
    title: 'Users',
    url: '/users',
    icon: UsersIcon,
    isActive: false,
  },
]

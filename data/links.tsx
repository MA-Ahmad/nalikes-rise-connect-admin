import { LockIcon, TwitterIcon } from 'lucide-react'

export const adminNavLinks = [
  {
    title: 'Apps',
    url: '/apps',
    icon: LockIcon,
    isActive: true,
  },
  {
    title: 'Tweets',
    url: '/tweets',
    icon: TwitterIcon,
    isActive: false,
  },
]

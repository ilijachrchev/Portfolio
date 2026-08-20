'use client'

import { usePathname } from 'next/navigation'
import SpiderAtmosphere from './SpiderAtmosphere'

export default function SpiderExperience() {
  const pathname = usePathname()

  return <SpiderAtmosphere showCity={pathname === '/'} />
}

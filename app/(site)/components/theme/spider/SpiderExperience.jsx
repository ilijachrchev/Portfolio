'use client'

import { usePathname } from 'next/navigation'
import SpiderAtmosphere from './SpiderAtmosphere'
import SpiderScrollCharacter from './SpiderScrollCharacter'

export default function SpiderExperience() {
  const pathname = usePathname()

  const isHomepage = pathname === '/'

  return (
    <>
      <SpiderAtmosphere showCity={isHomepage} />
      {isHomepage && <SpiderScrollCharacter />}
    </>
  )
}

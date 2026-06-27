'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/knowledge', label: 'คลังความรู้' },
  { href: '/news', label: 'ข่าวสาร' },
  { href: '/prompts', label: 'คลัง Prompt' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-blue-100/20 shadow-sm">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-2xl font-black text-blue-900 font-headline tracking-tight">
          Scholarly Luminary
        </Link>

        <div className="hidden md:flex items-center space-x-8 font-headline font-bold tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors',
                pathname === link.href
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-slate-600 hover:text-blue-500'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="hidden lg:flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full text-sm text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-sm">search</span>
            ค้นหา...
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2 bg-primary text-on-primary rounded-full font-bold hover:scale-95 transition-all duration-150 ease-in-out"
          >
            ติดต่อ
          </Link>
        </div>
      </div>
    </nav>
  )
}

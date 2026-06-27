import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-primary text-on-primary px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined">admin_panel_settings</span>
          <span className="font-headline font-bold text-lg">Admin Panel</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-bold">
          <Link href="/admin" className="hover:opacity-70 transition-opacity">Dashboard</Link>
          <Link href="/admin/news" className="hover:opacity-70 transition-opacity">ข่าวสาร</Link>
          <Link href="/admin/knowledge" className="hover:opacity-70 transition-opacity">คลังความรู้</Link>
          <Link href="/admin/prompts" className="hover:opacity-70 transition-opacity">Prompts</Link>
          <Link href="/" className="hover:opacity-70 transition-opacity flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">open_in_new</span>หน้าเว็บ
          </Link>
        </div>
      </nav>
      <div className="p-8 max-w-6xl mx-auto">{children}</div>
    </div>
  )
}

import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ count: newsCount }, { count: knowledgeCount }, { count: promptsCount }] = await Promise.all([
    supabase.from('news').select('*', { count: 'exact', head: true }),
    supabase.from('knowledge').select('*', { count: 'exact', head: true }),
    supabase.from('prompts').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'ข่าวสาร', count: newsCount ?? 0, icon: 'newspaper', href: '/admin/news', color: 'bg-primary text-on-primary' },
    { label: 'คลังความรู้', count: knowledgeCount ?? 0, icon: 'library_books', href: '/admin/knowledge', color: 'bg-tertiary text-on-primary' },
    { label: 'AI Prompt', count: promptsCount ?? 0, icon: 'smart_toy', href: '/admin/prompts', color: 'bg-secondary text-on-primary' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline font-extrabold text-3xl text-on-surface">Dashboard</h1>
        <p className="text-on-surface-variant mt-1">ยินดีต้อนรับ, {user?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`${s.color} p-8 rounded-xl hover:scale-[1.02] transition-transform`}>
            <span className="material-symbols-outlined text-4xl mb-4 block opacity-80">{s.icon}</span>
            <div className="text-4xl font-black mb-1">{s.count}</div>
            <div className="font-bold opacity-80">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: '/admin/news/new', label: '+ เพิ่มข่าวสาร', color: 'border-primary text-primary' },
          { href: '/admin/knowledge/new', label: '+ เพิ่มคลังความรู้', color: 'border-tertiary text-tertiary' },
          { href: '/admin/prompts/new', label: '+ เพิ่ม Prompt', color: 'border-secondary text-secondary' },
        ].map((btn) => (
          <Link key={btn.href} href={btn.href} className={`border-2 ${btn.color} rounded-xl p-6 text-center font-bold hover:bg-surface-container transition-colors`}>
            {btn.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface NewsItem {
  id: string
  title: string
  excerpt: string | null
  category: string | null
  is_pinned: boolean
  published_at: string
}

export const revalidate = 60

export default async function NewsPage() {
  const { data: allNews } = await supabase
    .from('news')
    .select('id, title, excerpt, category, is_pinned, published_at')
    .order('is_pinned', { ascending: false })
    .order('published_at', { ascending: false })

  const news: NewsItem[] = allNews ?? []
  const featured = news.find((n) => n.is_pinned) ?? news[0]
  const rest = news.filter((n) => n.id !== featured?.id)

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })

  const catColor: Record<string, string> = {
    ประกาศ: 'bg-secondary-container text-on-secondary-container',
    'ข่าวการศึกษา': 'bg-tertiary-container text-on-tertiary-container',
    วิชาการ: 'bg-primary-container text-on-primary-container',
  }

  return (
    <div className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tight mb-2">
          ข่าวสาร / ประชาสัมพันธ์
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl">
          ข่าวการศึกษา ประกาศสำคัญ และข้อมูลการอบรมพัฒนาบุคลากร
        </p>
      </header>

      {/* Featured */}
      {featured && (
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center">
            <div className="lg:col-span-6 relative">
              <div className="rounded-lg overflow-hidden shadow-2xl bg-surface-container-low h-[350px] flex items-center justify-center">
                <span className="material-symbols-outlined text-8xl text-outline">newspaper</span>
              </div>
            </div>
            <div className="lg:col-span-4 lg:pl-8">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container text-sm font-bold mb-4">
                <span className="material-symbols-outlined mr-2 text-sm">star</span>
                {featured.is_pinned ? 'ข่าวเด่น' : 'ล่าสุด'}
              </span>
              <h2 className="font-headline text-3xl font-extrabold leading-tight mb-4 text-on-surface">
                {featured.title}
              </h2>
              <p className="text-on-surface-variant mb-6 leading-relaxed">
                {featured.excerpt ?? ''}
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold">
                  อ่านต่อ
                </button>
                <span className="text-sm text-on-surface-variant">{formatDate(featured.published_at)}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((item) => (
          <article
            key={item.id}
            className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant/15 flex flex-col hover:shadow-md transition-all"
          >
            <div className="rounded-md overflow-hidden mb-6 h-48 bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-outline">newspaper</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${catColor[item.category ?? ''] ?? 'bg-surface-container text-on-surface-variant'}`}>
                {item.category ?? 'ข่าวสาร'}
              </span>
              <span className="text-xs text-on-surface-variant">{formatDate(item.published_at)}</span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-3 text-on-surface">{item.title}</h3>
            <p className="text-on-surface-variant text-sm mb-6 flex-grow line-clamp-3">
              {item.excerpt ?? ''}
            </p>
            <a className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform" href="#">
              อ่านเพิ่มเติม <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </article>
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-20 text-on-surface-variant">
          <span className="material-symbols-outlined text-6xl block mb-4 text-outline">inbox</span>
          <p>ยังไม่มีข่าวสาร</p>
        </div>
      )}
    </div>
  )
}

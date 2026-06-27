import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const revalidate = 60

export default async function HomePage() {
  const { data: latestNews } = await supabase
    .from('news')
    .select('id, title, excerpt, category, published_at')
    .order('published_at', { ascending: false })
    .limit(3)

  const news = latestNews ?? []

  const catColor: Record<string, string> = {
    ประกาศ: 'bg-secondary-container text-on-secondary-container',
    'ข่าวการศึกษา': 'bg-tertiary-container text-on-tertiary-container',
    วิชาการ: 'bg-primary-container text-on-primary-container',
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full font-bold text-sm">
              <span className="material-symbols-outlined text-sm">school</span>
              <span>ศึกษานิเทศก์</span>
            </div>
            <h1 className="font-headline font-extrabold text-6xl lg:text-7xl text-on-surface leading-[1.1] tracking-tight">
              นิเทศ{' '}
              <span className="text-primary">อย่างมีคุณภาพ</span>{' '}
              สู่การศึกษาที่ยั่งยืน
            </h1>
            <p className="text-on-surface-variant text-xl leading-relaxed max-w-xl font-body">
              รวบรวมความรู้ด้านการนิเทศการศึกษา ข่าวสารวิชาการ และ AI Prompt
              เพื่อพัฒนาบุคลากรทางการศึกษาในยุคดิจิทัล
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/knowledge" className="px-8 py-4 bg-primary text-on-primary rounded-full font-bold text-lg shadow-lg hover:scale-95 transition-transform">
                คลังความรู้
              </Link>
              <Link href="/prompts" className="px-8 py-4 bg-surface-container-lowest text-primary rounded-full font-bold text-lg border border-outline-variant/30 hover:bg-surface-container-low transition-colors">
                คลัง AI Prompt
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-tertiary-container/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -z-10"></div>
            <div className="rounded-xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 bg-surface-container-low aspect-[4/5] flex items-center justify-center">
              <div className="text-center p-12">
                <span className="material-symbols-outlined text-primary mb-4 block" style={{ fontSize: '5rem' }}>menu_book</span>
                <p className="font-headline font-bold text-2xl text-on-surface">คลังทรัพยากรดิจิทัล</p>
                <p className="text-on-surface-variant mt-2">สำหรับศึกษานิเทศก์</p>
              </div>
            </div>
            <div className="absolute bottom-8 -left-8 bg-surface-container-lowest p-6 rounded-lg shadow-xl max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">star</span>
                <span className="font-bold text-lg">15+ ปี</span>
              </div>
              <p className="text-sm text-on-surface-variant">ประสบการณ์ด้านการนิเทศการศึกษา</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <h2 className="font-headline font-extrabold text-4xl mb-4 text-on-surface">บริการและเนื้อหา</h2>
            <p className="text-on-surface-variant max-w-2xl">รวมทรัพยากรสำหรับการพัฒนาการศึกษาอย่างครบวงจร</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/news" className="md:col-span-2 bg-surface-container-lowest p-10 rounded-lg group hover:bg-primary transition-colors duration-500">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center mb-8 group-hover:bg-on-primary transition-colors">
                    <span className="material-symbols-outlined text-on-primary-container">newspaper</span>
                  </div>
                  <h3 className="font-headline font-bold text-3xl mb-4 group-hover:text-on-primary">ข่าวสาร / ประชาสัมพันธ์</h3>
                  <p className="text-on-surface-variant group-hover:text-on-primary/80 max-w-md">
                    ข่าวการศึกษา ประกาศสำคัญ และข้อมูลการอบรมพัฒนาบุคลากรทางการศึกษา
                  </p>
                </div>
                <div className="mt-8 flex gap-3">
                  <span className="px-4 py-1 bg-primary-container/20 rounded-full text-xs font-bold group-hover:bg-white/20 group-hover:text-white">ข่าวด่วน</span>
                  <span className="px-4 py-1 bg-primary-container/20 rounded-full text-xs font-bold group-hover:bg-white/20 group-hover:text-white">ประกาศ</span>
                </div>
              </div>
            </Link>

            <Link href="/knowledge" className="bg-tertiary-container p-10 rounded-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-surface-container-lowest flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-tertiary">library_books</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-4 text-on-tertiary-container">คลังความรู้</h3>
              <p className="text-on-tertiary-container/70 text-sm leading-relaxed">
                บทความ งานวิจัย และเอกสารวิชาการด้านการนิเทศการศึกษา
              </p>
            </Link>

            <Link href="/prompts" className="bg-secondary-container p-10 rounded-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-surface-container-lowest flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-secondary">smart_toy</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-4 text-on-secondary-container">คลัง AI Prompt</h3>
              <p className="text-on-secondary-container/70 text-sm leading-relaxed">
                Prompt สำเร็จรูปสำหรับใช้กับ AI เขียนรายงาน แผนการนิเทศ และอื่นๆ
              </p>
            </Link>

            <Link href="/search" className="md:col-span-2 bg-surface-container-high p-10 rounded-lg overflow-hidden relative hover:shadow-xl transition-shadow">
              <div className="relative z-10">
                <h3 className="font-headline font-bold text-3xl mb-4 text-on-primary-container">ค้นหาข้ามทุกหมวด</h3>
                <p className="text-on-primary-container/80 max-w-sm mb-6">ค้นหาข้อมูลจากข่าวสาร ความรู้ และ Prompt ในที่เดียว</p>
                <span className="flex items-center gap-2 text-primary font-bold">
                  เริ่มค้นหา <span className="material-symbols-outlined">arrow_forward</span>
                </span>
              </div>
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/10 rounded-full blur-2xl"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      {news.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-8">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-headline font-extrabold text-4xl text-on-surface">ข่าวสารล่าสุด</h2>
              <p className="text-on-surface-variant">ข้อมูลและประกาศที่น่าสนใจ</p>
            </div>
            <Link href="/news" className="text-primary font-bold flex items-center gap-2 hover:underline decoration-2 underline-offset-4">
              ดูทั้งหมด <span className="material-symbols-outlined">open_in_new</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <div key={item.id} className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/15 hover:shadow-lg transition-shadow">
                <div className="h-48 bg-surface-container rounded-md mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-outline">newspaper</span>
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${catColor[item.category ?? ''] ?? 'bg-surface-container text-on-surface-variant'}`}>
                  {item.category ?? 'ข่าวสาร'}
                </span>
                <h3 className="font-headline font-bold text-lg mt-3 mb-2 text-on-surface line-clamp-2">{item.title}</h3>
                <p className="text-on-surface-variant text-sm line-clamp-2">{item.excerpt}</p>
                <p className="text-xs text-outline mt-3">{formatDate(item.published_at)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="bg-gradient-to-br from-primary to-primary-dim rounded-xl p-16 text-center text-on-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <h2 className="text-4xl font-headline font-extrabold mb-6 relative z-10">สนใจร่วมงานหรือต้องการข้อมูลเพิ่มเติม?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto relative z-10">
            ยินดีแลกเปลี่ยนประสบการณ์ด้านการศึกษาและการจัดการเรียนรู้
          </p>
          <div className="flex justify-center gap-4 relative z-10 flex-wrap">
            <Link href="/prompts" className="px-8 py-3 bg-secondary-container text-on-secondary-container rounded-full font-bold hover:scale-105 transition-transform">
              ดู AI Prompt
            </Link>
            <Link href="/contact" className="px-8 py-3 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-bold hover:bg-white/30 transition-all">
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

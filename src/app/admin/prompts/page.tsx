import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function AdminPromptsPage() {
  const supabase = await createClient()
  const { data: prompts } = await supabase
    .from('prompts')
    .select('id, title, ai_target, use_case, created_at')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline font-extrabold text-3xl text-on-surface">จัดการ AI Prompt</h1>
        <Link href="/admin/prompts/new" className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold hover:scale-95 transition-transform">
          + เพิ่ม Prompt
        </Link>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-bold text-on-surface-variant">หัวข้อ</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-on-surface-variant">AI Target</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-on-surface-variant">ประเภท</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {prompts?.map((item) => (
              <tr key={item.id} className="border-t border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4 font-medium text-on-surface">{item.title}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold">
                    {item.ai_target ?? 'ทั่วไป'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{item.use_case ?? '-'}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/admin/prompts/${item.id}`} className="px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-xs font-bold hover:opacity-80">
                      แก้ไข
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {(!prompts || prompts.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">ยังไม่มี Prompt</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

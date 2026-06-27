import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function AdminNewsPage() {
  const supabase = await createClient()
  const { data: news } = await supabase
    .from('news')
    .select('id, title, category, is_pinned, published_at')
    .order('published_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline font-extrabold text-3xl text-on-surface">จัดการข่าวสาร</h1>
        <Link href="/admin/news/new" className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold hover:scale-95 transition-transform">
          + เพิ่มข่าว
        </Link>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-bold text-on-surface-variant">หัวข้อ</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-on-surface-variant">หมวด</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-on-surface-variant">ปักหมุด</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-on-surface-variant">วันที่</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {news?.map((item) => (
              <tr key={item.id} className="border-t border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4 font-medium text-on-surface">{item.title}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-xs font-bold">
                    {item.category ?? '-'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {item.is_pinned && <span className="material-symbols-outlined text-secondary text-sm">push_pin</span>}
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">
                  {new Date(item.published_at).toLocaleDateString('th-TH')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/admin/news/${item.id}`} className="px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-xs font-bold hover:opacity-80">
                      แก้ไข
                    </Link>
                    <DeleteButton id={item.id} table="news" />
                  </div>
                </td>
              </tr>
            ))}
            {(!news || news.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                  ยังไม่มีข่าวสาร
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function DeleteButton({ id, table }: { id: string; table: string }) {
  return (
    <form action={`/api/admin/delete`} method="POST">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="table" value={table} />
      <button type="submit" className="px-4 py-1.5 bg-error-container text-on-error-container rounded-full text-xs font-bold hover:opacity-80"
        onClick={(e) => { if (!confirm('ลบรายการนี้?')) e.preventDefault() }}>
        ลบ
      </button>
    </form>
  )
}

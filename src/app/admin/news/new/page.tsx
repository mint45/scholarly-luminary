'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function NewNewsPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', category: 'ข่าวการศึกษา', is_pinned: false,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase.from('news').insert([form])
    if (!error) router.push('/admin/news')
    else { alert('เกิดข้อผิดพลาด: ' + error.message); setSaving(false) }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-on-surface-variant hover:text-on-surface">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-headline font-extrabold text-3xl text-on-surface">เพิ่มข่าวสาร</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 space-y-6">
        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">หัวข้อข่าว *</label>
          <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
            className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="หัวข้อข่าว..." />
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">สรุปย่อ</label>
          <textarea rows={2} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})}
            className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="สรุปเนื้อหาสั้นๆ..." />
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">เนื้อหา</label>
          <textarea rows={8} value={form.content} onChange={e => setForm({...form, content: e.target.value})}
            className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="เนื้อหาข่าว..." />
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">หมวดหมู่</label>
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
            className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
            <option>ข่าวการศึกษา</option>
            <option>ประกาศ</option>
            <option>วิชาการ</option>
          </select>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.is_pinned} onChange={e => setForm({...form, is_pinned: e.target.checked})}
            className="w-5 h-5 accent-primary" />
          <span className="font-medium text-on-surface">ปักหมุดเป็นข่าวเด่น</span>
        </label>

        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={saving}
            className="flex-1 py-3 bg-primary text-on-primary rounded-full font-bold hover:scale-[0.98] transition-transform disabled:opacity-60">
            {saving ? 'กำลังบันทึก...' : 'บันทึกข่าว'}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-8 py-3 border border-outline-variant rounded-full font-bold text-on-surface-variant hover:bg-surface-container transition-colors">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  )
}

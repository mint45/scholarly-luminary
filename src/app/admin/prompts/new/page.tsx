'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function NewPromptPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', prompt_text: '', description: '',
    ai_target: 'ทั่วไป', use_case: '', tags: '',
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const tags = form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    const { error } = await supabase.from('prompts').insert([{ ...form, tags }])
    if (!error) router.push('/admin/prompts')
    else { alert('เกิดข้อผิดพลาด: ' + error.message); setSaving(false) }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-on-surface-variant hover:text-on-surface">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-headline font-extrabold text-3xl text-on-surface">เพิ่ม AI Prompt</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 space-y-6">
        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">ชื่อ Prompt *</label>
          <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
            className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="เช่น เขียนแผนการนิเทศ..." />
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">Prompt Text *</label>
          <textarea required rows={6} value={form.prompt_text} onChange={e => setForm({...form, prompt_text: e.target.value})}
            className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
            placeholder="เนื้อหา Prompt ที่จะ copy ไปใช้กับ AI..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">AI Target</label>
            <select value={form.ai_target} onChange={e => setForm({...form, ai_target: e.target.value})}
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
              <option>ทั่วไป</option>
              <option>ChatGPT</option>
              <option>Claude</option>
              <option>Gemini</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">ประเภทการใช้งาน</label>
            <input value={form.use_case} onChange={e => setForm({...form, use_case: e.target.value})}
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="เช่น แผนการนิเทศ" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">Tags (คั่นด้วยจุลภาค)</label>
          <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})}
            className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="นิเทศ, รายงาน, ประเมิน" />
        </div>

        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={saving}
            className="flex-1 py-3 bg-primary text-on-primary rounded-full font-bold hover:scale-[0.98] transition-transform disabled:opacity-60">
            {saving ? 'กำลังบันทึก...' : 'บันทึก Prompt'}
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

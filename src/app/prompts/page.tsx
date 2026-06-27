'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Prompt {
  id: string
  title: string
  prompt_text: string
  ai_target: string | null
  use_case: string | null
  tags: string[] | null
}

const aiColors: Record<string, string> = {
  'ทั่วไป': 'bg-surface-container-high text-on-surface',
  'ChatGPT': 'bg-tertiary-container text-on-tertiary-container',
  'Claude': 'bg-secondary-container text-on-secondary-container',
  'Gemini': 'bg-primary-container text-on-primary-container',
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [filter, setFilter] = useState('ทั้งหมด')
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('prompts').select('*').order('created_at', { ascending: false })
      setPrompts(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const useCases = ['ทั้งหมด', ...Array.from(new Set(prompts.map((p) => p.use_case).filter(Boolean) as string[]))]
  const filtered = filter === 'ทั้งหมด' ? prompts : prompts.filter((p) => p.use_case === filter)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold mb-4">
          AI Prompt Library
        </span>
        <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-on-surface tracking-tight mb-6">
          คลัง <span className="text-primary italic">AI Prompt</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">
          Prompt สำเร็จรูปสำหรับใช้กับ AI ช่วยงานด้านการศึกษา กดคัดลอกแล้วนำไปวางใน AI ได้เลย
        </p>
      </header>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-12">
        {useCases.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full font-bold transition-colors ${
              filter === f
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface hover:bg-primary-container'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl block mb-4 text-outline animate-spin">progress_activity</span>
          <p>กำลังโหลด...</p>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((prompt) => (
          <div
            key={prompt.id}
            className="bg-surface-container-lowest rounded-lg border border-outline-variant/15 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${aiColors[prompt.ai_target ?? 'ทั่วไป'] ?? aiColors['ทั่วไป']}`}>
                  {prompt.ai_target ?? 'ทั่วไป'}
                </span>
                {prompt.use_case && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-surface-container text-on-surface-variant">
                    {prompt.use_case}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleCopy(prompt.id, prompt.prompt_text)}
                className="flex items-center gap-1 px-4 py-1.5 bg-primary text-on-primary rounded-full text-xs font-bold hover:scale-105 transition-transform shrink-0"
              >
                <span className="material-symbols-outlined text-sm">
                  {copied === prompt.id ? 'check' : 'content_copy'}
                </span>
                {copied === prompt.id ? 'คัดลอกแล้ว!' : 'คัดลอก'}
              </button>
            </div>

            <h3 className="font-headline font-bold text-xl mb-3 text-on-surface">{prompt.title}</h3>

            <div className="bg-surface-container rounded-lg p-4 font-mono text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap border border-outline-variant/10">
              {prompt.prompt_text}
            </div>

            {prompt.tags && prompt.tags.length > 0 && (
              <div className="flex gap-2 mt-4 flex-wrap">
                {prompt.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-surface-container text-on-surface-variant rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-on-surface-variant">
          <span className="material-symbols-outlined text-6xl block mb-4 text-outline">inbox</span>
          <p>ยังไม่มี Prompt ในหมวดนี้</p>
        </div>
      )}
    </div>
  )
}

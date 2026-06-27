'use client'

import { useState } from 'react'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  return (
    <div className="pt-12 pb-20 px-6 max-w-4xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tight mb-4">ค้นหา</h1>
        <p className="text-on-surface-variant text-lg">ค้นหาจากข่าวสาร คลังความรู้ และ AI Prompt</p>
      </header>

      <div className="relative mb-12">
        <span className="absolute inset-y-0 left-5 flex items-center text-outline">
          <span className="material-symbols-outlined">search</span>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="พิมพ์คำค้นหา..."
          className="w-full pl-14 pr-6 py-5 text-xl bg-surface-container-lowest border border-outline-variant/30 rounded-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        />
      </div>

      {query ? (
        <div className="text-center text-on-surface-variant py-20">
          <span className="material-symbols-outlined text-6xl mb-4 block text-outline">manage_search</span>
          <p className="text-lg">กำลังค้นหา &ldquo;{query}&rdquo; — เชื่อมต่อ Supabase เพื่อแสดงผลจริง</p>
        </div>
      ) : (
        <div className="text-center text-on-surface-variant py-20">
          <span className="material-symbols-outlined text-6xl mb-4 block text-outline">search</span>
          <p className="text-lg">พิมพ์คำค้นหาด้านบนเพื่อเริ่มต้น</p>
        </div>
      )}
    </div>
  )
}

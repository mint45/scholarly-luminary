import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-blue-100/20 py-12 px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="text-lg font-bold text-slate-900 font-headline">Scholarly Luminary</div>
          <p className="text-slate-500 text-sm leading-relaxed">
            ยกระดับมาตรฐานการศึกษา ผ่านการนิเทศก์ที่มีประสิทธิภาพและนวัตกรรมที่ยั่งยืน
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div className="font-bold text-blue-600">เมนู</div>
          {[
            { href: '/', label: 'หน้าแรก' },
            { href: '/knowledge', label: 'คลังความรู้' },
            { href: '/news', label: 'ข่าวสาร' },
            { href: '/prompts', label: 'คลัง Prompt' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-500 hover:text-orange-500 transition-colors hover:translate-x-1 inline-block duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="space-y-4 text-sm">
          <div className="font-bold text-blue-600">ติดต่อ</div>
          <div className="flex gap-4">
            <a href="#" className="text-slate-500 hover:text-primary transition-colors">Facebook</a>
            <a href="#" className="text-slate-500 hover:text-primary transition-colors">Line</a>
            <a href="#" className="text-slate-500 hover:text-primary transition-colors">Email</a>
          </div>
          <p className="text-slate-400 text-xs mt-8">
            © {new Date().getFullYear()} The Scholarly Luminary. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

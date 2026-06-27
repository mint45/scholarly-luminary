export default function ContactPage() {
  return (
    <div className="pt-12 pb-20 px-6 max-w-3xl mx-auto">
      <header className="mb-12">
        <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tight mb-2">ติดต่อ</h1>
        <p className="text-on-surface-variant text-lg">ยินดีรับฟังและแลกเปลี่ยนประสบการณ์ด้านการศึกษา</p>
      </header>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">ชื่อ-นามสกุล</label>
          <input
            type="text"
            className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="กรุณากรอกชื่อ"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">อีเมล</label>
          <input
            type="email"
            className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">ข้อความ</label>
          <textarea
            rows={6}
            className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="พิมพ์ข้อความของคุณ..."
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-primary text-on-primary rounded-full font-bold text-lg hover:scale-[0.98] transition-transform"
        >
          ส่งข้อความ
        </button>
      </form>
    </div>
  )
}

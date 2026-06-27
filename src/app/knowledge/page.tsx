export default function KnowledgePage() {
  const categories = ['ทั้งหมด', 'การนิเทศ', 'หลักสูตร', 'การวิจัย', 'นวัตกรรม']

  return (
    <div className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold mb-4">คลังความรู้</span>
        <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-on-surface tracking-tight mb-6">
          คลังความรู้ <span className="text-primary italic">วิชาการ</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">
          บทความ งานวิจัย เอกสาร และสื่อการเรียนรู้สำหรับศึกษานิเทศก์และบุคลากรทางการศึกษา
        </p>
      </header>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-6 py-2 rounded-full font-bold transition-colors ${
              i === 0
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface hover:bg-primary-container'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
        {/* Featured */}
        <div className="md:col-span-12 flex flex-col md:flex-row bg-surface-container-low rounded-xl overflow-visible mb-4">
          <div className="md:w-3/5 p-4">
            <div className="w-full h-96 bg-surface-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-outline">image</span>
            </div>
          </div>
          <div className="md:w-2/5 p-12 md:pl-0 flex flex-col justify-center">
            <div className="bg-surface-container-lowest p-8 rounded-lg shadow-xl md:-translate-y-8">
              <span className="px-3 py-1 bg-primary-container text-on-primary-container text-xs font-bold rounded-full mb-4 inline-block">บทความเด่น</span>
              <h3 className="text-3xl font-headline font-bold mb-4">หัวข้อบทความเด่น</h3>
              <p className="text-on-surface-variant mb-6 leading-relaxed">
                เชื่อมต่อ Supabase เพื่อแสดงบทความจริงจากฐานข้อมูล
              </p>
              <a className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all" href="#">
                อ่านบทความ <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>

        {/* Cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="md:col-span-6 lg:col-span-4 group">
            <div className="bg-surface-container-lowest rounded-lg p-6 h-full border border-outline-variant/15 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-6 overflow-hidden rounded-md h-48 bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-outline">image</span>
              </div>
              <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-xs font-bold rounded-full mb-4 inline-block">การนิเทศ</span>
              <h4 className="text-xl font-headline font-bold mb-3">หัวข้อความรู้ #{i}</h4>
              <p className="text-sm text-on-surface-variant line-clamp-3">
                เนื้อหาย่อจะแสดงหลังเชื่อมต่อ Supabase
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

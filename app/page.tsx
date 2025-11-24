"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Phone, MapPin, Sprout, Search, User, Newspaper, ChevronLeft, ArrowLeft } from "lucide-react";

// لینک‌های دیتابیس (تغییر ندادم)
const DATA_URLS = {
  FARMERS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRh9jMd7TSWcY3RVRqFFiDszo8UUVaxUvAZjSzkuxF7-OxhffqmgKrXoeTyntQRE23bZI5th77mLrlS/pub?gid=0&single=true&output=csv",
  NEWS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRh9jMd7TSWcY3RVRqFFiDszo8UUVaxUvAZjSzkuxF7-OxhffqmgKrXoeTyntQRE23bZI5th77mLrlS/pub?gid=1909136888&single=true&output=csv"
};

export default function Home() {
  const [view, setView] = useState("home");
  const [farmers, setFarmers] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Papa.parse(DATA_URLS.FARMERS, { download: true, header: true, complete: (res) => setFarmers(res.data) });
    Papa.parse(DATA_URLS.NEWS, { download: true, header: true, complete: (res) => setNews(res.data) });
  }, []);

  // --- صفحه اصلی (طراحی مدرن Bento) ---
  if (view === "home") return (
    <div className="max-w-md mx-auto min-h-screen p-4 pb-10">
      
      {/* هدر بالای صفحه */}
      <div className="flex items-center justify-between mb-6 pt-2">
        <div>
            <h1 className="text-2xl font-black text-gray-800">بازار روستا 🌾</h1>
            <p className="text-xs text-gray-500 font-medium">مستقیم از مزرعه به سفره</p>
        </div>
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold border-2 border-white shadow-sm">
            ما
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 auto-rows-[minmax(100px,auto)]">
        
        {/* باکس ۱: تصویر بزرگ هیرو */}
        <div className="col-span-2 relative h-48 rounded-3xl overflow-hidden shadow-lg border-4 border-white group">
            <img 
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1000&auto=format&fit=crop" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Nature"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
                <span className="text-white text-xs font-medium bg-green-600/80 backdrop-blur-md px-2 py-1 rounded-lg w-fit mb-2">محصولات تازه</span>
                <h2 className="text-white font-bold text-xl leading-tight">طعم واقعی گردو و عسل کوهستان</h2>
            </div>
        </div>

        {/* باکس ۲: دکمه لیست کشاورزان (مهمترین) */}
        <div 
            onClick={() => setView("farmers")}
            className="col-span-2 bg-green-600 rounded-3xl p-5 text-white shadow-green-200 shadow-xl cursor-pointer active:scale-95 transition-transform relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-10 -translate-y-10 blur-2xl"></div>
            <div className="relative z-10 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold mb-1">لیست باغداران</h2>
                    <p className="text-green-100 text-sm opacity-90">{farmers.length > 0 ? `${farmers.length} فروشنده فعال` : "در حال بارگذاری..."}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Sprout size={24} className="text-white" />
                </div>
            </div>
        </div>

        {/* باکس ۳: اخبار */}
        <div onClick={() => setView("news")} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95 flex flex-col justify-between h-32">
            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-2">
                <Newspaper size={18} />
            </div>
            <div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">اخبار و رویداد</h3>
                <p className="text-[10px] text-gray-400 line-clamp-1">{news[0]?.title || "بدون خبر جدید"}</p>
            </div>
        </div>

        {/* باکس ۴: درباره ما */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95 flex flex-col justify-between h-32">
             <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-2">
                <User size={18} />
            </div>
            <div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">درباره سایت</h3>
                <p className="text-[10px] text-gray-400">حذف واسطه‌ها</p>
            </div>
        </div>

      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">طراحی شده برای حمایت از کشاورز ایرانی ❤️</p>
      </div>
    </div>
  );

  // --- صفحه لیست کشاورزان (طراحی کارتی تمیز) ---
  if (view === "farmers") {
    const filtered = farmers.filter(f => f.name?.includes(search) || f.product?.includes(search));
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gray-50/50">
        
        {/* هدر ثابت با بلور */}
        <div className="sticky top-0 z-20 glass-nav px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => setView("home")} className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 active:bg-gray-100">
                <ArrowLeft size={20}/>
            </button>
            <h2 className="text-lg font-bold text-gray-800">فروشندگان</h2>
          </div>
          
          <div className="relative">
            <input 
                placeholder="جستجوی نام کشاورز یا محصول..." 
                className="w-full p-3.5 pr-11 rounded-2xl border-none bg-white shadow-sm text-sm focus:ring-2 focus:ring-green-500/20 transition-all placeholder:text-gray-400" 
                onChange={e => setSearch(e.target.value)} 
                autoFocus
            />
            <Search className="absolute right-3.5 top-3.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="p-4 space-y-3 pb-24">
          {filtered.map((f, i) => (
            <div key={i} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all flex gap-4 items-center">
              
              {/* عکس پروفایل */}
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 border-2 border-white shadow-sm">
                {f.image ? (
                    <img src={f.image} className="w-full h-full object-cover" alt={f.name}/>
                ) : (
                    <span className="text-2xl">👨‍🌾</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 truncate">{f.name}</h3>
                  {f.category && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">{f.category}</span>}
                </div>
                
                <p className="text-sm text-green-700 font-medium mt-0.5 flex items-center gap-1">
                    <Sprout size={12}/> {f.product}
                </p>
                
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                    <MapPin size={12}/>
                    <span className="truncate">{f.location}</span>
                </div>
              </div>

              {/* دکمه تماس */}
              <a 
                href={`tel:${f.phone}`} 
                className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors shadow-sm active:scale-90"
              >
                <Phone size={18}/>
              </a>
            </div>
          ))}
          
          {filtered.length === 0 && (
             <div className="text-center py-10 opacity-50">
                <Sprout size={48} className="mx-auto mb-2 text-gray-300"/>
                <p>کشاورزی با این نام پیدا نشد</p>
             </div>
          )}
        </div>
      </div>
    );
  }

  // --- صفحه اخبار (ساده و خوانا) ---
  if (view === "news") return (
    <div className="max-w-md mx-auto p-4 min-h-screen">
      <button onClick={() => setView("home")} className="flex items-center gap-2 text-gray-500 mb-6 font-medium">
        <ArrowLeft size={18}/> بازگشت
      </button>
      <h2 className="text-2xl font-black text-gray-800 mb-6 px-1">اخبار روستا 📢</h2>
      
      <div className="space-y-4">
      {news.map((n, i) => (
        <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-orange-400"></div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded-lg">خبر جدید</span>
            <span className="text-xs text-gray-400">{n.date}</span>
          </div>
          <h3 className="font-bold text-lg text-gray-800 leading-snug">{n.title}</h3>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed text-justify">{n.summary}</p>
        </div>
      ))}
      </div>
    </div>
  );
}

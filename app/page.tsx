"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Phone, MapPin, Sprout, Search, ArrowLeft, Newspaper, ChefHat, Store, ChevronRight } from "lucide-react";

// --- تنظیمات دیتابیس (لینک‌های شما) ---
const DATA_URLS = {
  FARMERS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRh9jMd7TSWcY3RVRqFFiDszo8UUVaxUvAZjSzkuxF7-OxhffqmgKrXoeTyntQRE23bZI5th77mLrlS/pub?gid=0&single=true&output=csv",
  NEWS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRh9jMd7TSWcY3RVRqFFiDszo8UUVaxUvAZjSzkuxF7-OxhffqmgKrXoeTyntQRE23bZI5th77mLrlS/pub?gid=1909136888&single=true&output=csv"
};

export default function Home() {
  const [view, setView] = useState("home");
  const [farmers, setFarmers] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(DATA_URLS.FARMERS, { download: true, header: true, complete: (res) => { setFarmers(res.data); setLoading(false); }});
    Papa.parse(DATA_URLS.NEWS, { download: true, header: true, complete: (res) => setNews(res.data) });
  }, []);

  // --- کامپوننت لودینگ ---
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 text-emerald-800">
      <Sprout className="w-12 h-12 animate-bounce mb-4" />
      <p className="font-bold animate-pulse">در حال ورود به روستا...</p>
    </div>
  );

  // ==========================================
  // 🏡 صفحه اصلی (طرح مدرن و شیشه‌ای)
  // ==========================================
  if (view === "home") return (
    <div className="min-h-screen bg-[#F2F4F3] pb-10">
      
      {/* 1. هدر بزرگ با تصویر پس‌زمینه */}
      <div className="relative h-[280px] bg-emerald-900 rounded-b-[40px] shadow-xl overflow-hidden">
        <img 
            src="/header.jpg" 
            onError={(e) => {e.currentTarget.src = "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?q=80&w=1000&auto=format&fit=crop"}}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="header"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-transparent"></div>
        <div className="relative z-10 p-6 h-full flex flex-col justify-end pb-10">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full w-fit mb-3 border border-white/30">
                🌱 حمایت از تولید ملی
            </span>
            <h1 className="text-3xl font-black text-white mb-1">بازارچه محلی</h1>
            <p className="text-emerald-100 text-sm opacity-90">مستقیم از دست رنج کشاورز</p>
        </div>
      </div>

      {/* 2. شبکه‌ی Bento (منوهای اصلی) */}
      <div className="px-5 -mt-8 relative z-20 grid grid-cols-2 gap-4">
        
        {/* دکمه بزرگ کشاورزان */}
        <div 
            onClick={() => setView("farmers")}
            className="col-span-2 bg-white rounded-3xl p-5 shadow-lg border border-emerald-100 flex items-center justify-between cursor-pointer active:scale-95 transition-all group"
        >
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Store size={28} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">غرفه‌ها</h2>
                    <p className="text-xs text-gray-400 mt-1">{farmers.length} فروشنده فعال</p>
                </div>
            </div>
            <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                <ChevronRight size={20} />
            </div>
        </div>

        {/* دکمه اخبار */}
        <div onClick={() => setView("news")} className="bg-white rounded-3xl p-4 shadow-md border border-gray-100 flex flex-col justify-between h-36 cursor-pointer active:scale-95 transition-all">
            <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center">
                <Newspaper size={20} />
            </div>
            <div>
                <h3 className="font-bold text-gray-700">اخبار روستا</h3>
                <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{news[0]?.title || "..."}</p>
            </div>
        </div>

        {/* دکمه درباره ما */}
        <div className="bg-emerald-800 rounded-3xl p-4 shadow-md flex flex-col justify-between h-36 cursor-pointer active:scale-95 transition-all relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="w-10 h-10 bg-white/20 text-white rounded-xl flex items-center justify-center backdrop-blur-sm">
                <ChefHat size={20} />
            </div>
            <div>
                <h3 className="font-bold text-white">درباره ما</h3>
                <p className="text-[10px] text-emerald-200 mt-1">داستان ما</p>
            </div>
        </div>
      </div>

      <p className="text-center text-gray-400 text-xs mt-8">نسخه ۱.۰.۰</p>
    </div>
  );

  // ==========================================
  // 🚜 صفحه لیست کشاورزان (List View)
  // ==========================================
  if (view === "farmers") {
    const filtered = farmers.filter(f => f.name?.includes(search) || f.product?.includes(search));
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* هدر چسبان */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <button onClick={() => setView("home")} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={20} className="text-gray-600"/>
                </button>
                <h2 className="text-xl font-bold text-gray-800">لیست فروشندگان</h2>
            </div>
            {/* سرچ باکس */}
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="جستجوی نام یا محصول (مثلا: گردو)..." 
                    className="w-full bg-gray-100 text-gray-800 rounded-xl py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            </div>
        </div>

        {/* لیست کارت‌ها */}
        <div className="p-4 space-y-4 pb-20">
            {filtered.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 transition-all hover:shadow-md">
                    {/* تصویر پروفایل */}
                    <div className="w-20 h-20 rounded-xl bg-gray-200 overflow-hidden shrink-0 border border-gray-100">
                        {f.image ? (
                            <img src={f.image} className="w-full h-full object-cover" alt={f.name} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-300">
                                <Store size={32} />
                            </div>
                        )}
                    </div>

                    {/* اطلاعات */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800">{f.name}</h3>
                                {f.category && <span className="text-[10px] px-2 py-1 bg-gray-100 rounded-md text-gray-500">{f.category}</span>}
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-emerald-600 font-medium text-sm">
                                <Sprout size={14} />
                                <span>{f.product}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-end justify-between mt-2">
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <MapPin size={12} />
                                <span className="truncate max-w-[100px]">{f.location}</span>
                            </div>
                            <a href={`tel:${f.phone}`} className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-emerald-200 shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                                <Phone size={14} /> تماس
                            </a>
                        </div>
                    </div>
                </div>
            ))}
            
            {filtered.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                    <p>نتیجه‌ای یافت نشد :(</p>
                </div>
            )}
        </div>
      </div>
    );
  }

  // ==========================================
  // 📰 صفحه اخبار (طرح جدید: فید تلگرامی)
  // ==========================================
  if (view === "news") return (
    <div className="min-h-screen bg-gray-50 pb-10">
        {/* هدر ثابت بالا */}
        <div className="bg-white sticky top-0 z-20 px-4 py-3 shadow-sm border-b border-gray-100 flex items-center gap-3">
            <button onClick={() => setView("home")} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
                <ArrowLeft size={20}/>
            </button>
            <h2 className="font-black text-xl text-gray-800">تازه چه خبر؟ 📣</h2>
        </div>

        {/* لیست خبرها */}
        <div className="max-w-md mx-auto p-4 space-y-6">
            {news.map((n, i) => (
                <div key={i} className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                    
                    {/* بخش تصویر (اگر عکس داشته باشد) */}
                    {n.image && (
                        <div className="relative h-48 w-full bg-gray-100">
                            <img 
                                src={n.image} 
                                className="w-full h-full object-cover" 
                                alt={n.title} 
                                onError={(e) => {e.currentTarget.style.display='none'}} 
                            />
                            {/* افکت سایه روی عکس */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                        </div>
                    )}

                    {/* بخش متن و محتوا */}
                    <div className="p-5">
                        {/* دسته‌بندی یا تگ */}
                        <div className="flex items-center justify-between mb-3">
                             <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-lg">
                                {n.type || "رویداد"}
                             </span>
                             {/* آیکون شر (تزئینی) */}
                             <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                             </div>
                        </div>

                        <h3 className="text-lg font-black text-gray-800 mb-2 leading-tight">
                            {n.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-7 text-justify whitespace-pre-line">
                            {n.summary}
                        </p>

                        {/* فوتر کارت (تاریخ) */}
                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                            <span>تاریخ انتشار:</span>
                            <span className="font-mono bg-gray-50 px-2 py-1 rounded-md text-gray-500">
                                {n.date} 📅
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            {news.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <p>هنوز خبری منتشر نشده است...</p>
                </div>
            )}
        </div>
    </div>
  );
  
  // اگر هیچکدام از شرط‌ها برقرار نبود (محض احتیاط)
  return null;
}
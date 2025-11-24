"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Phone, MapPin, Sprout, Search, User, Newspaper, ChevronLeft } from "lucide-react";

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

  if (view === "home") return (
    <div className="bento-grid max-w-4xl mx-auto pb-20">
      <div className="card hero bg-green-800 text-white min-h-[180px] flex flex-col justify-end">
        <h1 className="text-2xl font-bold">محصولات ارگانیک منطقه</h1>
        <p className="opacity-90">خرید مستقیم از باغدار</p>
      </div>
      <div onClick={() => setView("farmers")} className="card main bg-green-50 border-green-200 cursor-pointer flex justify-between items-center">
        <div><h2 className="text-xl font-bold text-green-900">لیست کشاورزان</h2><p className="text-sm text-green-700">{farmers.length} فروشنده</p></div>
        <Sprout size={40} className="text-green-600" />
      </div>
      <div onClick={() => setView("news")} className="card cursor-pointer hover:bg-orange-50">
        <div className="flex justify-between mb-2"><h3 className="font-bold text-orange-900">اخبار</h3><Newspaper size={20} className="text-orange-500"/></div>
        <p className="text-xs text-gray-600 line-clamp-2">{news[0]?.title || "خبری نیست"}</p>
      </div>
    </div>
  );

  if (view === "farmers") {
    const filtered = farmers.filter(f => f.name?.includes(search) || f.product?.includes(search));
    return (
      <div className="max-w-md mx-auto p-4 pb-20">
        <div className="sticky top-0 bg-[#fdfbf7] py-2 z-10">
          <button onClick={() => setView("home")} className="flex items-center text-gray-500 mb-2"><ChevronLeft size={16}/> بازگشت</button>
          <input placeholder="جستجو..." className="w-full p-3 rounded-xl border" onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="space-y-3 mt-4">
          {filtered.map((f, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border shadow-sm flex gap-3">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                {f.image ? <img src={f.image} className="w-full h-full object-cover"/> : <User className="text-gray-400"/>}
              </div>
              <div className="flex-1">
                <div className="flex justify-between"><h3 className="font-bold">{f.name}</h3><a href={`tel:${f.phone}`} className="bg-green-600 text-white p-2 rounded-full"><Phone size={16}/></a></div>
                <span className="text-xs bg-green-100 text-green-800 px-2 rounded">{f.product}</span>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1"><MapPin size={12}/>{f.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "news") return (
    <div className="max-w-md mx-auto p-4">
      <button onClick={() => setView("home")} className="flex items-center text-gray-500 mb-4"><ChevronLeft size={16}/> بازگشت</button>
      <h2 className="text-xl font-bold mb-4">اخبار</h2>
      {news.map((n, i) => (
        <div key={i} className="bg-white p-4 rounded-xl border-r-4 border-orange-400 shadow-sm mb-3">
          <span className="text-xs text-gray-400">{n.date}</span><h3 className="font-bold mt-1">{n.title}</h3><p className="text-sm text-gray-600 mt-2">{n.summary}</p>
        </div>
      ))}
    </div>
  );
}

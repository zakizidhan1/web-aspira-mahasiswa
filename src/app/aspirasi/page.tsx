import { createClient } from "@/lib/supabase/server";
import { Clock, CheckCircle } from "lucide-react";

// For caching, revalidate every 60 seconds
export const revalidate = 60;

export default async function AspirasiPage() {
  const supabase = await createClient();

  const { data: aspirations, error } = await supabase
    .from("aspirations")
    .select(`
      id,
      title,
      content,
      created_at,
      status,
      profiles (full_name, nim)
    `)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Aspirasi Mahasiswa</h1>
        <p className="text-indigo-200">Daftar aspirasi yang telah disetujui dan dipublikasikan.</p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl text-red-200 text-center mb-8">
          Gagal memuat data aspirasi.
        </div>
      )}

      {!aspirations || aspirations.length === 0 ? (
        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
          <Clock className="w-12 h-12 text-indigo-400 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-white mb-2">Belum Ada Aspirasi</h3>
          <p className="text-indigo-200">Belum ada aspirasi yang disetujui untuk ditampilkan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aspirations.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] group-hover:bg-indigo-500/20 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium border border-emerald-500/30">
                  <CheckCircle className="w-3 h-3" />
                  <span>Disetujui</span>
                </span>
              </div>
              
              <p className="text-indigo-100/80 mb-6 line-clamp-4 relative z-10">
                {item.content}
              </p>
              
              <div className="flex items-center justify-between text-sm text-indigo-300/60 pt-4 border-t border-white/10 relative z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-200">
                    {item.profiles?.full_name?.charAt(0) || "M"}
                  </div>
                  <span>{item.profiles?.full_name || "Mahasiswa"}</span>
                </div>
                <span>
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

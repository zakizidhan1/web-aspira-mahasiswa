import { createClient } from "@/lib/supabase/server";
import { Clock, MessageSquare, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: aspirations, error } = await supabase
    .from("aspirations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-3 h-3" />;
      case "rejected":
        return <XCircle className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Aspirasi Saya</h1>
        <p className="text-indigo-200">Kelola dan pantau status aspirasi yang telah Anda sampaikan.</p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl text-red-200">
          Terjadi kesalahan saat memuat data.
        </div>
      )}

      {!aspirations || aspirations.length === 0 ? (
        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
          <MessageSquare className="w-12 h-12 text-indigo-400 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-white mb-2">Belum Ada Aspirasi</h3>
          <p className="text-indigo-200 mb-6">Anda belum pernah mengirimkan aspirasi.</p>
          <Link 
            href="/dashboard/tambah" 
            className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/30"
          >
            <span>Buat Aspirasi Pertama</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {aspirations.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="capitalize">{item.status}</span>
                    </span>
                    <span className="text-xs text-indigo-300/60 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-indigo-100/70 text-sm line-clamp-2">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

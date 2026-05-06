import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Check, X, User, ShieldAlert } from "lucide-react";
import { updateAspirationStatus } from "./actions";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl text-center max-w-md">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Akses Ditolak</h1>
          <p className="text-indigo-200">Anda tidak memiliki hak akses untuk halaman admin.</p>
        </div>
      </div>
    );
  }

  const { data: aspirations } = await supabase
    .from('aspirations')
    .select(`
      *,
      profiles (full_name, nim, email)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Panel Moderasi</h1>
        <p className="text-indigo-200">Tinjau dan kelola aspirasi yang masuk dari mahasiswa.</p>
      </div>

      {!aspirations || aspirations.length === 0 ? (
        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-indigo-300 italic">Tidak ada aspirasi yang perlu dimoderasi saat ini.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {aspirations.map((item) => (
            <div key={item.id} className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-xs text-indigo-300 mb-2">
                    <User className="w-3 h-3" />
                    <span className="font-medium">{item.profiles?.full_name}</span>
                    <span>•</span>
                    <span>{item.profiles?.nim}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-indigo-100/80 text-sm whitespace-pre-wrap">{item.content}</p>
                </div>
                
                <div className="flex md:flex-col gap-2 justify-end">
                  <form action={async () => {
                    'use server'
                    await updateAspirationStatus(item.id, 'approved')
                  }}>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-bold transition-all w-full justify-center">
                      <Check className="w-4 h-4" />
                      <span>Setujui</span>
                    </button>
                  </form>
                  <form action={async () => {
                    'use server'
                    await updateAspirationStatus(item.id, 'rejected')
                  }}>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 rounded-lg text-sm font-bold transition-all w-full justify-center">
                      <X className="w-4 h-4" />
                      <span>Tolak</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

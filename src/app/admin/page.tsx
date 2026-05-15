import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Check, X, User, ShieldAlert } from "lucide-react";
import { updateAspirationStatus } from "./actions";

type Profile = { full_name: string | null; nim: string | null; email: string | null } | null;

function getProfile(profiles: unknown): Profile {
  if (Array.isArray(profiles)) return (profiles[0] as Profile) ?? null;
  return profiles as Profile;
}

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
      <div className="min-h-screen flex items-center justify-center p-4 bg-[url('/images/admin.webp')] bg-no-repeat bg-cover bg-center relative">
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/50" />
        <div className="bg-red-500/50 border border-red-500/20 p-8 rounded-2xl text-center max-w-md relative z-10">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Akses Ditolak</h1>
          <p className="text-yellow-200">Anda tidak memiliki hak akses untuk halaman admin.</p>
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
    <div className="bg-[url('/images/admin.webp')] bg-no-repeat bg-cover bg-center relative">
      <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/50" />
      <main className="max-w-5xl mx-auto px-4 py-12 min-h-screen relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Panel Moderasi</h1>
          <p className="text-yellow-200">Tinjau dan kelola aspirasi yang masuk dari mahasiswa.</p>
        </div>

        {!aspirations || aspirations.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-yellow-300 italic">Tidak ada aspirasi yang perlu dimoderasi saat ini.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {aspirations.map((item) => {
              const itemProfile = getProfile(item.profiles);
              return (
                <div key={item.id} className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 text-xs text-yellow-300 mb-2">
                        <User className="w-3 h-3" />
                        <span className="font-medium">{itemProfile?.full_name}</span>
                        <span>•</span>
                        <span>{itemProfile?.nim}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-yellow-100/80 text-sm whitespace-pre-wrap">{item.content}</p>
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
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

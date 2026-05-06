import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { LogOut } from 'lucide-react'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white tracking-tight">
              Aspirasi<span className="text-indigo-400">UNSIKA</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/aspirasi" className="text-indigo-100 hover:text-white transition-colors text-sm font-medium">
              Semua Aspirasi
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="text-indigo-100 hover:text-white transition-colors text-sm font-medium">
                  Dashboard
                </Link>
                {/* Check if user is admin */}
                {await (async () => {
                  const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();
                  return profile?.role === 'admin';
                })() && (
                  <Link href="/admin" className="text-amber-300 hover:text-amber-200 transition-colors text-sm font-medium">
                    Admin
                  </Link>
                )}
                <form action={async () => {
                  'use server'
                  const supabase = await createClient()
                  await supabase.auth.signOut()
                }}>
                  <button className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all">
                    <LogOut className="w-4 h-4" />
                    <span>Keluar</span>
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-white hover:text-indigo-200 transition-colors">
                  Masuk
                </Link>
                <Link href="/register" className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-all shadow-lg shadow-indigo-500/30">
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LayoutDashboard, PlusCircle, List, LogOut } from 'lucide-react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row max-w-7xl mx-auto w-full">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 md:border-r border-white/10 p-4 space-y-2">
        <div className="mb-8 px-4 hidden md:block">
          <h2 className="text-lg font-semibold text-white">Dashboard</h2>
          <p className="text-xs text-indigo-300 truncate">{user.email}</p>
        </div>

        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          <Link 
            href="/dashboard" 
            className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            <LayoutDashboard className="w-5 h-5 text-indigo-400" />
            <span className="font-medium">Overview</span>
          </Link>
          
          <Link 
            href="/dashboard/tambah" 
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-indigo-200 hover:bg-white/5 hover:text-white transition-colors whitespace-nowrap"
          >
            <PlusCircle className="w-5 h-5 text-indigo-400" />
            <span className="font-medium">Tulis Aspirasi</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

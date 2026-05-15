import Link from 'next/link'
import { signup } from './actions'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const { message } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/login.webp')] bg-no-repeat bg-cover bg-center relative  px-4">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Daftar Akun</h1>
          <p className="text-yellow-200">Sistem Aspirasi Mahasiswa UNSIKA</p>
        </div>

        <form action={signup} className="space-y-6 flex flex-col w-full justify-center">
          <div>
            <label className="block text-sm font-medium text-yellow-100 mb-1" htmlFor="full_name">
              Nama Lengkap
            </label>
            <input
              className="w-full px-4 py-3 bg-white/5 border border-yellow-300/30 rounded-xl text-white placeholder-yellow-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              name="full_name"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-100 mb-1" htmlFor="nim">
              NIM
            </label>
            <input
              className="w-full px-4 py-3 bg-white/5 border border-yellow-300/30 rounded-xl text-white placeholder-yellow-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              name="nim"
              placeholder="Masukkan NIM"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-100 mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-3 bg-white/5 border border-yellow-300/30 rounded-xl text-white placeholder-yellow-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              name="email"
              placeholder="nama@student.unsika.ac.id"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-100 mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-3 bg-white/5 border border-yellow-300/30 rounded-xl text-white placeholder-yellow-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-yellow-500/30">
            Daftar Sekarang
          </button>

          {message && (
            <p className="mt-4 p-4 bg-red-500/20 border border-red-500/50 text-red-200 text-center rounded-xl text-sm">
              {message}
            </p>
          )}

          <p className="text-center text-yellow-200 text-sm mt-6">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-white hover:text-yellow-300 font-medium transition-colors">
              Masuk di sini
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

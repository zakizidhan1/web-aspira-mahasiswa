import Link from "next/link";
import { ArrowRight, MessageSquarePlus, ShieldCheck, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-[url('/images/aspirasi.png')] bg-no-repeat bg-cover bg-center py-20 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/50" />

      {/* <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-black/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/20 rounded-full blur-[120px] pointer-events-none"></div> */}

      <div className="max-w-4xl z-10 space-y-8">
        <div className="inline-flex items-center space-x-2 bg-red-700 border border-white/10 px-4 py-2 rounded-full text-yellow-300 text-sm font-medium mb-4">
          <span className="flex h-2 w-2 rounded-full bg-yellow-500"></span>
          <span>Sistem Informasi UNSIKA</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200">
          Suara Anda,<br />Masa Depan Kampus
        </h1>

        <p className="text-lg md:text-xl text-yellow-200 max-w-2xl mx-auto leading-relaxed">
          Platform resmi untuk menyampaikan aspirasi, kritik, dan saran bagi seluruh mahasiswa Universas Singaperbangsa Karawang.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 group"
          >
            <span>Mulai Suarakan</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/aspirasi"
            className="w-full sm:w-auto px-8 py-4 bg-red-700 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all flex items-center justify-center space-x-2"
          >
            <span>Lihat Aspirasi</span>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-24 z-10">
        <div className="bg-black border border-white/10 rounded-2xl p-6 text-left hover:bg-black/50 transition-colors">
          <div className="bg-yellow-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <MessageSquarePlus className="w-6 h-6 text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Mudah & Cepat</h3>
          <p className="text-yellow-200/80 text-sm">Sampaikan aspirasi Anda dalam hitungan detik dengan antarmuka yang modern dan responsif.</p>
        </div>
        <div className="bg-black border border-white/10 rounded-2xl p-6 text-left hover:bg-black/50 transition-colors">
          <div className="bg-red-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-black-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Transparan</h3>
          <p className="text-yellow-200/80 text-sm">Pantau status aspirasi Anda dan lihat aspirasi lain yang telah disetujui secara publik.</p>
        </div>
        <div className="bg-black border border-white/10 rounded-2xl p-6 text-left hover:bg-black/50 transition-colors">
          <div className="bg-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Untuk Mahasiswa</h3>
          <p className="text-yellow-200/80 text-sm">Dibuat khusus untuk memfasilitasi komunikasi antara mahasiswa dan pihak kampus UNSIKA.</p>
        </div>
      </div>
    </main>
  );
}

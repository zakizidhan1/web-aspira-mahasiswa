'use client'

import { useState } from "react";
import { Send, AlertCircle } from "lucide-react";
import { submitAspiration } from "./actions";
import toast from "react-hot-toast";

export default function TambahAspirasiPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    
    const result = await submitAspiration(formData);
    
    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("Aspirasi berhasil terkirim!");
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tulis Aspirasi</h1>
        <p className="text-indigo-200">Sampaikan aspirasi, kritik, atau saran Anda secara konstruktif.</p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-indigo-100 mb-2" htmlFor="title">
              Judul Aspirasi
            </label>
            <input
              className="w-full px-4 py-3 bg-white/5 border border-indigo-300/30 rounded-xl text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              name="title"
              id="title"
              placeholder="Contoh: Perbaikan Fasilitas Perpustakaan"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-100 mb-2" htmlFor="content">
              Isi Aspirasi
            </label>
            <textarea
              className="w-full px-4 py-3 bg-white/5 border border-indigo-300/30 rounded-xl text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all min-h-[200px]"
              name="content"
              id="content"
              placeholder="Deskripsikan aspirasi Anda secara detail..."
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-500/50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Mengirim...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Kirim Aspirasi</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
        <h4 className="text-sm font-semibold text-indigo-300 mb-2 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4" />
          <span>Informasi Penting</span>
        </h4>
        <ul className="text-xs text-indigo-200/70 space-y-1 list-disc list-inside">
          <li>Setiap aspirasi akan melalui proses moderasi terlebih dahulu.</li>
          <li>Gunakan bahasa yang sopan dan tidak mengandung unsur SARA.</li>
          <li>Aspirasi yang disetujui akan muncul di halaman publik.</li>
        </ul>
      </div>
    </div>
  );
}

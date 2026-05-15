'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogOut, Menu, X } from 'lucide-react'
import { signOut } from '@/app/auth/actions'
import Image from 'next/image'

interface NavbarClientProps {
  isLoggedIn: boolean
  isAdmin: boolean
}

export default function NavbarClient({ isLoggedIn, isAdmin }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-red-700 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white tracking-tight flex justify-center items-center gap-2" onClick={closeMenu}>
            <Image className='w-[30px]' src="/images/logo.png" alt="logo" width={100} height={100}/>Aspirasi<span className="text-yellow-400">UNSIKA</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/aspirasi"
              className="text-yellow-100 hover:text-white transition-colors text-sm font-medium"
            >
              Semua Aspirasi
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-yellow-100 hover:text-white transition-colors text-sm font-medium"
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-amber-300 hover:text-amber-200 transition-colors text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}
                <form action={signOut}>
                  <button
                    type="submit"
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar</span>
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-white hover:text-yellow-200 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium transition-all shadow-lg shadow-yellow-500/30"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Button (mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-2 border-t border-white/10 bg-slate-950/80 backdrop-blur-lg">
          <Link
            href="/aspirasi"
            onClick={closeMenu}
            className="block px-4 py-3 rounded-lg text-yellow-100 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
          >
            Semua Aspirasi
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className="block px-4 py-3 rounded-lg text-yellow-100 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
              >
                Dashboard
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className="block px-4 py-3 rounded-lg text-amber-300 hover:text-amber-200 hover:bg-white/10 transition-all text-sm font-medium"
                >
                  Admin
                </Link>
              )}
              <form action={signOut}>
                <button
                  type="submit"
                  onClick={closeMenu}
                  className="flex items-center space-x-2 w-full px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={closeMenu}
                className="block px-4 py-3 rounded-lg text-yellow-100 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                onClick={closeMenu}
                className="block px-4 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium transition-all text-center shadow-lg shadow-yellow-500/30"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

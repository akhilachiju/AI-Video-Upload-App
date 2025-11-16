"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, LogOut, Upload, Video, Menu, X } from "lucide-react";
import { useNotification } from "./Notification";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 text-white font-bold text-xl hover:text-purple-400 transition-colors group"
          >
            <div className="p-2 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl group-hover:scale-110 transition-transform">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:block">ReelsPro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            
            {session && (
              <Link
                href="/upload"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Upload className="w-4 h-4" />
                Upload
              </Link>
            )}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center">
            {session ? (
              <div className="relative group">
                <button className="flex items-center gap-3 hover:bg-white/10 transition-all duration-300 px-4 py-2 rounded-xl">
                  <div className="w-8 h-8 bg-linear-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-300">{session.user?.email?.split("@")[0]}</span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2">
                    <Link
                      href="/upload"
                      className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Video
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden hover:bg-white/10 transition-all duration-300 p-2 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              
              {session ? (
                <>
                  <Link
                    href="/upload"
                    className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Upload className="w-4 h-4" />
                    Upload Video
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mx-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, LogOut, Upload } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          prefetch={true}
          className="flex items-center gap-2 text-gray-200 font-bold text-lg sm:text-xl hover:text-white transition"
          onClick={() => showNotification("Welcome to ImageKit ReelsPro", "info")}
        >
          <Home className="w-5 h-5 text-gray-300" />
          Video with AI
        </Link>

        {/* Right Section */}
        <div className="flex items-center">
          {session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition"
              >
                <User className="w-5 h-5 text-gray-200" />
              </div>

              {/* Dropdown for logged-in user */}
              <ul className="dropdown-content mt-3 w-64 p-3 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl text-gray-200 z-60">
                <li className="px-3 py-2 opacity-70 text-sm flex items-center gap-2">
                  <User size={16} />
                  {session.user?.email?.split("@")[0]}
                </li>

                <div className="border-t border-white/10 my-2"></div>

                <li>
                  <Link
                    href="/upload"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition"
                  >
                    <Upload size={18} />
                    Video Upload
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-white/10 transition"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // Not logged in: just a user icon linking to /login
            <Link
              href="/login"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition"
              onClick={() => showNotification("Please sign in to continue", "info")}
            >
              <User className="w-5 h-5 text-gray-200" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMsg(result.error);
      } else {
        setSuccessMsg("Login successful!");
        setTimeout(() => router.push("/dashboard"), 1500);
      }
    } catch (error: unknown) {
      setErrorMsg(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="
          relative w-full max-w-md
          p-8
          rounded-3xl
          bg-white/10 backdrop-blur-md
          border border-white/20
          shadow-lg
          ring-1 ring-white/10
        "
      >
        <h2 className="text-2xl sm:text-3xl text-center font-bold text-gray-200 mb-6">
          Login
        </h2>

        {/* Email */}
        <div className="mb-5 relative">
          <label className="block text-sm text-gray-400">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="
              mt-1 w-full px-3 py-2 rounded-lg
              bg-black/30 placeholder:text-gray-500 text-gray-200
              border border-gray-700/50
              focus:outline-none focus:ring-2 focus:ring-gray-500
            "
          />
          {errorMsg && (
            <p className="text-xs text-red-500 mt-1 text-right">{errorMsg}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-sm text-gray-400">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="
                mt-1 w-full px-3 py-2 pr-10 rounded-lg
                bg-black/30 placeholder:text-gray-500 text-gray-200
                border border-gray-700/50
                focus:outline-none focus:ring-2 focus:ring-gray-500
              "
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-3 rounded-lg text-sm font-medium transition
            ${loading ? "bg-gray-700 text-gray-300 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700 text-white"}
          `}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <div className="mt-5 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-gray-200 font-medium underline underline-offset-2">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

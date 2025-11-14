"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirm?: string }>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");

    let hasError = false;

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      hasError = true;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      hasError = true;
    }
    if (password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirm: "Passwords do not match" }));
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data?.error.includes("email")) {
          setErrors((prev) => ({ ...prev, email: data.error }));
        } else {
          setErrors((prev) => ({ ...prev, password: data.error }));
        }
        return;
      }

      setSuccessMsg("Registered successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: unknown) {
      setErrors((prev) => ({
        ...prev,
        password: error instanceof Error ? error.message : "Something went wrong",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-slide-in">
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
          Register Now
        </h2>

        {/* Email */}
        <div className="mb-5 relative">
          <label className="block text-sm text-gray-400">Email</label>
          <input
            type="email"
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
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 text-right">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5 relative">
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
          {errors.password && (
            <p className="text-xs text-red-500 mt-1 text-right">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6 relative">
          <label className="block text-sm text-gray-400">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirm && (
            <p className="text-xs text-red-500 mt-1 text-right">{errors.confirm}</p>
          )}
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
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Footer */}
        <div className="mt-5 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-gray-200 font-medium underline underline-offset-2">
            Login
          </Link>
        </div>

        <p className="mt-4 text-xs text-gray-500 text-center">
          By creating an account, you agree to our Terms & Privacy.
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;

'use client';

import { useAuth } from '@/src/presentation/hooks/useAuth';
import { AuthService } from '@/src/presentation/services/auth.service';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/src/presentation/context/LanguageContext';

export default function Page() {
  const { t } = useTranslation(); // Use the translation hook
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currUser) {
      router.push('/');
    }
  }, [currUser, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = isLogin
        ? await AuthService.loginWithEmail(email, password)
        : await AuthService.signUpWithEmail(email, password);

      if (!user) throw new Error("No user returned");

      if (isLogin) {
        router.push('/');
      } else {
        setIsLogin(true);
      }
    } catch (e) {
      console.error('auth', e);
      setError(t.auth.error); // Use translated error message
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await AuthService.loginWithGoogle();
      if (user) router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          {isLogin ? t.auth.login : t.auth.signUp}
        </h2>

        {error && (
          <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder={t.auth.email}
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t.auth.password}
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? t.auth.processing : (isLogin ? t.auth.login : t.auth.signUp)}
          </button>
        </form>

        <div className="my-6 flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="px-3 text-xs uppercase text-gray-400">{t.auth.or}</span>
          <hr className="w-full border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 transition hover:bg-gray-50 text-gray-700"
        >
          <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width={20} height={20} alt="Google" />
          {t.auth.google}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? t.auth.noAccount : t.auth.hasAccount}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-blue-600 hover:underline"
          >
            {isLogin ? t.auth.signUp : t.auth.login}
          </button>
        </p>
      </div>
    </div>
  );
}
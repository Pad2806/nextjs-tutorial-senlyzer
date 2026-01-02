'use client';

import { useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [message, setMessage] = useState<string | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Vui lòng kiểm tra email để xác nhận tài khoản!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/dashboard'); // Redirect to dashboard after login
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          // Force scopes to ensure we get email
          scopes: provider === 'facebook' ? 'public_profile,email' : undefined,
        },
      });
      if (error) throw error;
    } catch (err: any) {
        console.error('OAuth Error:', err);
        setError(err.message);
        setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl border border-gray-100">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          {mode === 'signin' ? 'Đăng nhập vào Pancake' : 'Đăng ký tài khoản mới'}
        </h2>
        <p className="text-sm text-gray-500">
          {mode === 'signin' 
            ? 'Chào mừng bạn quay trở lại!' 
            : 'Bắt đầu quản lý bán hàng chuyên nghiệp ngay hôm nay'}
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {message && (
        <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg">
          {message}
        </div>
      )}

      <form onSubmit={handleEmailAuth} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="example@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        <Button 
            disabled={isLoading} 
            type="submit" 
            className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-2.5"
        >
          {isLoading ? <Loader2 className="animate-spin mx-auto w-5 h-5" /> : (mode === 'signin' ? 'Đăng nhập' : 'Đăng ký')}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Hoặc tiếp tục với</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handleOAuth('google')}
          disabled={isLoading}
          className="flex items-center justify-center py-2.5 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
            />
            <path
              fill="#EA4335"
              d="M12 4.61c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuth('facebook')}
          disabled={isLoading}
          className="flex items-center justify-center py-2.5 px-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#1864D9] transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 2.848-6.304 6.162-6.304 1.587 0 3.251.278 3.251.278l-.007 2.887h-2.296c-2.007 0-2.633.918-2.633 2.162v2.553h3.812l-.503 3.667h-3.309v7.985A11.966 11.966 0 0 0 24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 6.012 4.432 10.999 9.101 11.691Z" />
          </svg>
          Facebook
        </button>
      </div>

      <div className="text-center text-sm">
        <span className="text-gray-500">
          {mode === 'signin' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
        </span>
        <button
          type="button"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="font-medium text-primary hover:text-blue-700 hover:underline"
        >
          {mode === 'signin' ? 'Đăng ký ngay' : 'Đăng nhập'}
        </button>
      </div>
    </div>
  );
}

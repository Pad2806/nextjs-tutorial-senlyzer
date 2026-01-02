import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">Pancake POS</h1>
        </Link>
      </div>
      <LoginForm />
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Pancake POS Clone. All rights reserved.</p>
      </div>
    </div>
  );
}

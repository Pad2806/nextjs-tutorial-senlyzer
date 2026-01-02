'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="mb-4">Welcome, <span className="font-semibold text-primary">{user?.email}</span>!</p>
        
        <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Authenticated User Data:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                {JSON.stringify(user, null, 2)}
            </pre>
        </div>

        <Button onClick={handleLogout} variant="outline">
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';

export default function ConnectionTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function checkConnection() {
      try {
        // Try to select from a table that should exist. 
        // Even if empty, it shouldn't throw a 404/500 if connection is good.
        // Selecting 'count' is cheap.
        const { count, error } = await supabase.from('shops').select('*', { count: 'exact', head: true });
        
        if (error) {
          throw error;
        }
        
        setStatus('success');
      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err.message || 'Unknown error');
      }
    }

    checkConnection();
  }, []);

  if (status === 'loading') return <div className="p-4 text-blue-500">Checking Supabase connection...</div>;
  if (status === 'error') return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
      <h3 className="text-red-700 font-bold">Connection Failed</h3>
      <p className="text-red-600">{errorMessage}</p>
      <p className="mt-2 text-sm text-gray-600">
        Tip: Ensure you have run the SQL schema in the Supabase Dashboard and your .env credentials are correct.
      </p>
    </div>
  );

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
      <h3 className="text-green-700 font-bold">Supabase Connected Successfully!</h3>
      <p className="text-green-600">You can now fetch data from your 'shops' table.</p>
    </div>
  );
}

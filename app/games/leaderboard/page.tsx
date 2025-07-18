'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type LeaderboardEntry = {
  nama: string;
  poin: number;
};

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('leaderboard') || '[]');
      if (Array.isArray(stored)) {
        const filtered = stored.filter(
          (item): item is LeaderboardEntry =>
            typeof item.nama === 'string' && typeof item.poin === 'number'
        );
        const sorted = filtered.sort((a, b) => b.poin - a.poin);
        setData(sorted);
      }
    } catch (err) {
      console.error('Gagal memuat data leaderboard:', err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-4">
      <h1 className="text-2xl font-bold text-center mb-4">🏆 Peringkat Umum</h1>

      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-4">
        {data.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada data.</p>
        ) : (
          <ol className="space-y-2">
            {data.map((item, i) => (
              <li key={i} className="flex justify-between border-b pb-1">
                <span className="font-semibold">
                  {i + 1}. {item.nama}
                </span>
                <span className="text-blue-700">{item.poin} poin</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="text-center mt-6">
        <Link href="/games">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            ← Kembali ke Game
          </button>
        </Link>
      </div>
    </div>
  );
}

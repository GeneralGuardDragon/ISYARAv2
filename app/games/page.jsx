'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const daftarGame = [
  {
    title: 'Tebak Alfabet',
    image: '/img/alfabet.jpg',
    path: '/games/alfabet',
  },
  {
    title: 'Kata Sapaan',
    image: '/img/kata-sapaan.jpg',
    path: '/games/kata-sapaan',
  },
  {
    title: 'Perkenalan',
    image: '/img/perkenalan.jpg',
    path: '/games/perkenalan',
  },
  {
    title: 'Hewan',
    image: '/img/hewan.jpg',
    path: '/games/binatang',
  },
  {
    title: 'Angka',
    image: '/img/angka.jpg',
    path: '/games/angka',
  },
  {
    title: 'Kata Sehari-hari',
    image: '/img/kata-sehari.jpg',
    path: '/games/sehari-hari',
  },
];

export default function GamesPage() {
  const router = useRouter();
  const [totalPoin, setTotalPoin] = useState(0);

  useEffect(() => {
    const poin = parseInt(localStorage.getItem('totalPoin') || '0');
    setTotalPoin(poin);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-white p-4 pb-24 text-gray-800">
      {/* Header */}
       <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            ← Kembali ke Beranda
        </Link>
      <div className="flex items-center justify-between mb-4">
        {/* Tombol kembali */}
        
      <div className="mt-6 text-center">

      </div>
        <h1 className="text-xl font-bold">Games</h1>
        

        <div className="text-sm bg-white rounded-full px-4 py-1 shadow font-bold">
          Poin : <span className="text-black">{totalPoin}</span>
        </div>

      </div >
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (confirm('Yakin ingin mereset semua skor?')) {
                localStorage.setItem('totalPoin', '0');
                localStorage.setItem('leaderboard', '[]');
                setTotalPoin(0);
              }
            }}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            🔁 Reset Skor
          </button>
        </div>

      <h2 className="text-md font-semibold text-gray-800 mb-2">Kategori Game</h2>

      {/* Grid Game Cards */}
      <div className="grid grid-cols-2 gap-4">
        {daftarGame.map((game, i) => (
          <button
            key={i}
            onClick={() => router.push(game.path)}
            className="bg-white p-2 rounded-xl shadow hover:shadow-lg transition-all flex flex-col items-center"
          >
            <Image
              src={game.image}
              alt={game.title}
              width={100}
              height={100}
              className="rounded-md"
            />
            <p className="text-center text-sm font-semibold mt-2 text-black">{game.title}</p>
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
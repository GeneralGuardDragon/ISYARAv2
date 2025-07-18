'use client';

import React from 'react';
import Link from 'next/link';

export default function StudyPage() {
  const studyItems = [
    { title: 'Alfabet', image: '/img/alfabet.jpg', link: '/study/alfabet' },
    { title: 'Kata Sapaan', image: '/img/kata-sapaan.jpg', link: '/study/kata-sapaan' },
    { title: 'Perkenalan', image: '/img/perkenalan.jpg', link: '/study/perkenalan' },
    { title: 'Hewan', image: '/img/hewan.jpg', link: '/study/hewan' },
    { title: 'Angka', image: '/img/angka.jpg', link: '/study/angka' },
    { title: 'Kata Sehari-hari', image: '/img/kata-sehari.jpg', link: '/study/kata-sehari' },
  ];

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Materi Study</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {studyItems.map((item, index) => (
          <Link key={index} href={item.link}>
            <div className="rounded-xl shadow-lg bg-white p-4 hover:scale-105 transition cursor-pointer">
              <img src={item.image} alt={item.title} className="w-full h-32 object-contain mb-2" />
              <p className="text-center font-medium">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link href="/">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            ← Kembali ke Beranda
          </button>
        </Link>
      </div>
    </div>
  );
}

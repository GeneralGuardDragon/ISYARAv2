'use client';

import Link from 'next/link';

const sapaanList = [
  'Halo',
  'Apa kabar',
  'Selamat Pagi',
  'Selamat Siang',
  'Selamat Sore',
  'Selamat Malam',
  'Selamat Datang',
  'Selamat Jalan',
  'Selamat Tinggal',
];

export default function KataSapaanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <Link href="/study" className="text-lg font-bold mb-4 inline-block">← Kembali</Link>
      <h1 className="text-2xl font-bold text-center mb-6">Kata Sapaan</h1>

      <div className="flex flex-col gap-4 items-center">
        {sapaanList.map((sapaan, index) => {
          const link = `/study/kata-sapaan/${encodeURIComponent(sapaan.toLowerCase().replace(/\s/g, '-'))}`;
          return (
            <Link href={link} key={index}>
              <button className="bg-white w-64 py-2 px-4 rounded-full shadow hover:bg-blue-200 transition text-lg">
                {sapaan}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
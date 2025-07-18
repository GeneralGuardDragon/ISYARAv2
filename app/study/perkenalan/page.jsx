'use client';

import Link from 'next/link';

const kalimatList = [
  'Nama kamu siapa?',
  'Kamu dari mana?',
  'Perkenalkan nama aku',
  'Saya berasal dari',
  'Salam kenal',
  'Senang bertemu denganmu',
  'Boleh kita berteman?',
];

export default function PerkenalanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <Link href="/study" className="text-lg font-bold mb-4 inline-block">← Kembali</Link>
      <h1 className="text-2xl font-bold text-center mb-6">Perkenalan</h1>

      <div className="flex flex-col gap-4 items-center">
        {kalimatList.map((kalimat, index) => {
          const link = `/study/perkenalan/${encodeURIComponent(kalimat.toLowerCase().replace(/\s/g, '-').replace(/\?/g, ''))}`;
          return (
            <Link href={link} key={index}>
              <button className="bg-white w-72 py-2 px-4 rounded-full shadow hover:bg-blue-200 transition text-center text-lg">
                {kalimat}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

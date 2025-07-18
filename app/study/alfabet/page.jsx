'use client';

import Link from 'next/link';

const letters = [
  'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z'
];

export default function AlfabetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <Link href="/study" className="text-lg font-bold mb-4 inline-block">← Kembali</Link>
      <h1 className="text-2xl font-bold text-center mb-6">Alfabet</h1>
      
      <div className="grid grid-cols-4 gap-4 md:grid-cols-6">
        {letters.map(letter => (
          <Link href={`/study/alfabet/${letter}`} key={letter}>
            <div className="bg-white rounded-lg shadow p-2 flex flex-col items-center hover:scale-105 transition cursor-pointer">
              <img src={`/img/alfabet/${letter}.png`} alt={letter} className="w-16 h-16 object-contain" />
              <p className="text-center mt-2 font-semibold">{letter}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

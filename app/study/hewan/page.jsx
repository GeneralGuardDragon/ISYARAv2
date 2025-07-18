'use client';

import Link from 'next/link';

const hewanList = [
  'Ayam', 'Angsa', 'Anjing', 'Bebek', 'Buaya', 'Burung', 'Cicak', 'Cacing',
  'Domba', 'Gajah', 'Gurita', 'Harimau', 'Ikan', 'Kambing', 'Katak', 'Kupu-kupu',
  'Monyet', 'Sapi', 'Singa', 'Ular', 'Ulat', 'Zebra', 'Kelinci',
];

export default function HewanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <Link href="/study" className="text-lg font-bold mb-4 inline-block">← Kembali</Link>
      <h1 className="text-2xl font-bold text-center mb-6">Hewan</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {hewanList.map((hewan, index) => (
          <Link key={index} href={`/study/hewan/${hewan.toLowerCase()}`}>
            <div className="bg-white shadow rounded-lg p-2 hover:scale-105 transition cursor-pointer text-center">
              <img
                src={`/img/hewan/${hewan.toLowerCase()}.jpg`}
                alt={hewan}
                className="w-full h-24 object-contain mb-1"
              />
              <p className="text-lg font-medium capitalize">{hewan}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
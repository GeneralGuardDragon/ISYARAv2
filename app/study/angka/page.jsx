'use client';

import Link from 'next/link';

// Mulai dari angka 1 hingga 10
const angkaList = Array.from({ length: 10 }, (_, i) => i + 1);

export default function AngkaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <Link href="/study" className="text-lg font-bold mb-4 inline-block">← Kembali</Link>
      <h1 className="text-2xl font-bold text-center mb-6">Angka</h1>

      <div className="grid grid-cols-3 gap-4">
        {angkaList.map((angka) => (
          <Link key={angka} href={`/study/angka/${angka}`}>
            <div className="bg-white shadow rounded-lg p-2 hover:scale-105 transition cursor-pointer text-center">
              <img
                src={`/img/angka/${angka}.png`}
                alt={`Angka ${angka}`}
                className="w-full h-24 object-contain mb-1"
              />
              <p className="text-lg font-medium">{angka}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
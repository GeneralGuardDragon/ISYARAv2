'use client';

import Link from 'next/link';

const kataList = [
  'Terima Kasih',
  'Tolong',
  'Sama-sama',
  'Maaf',
  'Ya',
  'Tidak',
  'Mau',
  'Tidak Mau',
  'Suka',
];

export default function KataSehariPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <Link href="/study" className="text-lg font-bold mb-4 inline-block">← Kembali</Link>
      <h1 className="text-2xl font-bold text-center mb-6">Kata Sehari-hari</h1>

      <div className="flex justify-center">
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {kataList.map((kata, index) => (
            <Link
              key={index}
              href={`/study/kata-sehari/${encodeURIComponent(kata.toLowerCase().replace(/\s+/g, '-'))}`}
            >
              <button className="bg-white rounded-lg shadow p-3 text-center font-medium hover:bg-blue-100 transition w-full">
                {kata}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

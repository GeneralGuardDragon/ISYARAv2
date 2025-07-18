'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AngkaCover() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6 flex flex-col justify-between relative">
      {/* Tombol kembali */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-sm bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 font-semibold shadow"
      >
        ← Kembali
      </button>

      <div className="flex flex-col items-center text-center mt-10">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Angka</h1>

        <Image
          src="/img/angka.jpg"
          alt="Angka BISINDO"
          width={200}
          height={200}
          className="rounded-xl mb-4"
        />

        <p className="mb-4 text-gray-700 font-medium">
          Tebak angka dari isyarat BISINDO. Siap belajar?
        </p>

        <button
          onClick={() => router.push('/games/angka/quiz')}
          className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-blue-600"
        >
          Mulai Sekarang
        </button>
      </div>

      <div className="h-16"></div>
    </div>
  );
}
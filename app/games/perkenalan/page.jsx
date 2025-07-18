'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PerkenalanCover() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white p-6 flex flex-col justify-between relative">
      {/* Tombol kembali */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-sm bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 font-semibold shadow"
      >
        ← Kembali
      </button>

      <div className="flex flex-col items-center text-center mt-10">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Perkenalan</h1>

        <Image
          src="/img/perkenalan.jpg"
          alt="Perkenalan BISINDO"
          width={200}
          height={200}
          className="rounded-xl mb-4"
        />

        <p className="mb-4 text-gray-700 font-medium">
          Belajar mengenalkan diri dalam BISINDO. Yuk mulai!
        </p>

        <button
          onClick={() => router.push('/games/sehari-hari/quiz')}
          className="bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-green-600"
        >
          Mulai Sekarang
        </button>
      </div>

      <div className="h-16"></div>
    </div>
  );
}
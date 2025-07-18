'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Daftar soal perkenalan
const soalPerkenalan = [
  { kata: 'Nama kamu siapa?', video: '/video/perkenalan/nama_kamu_siapa.mp4' },
  { kata: 'Kamu dari mana?', video: '/video/perkenalan/kamu_dari_mana.mp4' },
  { kata: 'Perkenalkan nama aku', video: '/video/perkenalan/perkenalkan_nama_aku.mp4' },
  { kata: 'Saya berasal dari', video: '/video/perkenalan/saya_berasal_dari.mp4' },
  { kata: 'Salam kenal', video: '/video/perkenalan/salam_kenal.mp4' },
  { kata: 'Senang bertemu denganmu', video: '/video/perkenalan/senang_bertemu_denganmu.mp4' },
  { kata: 'Boleh kita berteman?', video: '/video/perkenalan/boleh_kita_berteman.mp4' },
];

// Acak array
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Acak pilihan ganda
function acakPilihan(jawaban, semua) {
  const pilihan = new Set([jawaban]);
  while (pilihan.size < 3) {
    const random = semua[Math.floor(Math.random() * semua.length)].kata;
    pilihan.add(random);
  }
  return Array.from(pilihan).sort(() => Math.random() - 0.5);
}

export default function GamePerkenalanPage() {
  const [soalList, setSoalList] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [pilihan, setPilihan] = useState([]);

  // Inisialisasi soal saat halaman dimuat
  useEffect(() => {
    const shuffled = shuffleArray(soalPerkenalan);
    setSoalList(shuffled);
  }, []);

  // Update pilihan ketika current berubah
  useEffect(() => {
    if (
      soalList.length === 0 ||
      current === -1 ||
      current >= soalList.length ||
      !soalList[current]
    ) {
      return;
    }

    const soal = soalList[current];
    const opsi = acakPilihan(soal.kata, soalPerkenalan);
    setPilihan(opsi);
    setSelected(null);
    setShowResult(false);
  }, [current, soalList]);

  // Simpan total poin jika selesai
  useEffect(() => {
    if (current === -1) {
      const bonus = score === soalPerkenalan.length * 10 ? 20 : 0;
      const total = score + bonus;
      const existing = parseInt(localStorage.getItem('totalPoin') || '0');
      localStorage.setItem('totalPoin', existing + total);
    }
  }, [current]);

  const handleJawab = (pil) => {
    if (selected !== null) return;
    setSelected(pil);
    setShowResult(true);
    if (pil === soalList[current].kata) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    if (current + 1 < soalList.length) {
      setCurrent(current + 1);
    } else {
      setCurrent(-1); // Selesai
    }
  };

  if (current === -1) {
    const bonus = score === soalPerkenalan.length * 10 ? 20 : 0;
    const total = score + bonus;

    return (
      <div className="p-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-700">🎉 Selesai!</h1>
        <p className="text-lg">Skor: {score} + Bonus: {bonus}</p>
        <p className="text-xl font-semibold">Total: {total} poin</p>
        <Link href="/games" className="inline-block mt-4 text-blue-600 underline">
          ← Kembali ke Pilihan Game
        </Link>
      </div>
    );
  }

  if (soalList.length === 0 || !soalList[current]) {
    return <p className="text-center p-4">Memuat soal...</p>;
  }

  const soal = soalList[current];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-center">Game Perkenalan</h1>
      <p className="text-center">Soal ke {current + 1} dari {soalList.length}</p>

      <div className="bg-white shadow rounded-lg p-4 text-center">
        <video
          src={soal.video}
          autoPlay
          controls
          muted
          className="w-full max-w-sm mx-auto rounded-md shadow"
        />
        <p className="mt-2 font-semibold">Apa arti dari isyarat ini?</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pilihan.map((pil) => (
          <button
            key={pil}
            onClick={() => handleJawab(pil)}
            className={`p-2 rounded-lg font-bold transition ${
              selected === pil
                ? pil === soal.kata
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-blue-100 hover:bg-blue-200'
            }`}
          >
            {pil}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="text-center">
          <p className="text-lg">
            {selected === soal.kata ? '✅ Benar!' : `❌ Salah, jawaban: ${soal.kata}`}
          </p>
          <button onClick={handleNext} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            Next
          </button>
        </div>
      )}
    </div>
  );
}
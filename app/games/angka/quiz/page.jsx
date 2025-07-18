'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const soalAngka = Array.from({ length: 10 }, (_, i) => {
  const angka = i + 1;
  return {
    angka,
    video: `/video/angka/${angka}.mp4`,
  };
});

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function acakPilihan(jawaban, semua) {
  const pilihan = new Set([jawaban]);
  while (pilihan.size < 3) {
    const random = semua[Math.floor(Math.random() * semua.length)].angka;
    pilihan.add(random);
  }
  return Array.from(pilihan).sort(() => Math.random() - 0.5);
}

export default function GameAngkaPage() {
  const [soalList, setSoalList] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [pilihan, setPilihan] = useState([]);

  useEffect(() => {
    const shuffled = shuffleArray(soalAngka);
    setSoalList(shuffled);
  }, []);

  useEffect(() => {
    if (soalList.length === 0 || current >= soalList.length) return;

    const soal = soalList[current];
    if (!soal) return;

    const opsi = acakPilihan(soal.angka, soalAngka);
    setPilihan(opsi);
    setSelected(null);
    setShowResult(false);
  }, [current, soalList]);

  const handleJawab = (pil) => {
    if (selected !== null) return;
    setSelected(pil);
    setShowResult(true);
    if (pil === soalList[current].angka) {
      setScore((s) => s + 10);
    }
  };

  const handleNext = () => {
    if (current + 1 < soalList.length) {
      setCurrent((c) => c + 1);
    } else {
      setCurrent(-1); // selesai
    }
  };

  useEffect(() => {
    if (current === -1) {
      const bonus = score === soalAngka.length * 10 ? 20 : 0;
      const total = score + bonus;

      // ✅ Tambahkan ke total poin
      const existing = parseInt(localStorage.getItem('totalPoin') || '0');
      localStorage.setItem('totalPoin', existing + total);

      // ✅ Ambil username dari profil
      const nama = localStorage.getItem('username') || 'Guest';

      // ✅ Simpan ke leaderboard
      let leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
      const existingIndex = leaderboard.findIndex((item) => item.nama === nama);

      if (existingIndex !== -1) {
        if (leaderboard[existingIndex].poin < total) {
          leaderboard[existingIndex].poin = total;
        }
      } else {
        leaderboard.push({ nama, poin: total });
      }

      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }
  }, [current]);

  if (current === -1) {
    const bonus = score === soalAngka.length * 10 ? 20 : 0;
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

  if (soalList.length === 0) return <p className="text-center p-4">Memuat soal...</p>;

  const soal = soalList[current];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-center">Game Angka (Video)</h1>
      <p className="text-center">Soal ke {current + 1} dari {soalList.length}</p>

      <div className="bg-white shadow rounded-lg p-4 text-center">
        <video
          src={soal.video}
          autoPlay
          controls
          muted
          className="w-full max-w-sm mx-auto rounded-md shadow"
        />
        <p className="mt-2 font-semibold">Angka berapa ini?</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {pilihan.map((pil) => (
          <button
            key={pil}
            onClick={() => handleJawab(pil)}
            className={`p-2 rounded-lg font-bold transition ${
              selected === pil
                ? pil === soal.angka
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
            {selected === soal.angka ? '✅ Benar!' : `❌ Salah, jawaban: ${soal.angka}`}
          </p>
          <button onClick={handleNext} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            Next
          </button>
        </div>
      )}
    </div>
  );
}

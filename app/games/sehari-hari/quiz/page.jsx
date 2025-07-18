'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Soal berdasarkan video yang kamu berikan
const soalKataSehari = [
  { kata: 'Maaf', video: '/video/kata-sehari/maaf.mp4' },
  { kata: 'Mau', video: '/video/kata-sehari/mau.mp4' },
  { kata: 'Sama-sama', video: '/video/kata-sehari/sama-sama.mp4' },
  { kata: 'Suka', video: '/video/kata-sehari/suka.mp4' },
  { kata: 'Terima Kasih', video: '/video/kata-sehari/terima-kasih.mp4' },
  { kata: 'Tidak', video: '/video/kata-sehari/tidak.mp4' },
  { kata: 'Tidak Mau', video: '/video/kata-sehari/tidak-mau.mp4' },
  { kata: 'Tolong', video: '/video/kata-sehari/tolong.mp4' },
  { kata: 'Ya', video: '/video/kata-sehari/ya.mp4' },
];

// Fungsi acak array
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Fungsi acak pilihan jawaban
function acakPilihan(jawaban, semua) {
  const pilihan = new Set([jawaban]);
  while (pilihan.size < 3) {
    const random = semua[Math.floor(Math.random() * semua.length)].kata;
    pilihan.add(random);
  }
  return Array.from(pilihan).sort(() => Math.random() - 0.5);
}

export default function GameKataSehariPage() {
  const [soalList, setSoalList] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [pilihan, setPilihan] = useState([]);

  useEffect(() => {
    setSoalList(shuffleArray(soalKataSehari));
  }, []);

  useEffect(() => {
    if (soalList.length === 0 || current >= soalList.length || !soalList[current]) return;
    const soal = soalList[current];
    const opsi = acakPilihan(soal.kata, soalKataSehari);
    setPilihan(opsi);
    setSelected(null);
    setShowResult(false);
  }, [current, soalList]);

  useEffect(() => {
    if (current === -1) {
      const bonus = score === soalKataSehari.length * 10 ? 20 : 0;
      const total = score + bonus;
      const existing = parseInt(localStorage.getItem('totalPoin') || '0');
      localStorage.setItem('totalPoin', existing + total);
    }
  }, [current]);

  const handleJawab = (pil) => {
    if (selected !== null) return;
    setSelected(pil);
    setShowResult(true);
    if (pil === soalList[current]?.kata) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    if (current + 1 < soalList.length) {
      setCurrent(current + 1);
    } else {
      setCurrent(-1);
    }
  };

  if (current === -1) {
    const bonus = score === soalKataSehari.length * 10 ? 20 : 0;
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
      <h1 className="text-xl font-bold text-center">Game Kata Sehari-hari</h1>
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
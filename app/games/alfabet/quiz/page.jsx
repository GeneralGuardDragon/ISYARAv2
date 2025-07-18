'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Soal alfabet dengan video
const soalAlfabet = [
  { huruf: 'A', video: '/video/alfabet/A.mp4' },
  { huruf: 'B', video: '/video/alfabet/B.mp4' },
  { huruf: 'C', video: '/video/alfabet/C.mp4' },
  { huruf: 'D', video: '/video/alfabet/D.mp4' },
  { huruf: 'E', video: '/video/alfabet/E.mp4' },
  { huruf: 'F', video: '/video/alfabet/F.mp4' },
  { huruf: 'G', video: '/video/alfabet/G.mp4' },
  { huruf: 'H', video: '/video/alfabet/H.mp4' },
  { huruf: 'I', video: '/video/alfabet/I.mp4' },
  { huruf: 'J', video: '/video/alfabet/J.mp4' },
  { huruf: 'K', video: '/video/alfabet/K.mp4' },
  { huruf: 'L', video: '/video/alfabet/L.mp4' },
  { huruf: 'M', video: '/video/alfabet/M.mp4' },
  { huruf: 'N', video: '/video/alfabet/N.mp4' },
  { huruf: 'O', video: '/video/alfabet/O.mp4' },
  { huruf: 'P', video: '/video/alfabet/P.mp4' },
  { huruf: 'Q', video: '/video/alfabet/Q.mp4' },
  { huruf: 'R', video: '/video/alfabet/R.mp4' },
  { huruf: 'S', video: '/video/alfabet/S.mp4' },
  { huruf: 'T', video: '/video/alfabet/T.mp4' },
  { huruf: 'U', video: '/video/alfabet/U.mp4' },
  { huruf: 'V', video: '/video/alfabet/V.mp4' },
  { huruf: 'W', video: '/video/alfabet/W.mp4' },
  { huruf: 'X', video: '/video/alfabet/X.mp4' },
  { huruf: 'Y', video: '/video/alfabet/Y.mp4' },
  { huruf: 'Z', video: '/video/alfabet/Z.mp4' },
];

// Acak array
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Acak pilihan ganda
function acakPilihan(jawaban, semua) {
  const pilihan = new Set([jawaban]);
  while (pilihan.size < 3) {
    const random = semua[Math.floor(Math.random() * semua.length)].huruf;
    pilihan.add(random);
  }
  return Array.from(pilihan).sort(() => Math.random() - 0.5);
}

export default function GameAlfabetPage() {
  const [soalList, setSoalList] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [pilihan, setPilihan] = useState([]);

  useEffect(() => {
    setSoalList(shuffleArray(soalAlfabet));
  }, []);

  useEffect(() => {
    if (
      soalList.length === 0 ||
      current === -1 ||
      current >= soalList.length
    )
      return;

    const soal = soalList[current];
    const opsi = acakPilihan(soal.huruf, soalAlfabet);
    setPilihan(opsi);
    setSelected(null);
    setShowResult(false);
  }, [current, soalList]);

  useEffect(() => {
    if (current === -1) {
      const bonus = score === soalAlfabet.length * 10 ? 20 : 0;
      const total = score + bonus;

      const existing = parseInt(localStorage.getItem('totalPoin') || '0');
      localStorage.setItem('totalPoin', existing + total);

      // Simpan ke leaderboard
      const nama = localStorage.getItem('username') || 'Guest';


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

  const handleJawab = (pil) => {
    if (selected !== null || current === -1) return;
    setSelected(pil);
    setShowResult(true);
    if (pil === soalList[current].huruf) {
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

  if (current === -1) {
    const bonus = score === soalAlfabet.length * 10 ? 20 : 0;
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

  if (soalList.length === 0 || !soalList[current])
    return <p className="text-center p-4">Memuat soal...</p>;

  const soal = soalList[current];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-center">Game Alfabet (Video)</h1>
      <p className="text-center">Soal ke {current + 1} dari {soalList.length}</p>

      <div className="bg-white shadow rounded-lg p-4 text-center">
        <video
          src={soal.video}
          autoPlay
          controls
          muted
          className="w-full max-w-sm mx-auto rounded-md shadow"
        />
        <p className="mt-2 font-semibold">Huruf apa ini?</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {pilihan.map((pil) => (
          <button
            key={pil}
            onClick={() => handleJawab(pil)}
            className={`p-2 rounded-lg font-bold transition ${
              selected === pil
                ? pil === soal.huruf
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
            {selected === soal.huruf
              ? '✅ Benar!'
              : `❌ Salah, jawaban: ${soal.huruf}`}
          </p>
          <button
            onClick={handleNext}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

export default function KalimatDetail() {
  const { kalimat } = useParams();
  const videoRef = useRef(null);

  const videoFile = kalimat.replace(/-/g, '_') + '.mp4'; // nama file: "nama_kamu_siapa.mp4"

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [kalimat]);

  const handleStop = () => {
    videoRef.current?.pause();
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      <Link href="/study/perkenalan" className="self-start mb-4 text-lg font-bold">← Kembali</Link>
      <h1 className="text-2xl font-bold mb-4 capitalize">{kalimat.replace(/-/g, ' ')}</h1>

      <div className="w-full max-w-lg bg-blue-50 rounded-xl shadow-md p-4 mb-6">
        <video
          ref={videoRef}
          src={`/video/perkenalan/${videoFile}`}
          controls={false}
          className="w-full rounded-lg"
        />
      </div>

      <div className="flex gap-6">
        <button
          onClick={handleStop}
          className="bg-blue-200 px-6 py-2 rounded-full shadow hover:bg-blue-300"
        >
          ⏸️ Berhenti
        </button>
        <button
          onClick={handleReplay}
          className="bg-blue-200 px-6 py-2 rounded-full shadow hover:bg-blue-300"
        >
          🔁 Ulangi
        </button>
      </div>
    </div>
  );
}

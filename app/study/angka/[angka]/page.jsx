"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useRef, useEffect } from "react";

export default function AngkaDetail() {
  const { angka } = useParams();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [angka]);

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
      <Link href="/study/angka" className="self-start mb-4 text-lg font-bold">
        ← Kembali
      </Link>
      <h1 className="text-2xl font-bold mb-4">Angka {angka}</h1>

      <div className="w-full max-w-lg bg-blue-50 rounded-xl shadow-md p-4 mb-6">
        <video
          ref={videoRef}
          src={`/video/angka/${angka}.mp4`} // misalnya: /public/video/angka/4.mp4
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

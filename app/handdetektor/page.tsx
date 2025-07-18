"use client";

import { useState } from "react";
import Link from "next/link";
import Camera from "../components/Camera";

export default function HandDetektorPage() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [gestureResult, setGestureResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleResult = (result: string) => {
    setGestureResult(result);
    setShowResult(true);
    setIsDetecting(false);
  };

  const handleDetect = () => {
    setIsDetecting(true);
    setShowResult(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 px-4 py-6 bg-white rounded-2xl shadow-lg space-y-6">
      <h1 className="text-xl font-semibold text-center text-sky-700">🤟 Deteksi Gerakan Tangan</h1>

      <div className="space-y-4">
        <Camera
          onResult={(res) => {
            handleResult(res);
          }}
        />
      </div>

      {showResult && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center shadow-inner">
            <p className="text-base text-gray-700 font-medium italic">
              Hasil Deteksi: <span className="font-bold">{gestureResult}</span>
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link href="/">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            ← Kembali ke Beranda
          </button>
        </Link>
      </div>
    </div>
  );
}

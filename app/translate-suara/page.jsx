'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function TranslateSuaraPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [resultText, setResultText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert("Browser Anda tidak mendukung Speech Recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "id-ID";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setResultText(transcript);
      setShowResult(true);
      handleVideoSelection(transcript);
    };

    recognition.onerror = (event) => {
      alert("Terjadi kesalahan saat merekam suara: " + event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleRecord = () => {
    if (recognitionRef.current) {
      setResultText("");
      setShowResult(false);
      setVideoSrc(null);
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const handleVideoSelection = (text) => {
    if (text.includes("apa kabar")) {
      setVideoSrc("/video/isyarat-apa-kabar.mp4");
    } else if (text.includes("selamat")) {
      setVideoSrc("/video/isyarat-selamat-datang.mp4");
    } else if (text.includes("halo") || text.includes("hallo")) {
      setVideoSrc("/video/isyarat-halo.mp4");
    } else {
      setVideoSrc(null); // Tidak cocok → tidak tampilkan video
    }
  };


  return (
    <div className="max-w-md mx-auto mt-8 px-4 py-6 bg-white rounded-2xl shadow-lg space-y-6">
      <h1 className="text-xl font-semibold text-center text-sky-700">
        🗣️ Translate Suara
      </h1>

      <div className="flex justify-center">
        <button
          onClick={handleRecord}
          className={`px-6 py-2 rounded-full font-semibold text-white transition duration-300 ${
            isRecording
              ? "bg-red-500 animate-pulse"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isRecording}
        >
          {isRecording ? "Merekam..." : "Mulai Rekaman"}
        </button>
      </div>

      {showResult && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center shadow-inner">
            <p className="text-base text-gray-700 font-medium italic">
              "{resultText}"
            </p>
          </div>

          {videoSrc ? (
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-md">
              <video
                src={videoSrc}
                autoPlay
                muted
                controls
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center italic">
              Tidak ada video isyarat yang cocok.
            </p>
          )}
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
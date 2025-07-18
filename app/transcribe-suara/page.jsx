"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function TranscribeSuaraPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [fullTranscript, setFullTranscript] = useState("");
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert("Browser tidak mendukung Speech Recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "id-ID";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setFullTranscript(result);

      const words = result.split(" ");
      const chunkSize = 10;
      const chunks = [];

      for (let i = 0; i < words.length; i += chunkSize) {
        const chunk = words.slice(i, i + chunkSize).join(" ").trim();
        if (chunk) {
          chunks.push(chunk);
        }
      }

      setSentences(chunks);
      setCurrentIndex(0);
    };

    recognition.onerror = (event) => {
      alert("Terjadi kesalahan: " + event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleRecord = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      setFullTranscript("");
      setSentences([]);
      setCurrentIndex(0);
      recognitionRef.current.start();
    }
  };

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("Sudah sampai kalimat terakhir.");
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">
      <h1 className="text-xl font-semibold text-center text-purple-700">
        🎤 Transcribe Suara
      </h1>

      <div className="flex justify-center">
        <button
          onClick={handleRecord}
          className={`px-6 py-2 rounded-full font-semibold text-white transition duration-300 ${
            isRecording ? "bg-red-500 animate-pulse" : "bg-purple-600 hover:bg-purple-700"
          }`}
          disabled={isRecording}
        >
          {isRecording ? "Merekam..." : "Mulai Rekaman"}
        </button>
      </div>

      {sentences.length > 0 && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center shadow-inner">
            <p className="text-base text-gray-700 font-medium italic">
              "{sentences[currentIndex]}"
            </p>
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={handleRestart}
              className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg"
              disabled={currentIndex === 0}
            >
              🔁 Ulangi
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
              disabled={currentIndex >= sentences.length - 1}
            >
              {currentIndex < sentences.length - 1 ? "Next →" : "✓ Selesai"}
            </button>
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
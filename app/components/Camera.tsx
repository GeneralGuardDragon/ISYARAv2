'use client';

import { useEffect, useRef, useState } from 'react';

export default function Camera({ onResult }: { onResult: (result: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play()
              .then(() => setStreaming(true))
              .catch((err) => {
                console.error('Error playing video:', err);
              });
          };
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    initCamera();

    // Optional: Cleanup saat komponen di-unmount
    return () => {
      const tracks = videoRef.current?.srcObject instanceof MediaStream
        ? videoRef.current.srcObject.getTracks()
        : [];
      tracks?.forEach((track) => track.stop());
    };
  }, []);

  const capture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      setLoading(true);

      const formData = new FormData();
      formData.append('file', blob, 'snapshot.jpg');

      try {
        const res = await fetch('http://localhost:8000/predict', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        onResult(data.gesture);
      } catch (err) {
        console.error('Error fetching prediction:', err);
        onResult('Gagal mendeteksi');
      } finally {
        setLoading(false);
      }
    }, 'image/jpeg');
  };

  return (
    <div className="space-y-4">
      <video
        ref={videoRef}
        className="rounded-xl border shadow w-full"
        playsInline
        muted
      />
      <canvas ref={canvasRef} hidden />

      <button
        onClick={capture}
        disabled={loading || !streaming}
        className={`px-6 py-2 rounded-full font-semibold text-white transition duration-300 ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Mendeteksi...' : 'Deteksi Gerakan'}
      </button>
    </div>
  );
}

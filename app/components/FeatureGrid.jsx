"use client";
import Link from "next/link";

const features = [
  { label: "Translate Suara", icon: "🗣️", link: "/translate-suara" },
  { label: "Transcribe Suara", icon: "🎧", link: "/transcribe-suara" },
  { label: "Monitor Gerakan", icon: "🎥", link: "/handdetektor" },
  { label: "Games", icon: "🎮", link: "/games" },
];

const lastFeature = { label: "Study", icon: "📚", link: "/study" };

export default function FeatureGrid() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 max-w-sm w-full mx-auto">
        {features.map((f, i) => (
          <Link href={f.link} key={i}>
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center text-center hover:bg-gray-100 cursor-pointer">
              <div className="text-3xl mb-2">{f.icon}</div>
              <span className="text-sm font-medium">{f.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Link href={lastFeature.link}>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center text-center w-[190px] hover:bg-gray-100 cursor-pointer">
            <div className="text-3xl mb-2">{lastFeature.icon}</div>
            <span className="text-sm font-medium">{lastFeature.label}</span>
          </div>
        </Link>
      </div>
    </>
  );
}

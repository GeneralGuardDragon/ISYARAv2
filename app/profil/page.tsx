"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Link from "next/link";

export default function ProfilPage() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    photo: "", // base64
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Ambil dari localStorage
    const storedUser = localStorage.getItem("user");
    const storedPhoto = localStorage.getItem("user_photo");
    const storedName = localStorage.getItem("username");

    if (storedUser) {
      const data = JSON.parse(storedUser);
      setProfile({
        username: storedName || data.name || "",
        email: data.email || "",
        photo: storedPhoto || "",
      });
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("username", profile.username.trim());

    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      user.name = profile.username.trim();
      localStorage.setItem("user", JSON.stringify(user));
    }

    if (profile.photo) {
      localStorage.setItem("user_photo", profile.photo);
    }

    setSaved(true);
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setProfile({ ...profile, photo: base64 });
      setSaved(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen px-6 pt-10 pb-24 bg-gradient-to-b from-white to-sky-100 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-6">👤 Edit Profil</h1>

      <div className="w-full max-w-sm space-y-6 bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-sky-300 shadow">
            {profile.photo ? (
              <img src={profile.photo} alt="Foto Profil" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
                ?
              </div>
            )}
          </div>
          <label className="mt-2 text-blue-600 hover:underline cursor-pointer text-sm">
            Ganti Foto
            <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
          </label>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nama Pengguna</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              placeholder="Masukkan nama"
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="border px-4 py-2 rounded w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            Simpan Perubahan
          </button>

          {saved && (
            <p className="text-green-600 text-center mt-2">
              ✅ Perubahan berhasil disimpan!
            </p>
          )}
        </div>
        <div className="text-center">
          <Link href="/">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              ← Kembali ke Beranda
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

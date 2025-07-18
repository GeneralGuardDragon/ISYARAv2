"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    username: "",
    email: "",
    password: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "Laki-laki",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Registrasi gagal");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-center text-blue-600">Daftar Akun</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama Lengkap"
          className="w-full border px-3 py-2 rounded-md"
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full border px-3 py-2 rounded-md"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded-md"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded-md"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tempat Lahir"
          className="w-full border px-3 py-2 rounded-md"
          onChange={(e) => setForm({ ...form, tempat_lahir: e.target.value })}
          required
        />
        <input
          type="date"
          className="w-full border px-3 py-2 rounded-md"
          onChange={(e) => setForm({ ...form, tanggal_lahir: e.target.value })}
          required
        />
        <select
          className="w-full border px-3 py-2 rounded-md"
          onChange={(e) => setForm({ ...form, jenis_kelamin: e.target.value })}
        >
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Daftar
        </button>
      </form>
    </div>
  );
}

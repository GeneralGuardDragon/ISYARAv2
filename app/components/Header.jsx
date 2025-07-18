"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center px-4 max-w-screen-lg mx-auto">
        <img src="/isara.png" alt="Logo Isara" className="h-25" />
        <div>
          <Link href="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

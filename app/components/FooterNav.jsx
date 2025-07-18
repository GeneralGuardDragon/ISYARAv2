'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FooterNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center h-16 z-50">
      <Link href="/">
        <div className={`text-2xl ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}>
          🏠
        </div>
      </Link>

      <Link href="/games/leaderboard">
        <div className={`text-3xl ${pathname === '/games/leaderboard' ? 'text-yellow-500' : 'text-gray-600'} scale-110`}>
          🏆
        </div>
      </Link>

      <Link href="/profil">
        <div className={`text-2xl ${pathname === '/profil' ? 'text-blue-600' : 'text-gray-600'}`}>
          👤
        </div>
      </Link>
    </nav>
  );
}
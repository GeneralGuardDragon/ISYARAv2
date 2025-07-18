import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ISARA App",
  description: "Aplikasi edukasi bahasa isyarat & deteksi suara/gerakan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Load MediaPipe dari CDN */}
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.min.js"></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
import { ClerkProvider, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI-Powered Programming Learning Platform',
  description: 'Learn programming with the help of AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
        <body className={`${inter.className} bg-gray-50`}>
          <Navbar />
          <main className="min-h-screen">
            <SignedIn>
        {children}
            </SignedIn>
            <SignedOut>
              <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-300 via-blue-200 to-pink-100">
                {/* Confetti/Sparkle SVG background */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" aria-hidden="true">
                  <defs>
                    <radialGradient id="sparkle" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {Array.from({ length: 18 }).map((_, i) => (
                    <circle key={i} cx={Math.random() * 100 + '%'} cy={Math.random() * 100 + '%'} r={Math.random() * 32 + 8} fill="url(#sparkle)" />
                  ))}
                </svg>
                <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border border-white/40 animate-fade-in">
                  {/* Playful Robot SVG */}
                  <div className="flex justify-center mb-4">
                    <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg">
                      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="8" y="16" width="40" height="28" rx="14" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
                        <ellipse cx="28" cy="30" rx="12" ry="10" fill="#a5b4fc"/>
                        <circle cx="20" cy="28" r="3" fill="#6366f1"/>
                        <circle cx="36" cy="28" r="3" fill="#6366f1"/>
                        <rect x="24" y="36" width="8" height="3" rx="1.5" fill="#6366f1"/>
                        <rect x="26" y="10" width="4" height="8" rx="2" fill="#6366f1"/>
                      </svg>
                    </span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow">Welcome to AI-Enhanced Learning!</h1>
                  <p className="text-lg text-gray-700 mb-4">Master programming with the help of AI. Interactive lessons, instant feedback, and a coding assistant at your side.</p>
                  {/* Key Features */}
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center gap-2 justify-center text-purple-700 text-sm">
                      <span className="bg-purple-100 rounded-full p-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg></span>
                      AI Coding Assistant
                    </div>
                    <div className="flex items-center gap-2 justify-center text-blue-700 text-sm">
                      <span className="bg-blue-100 rounded-full p-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2M5 10a7 7 0 0114 0v2a7 7 0 01-14 0v-2z" /></svg></span>
                      Interactive Exercises
                    </div>
                    <div className="flex items-center gap-2 justify-center text-pink-700 text-sm">
                      <span className="bg-pink-100 rounded-full p-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                      Progress Tracking
                    </div>
                  </div>
                  <div className="mb-6 text-purple-700 text-sm italic bg-purple-50/70 rounded-lg px-4 py-2 border border-purple-200">
                    🚀 "Empower your coding journey with the magic of AI!"
                  </div>
                  <SignInButton mode="modal">
                    <button className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 ring-offset-2 ring-offset-white animate-glow">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              </div>
            </SignedOut>
          </main>
      </body>
    </html>
    </ClerkProvider>
  );
}

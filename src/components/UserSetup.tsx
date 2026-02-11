'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';

export default function UserSetup() {
  const [username, setUsername] = useState('');
  const { createUser, currentLanguage } = useAppStore();
  const t = translations[currentLanguage];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed) {
      createUser(trimmed);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-md w-full border-2 border-neon-green bg-black/90 p-8 shadow-[0_0_30px_rgba(57,255,20,0.3)]">
        <h2 className="text-3xl font-black mb-2 text-neon-green tracking-tight">
          WELCOME TO SCIENCE PARK
        </h2>
        <p className="text-white/70 mb-6 font-mono text-sm">
          Enter your name to start your learning journey
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-neon-green/70 mb-2 uppercase tracking-wider">
              Your Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name..."
              className="w-full p-3 bg-black border-2 border-white/60 text-white font-mono focus:border-neon-green focus:outline-none transition-colors"
              autoFocus
              maxLength={30}
            />
          </div>
          
          <button
            type="submit"
            disabled={!username.trim()}
            className="w-full p-4 bg-neon-green text-black font-black text-lg hover:bg-neon-green/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(57,255,20,0.5)]"
          >
            START LEARNING
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-white/90 font-mono text-center">
            SYSTEM v2.1 // BASEL EDUCATION PLATFORM
          </p>
        </div>
      </div>
    </div>
  );
}

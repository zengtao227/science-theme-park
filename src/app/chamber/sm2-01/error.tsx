'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md border border-neon-green/30 bg-black p-8">
        <h2 className="text-2xl font-black mb-4 text-neon-green">MODULE LOADING ERROR</h2>
        <p className="text-white/70 mb-6 font-mono text-sm">
          SM2.01 // BINOMIAL FACTORY failed to load
        </p>
        <p className="text-white mb-6 text-xs">
          {error.message}
        </p>
        <button
          onClick={reset}
          className="w-full px-6 py-3 bg-neon-green text-black font-black hover:bg-neon-green/80 transition-all"
        >
          TRY AGAIN
        </button>
        <Link
          href="/"
          className="block w-full mt-3 px-6 py-3 border border-white/60 text-center text-white/70 hover:bg-white/5 transition-all"
        >
          RETURN TO NEXUS
        </Link>
      </div>
    </div>
  );
}

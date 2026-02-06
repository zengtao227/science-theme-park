export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-neon-green/20 border-t-neon-green rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neon-green font-mono text-sm animate-pulse">
          LOADING SM2.01 // BINOMIAL FACTORY...
        </p>
      </div>
    </div>
  );
}

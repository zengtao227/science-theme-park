"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InlineMath } from "react-katex";
import { clsx } from "clsx";
import { useCoop } from "@/hooks/useCoop";
import { CoopQuestState } from "@/lib/coop/coopService";
import {
    Wifi,
    WifiOff,
    Users,
    Crown,
    Copy,
    Check,
    X,
    Loader2,
    Swords,
    Trophy,
    Play,
} from "lucide-react";

interface CoopPanelProps {
    /** Called when guest receives a quest from host */
    onQuestReceived?: (quest: CoopQuestState) => void;
    /** Current quest to sync (host provides this so we can broadcast it) */
    currentQuestToSync?: CoopQuestState | null;
    /** My current answers, so we can send updates */
    myAnswers?: Record<string, string>;
    /** Called when host presses next — tells host's page too */
    onNext?: () => void;
    /** Tell the panel if current check was correct */
    lastCheckCorrect?: boolean | null;
}

function RoomCodeDisplay({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="flex items-center gap-3 bg-black/40 border border-neon-purple/30 rounded-xl px-4 py-3">
            <div className="flex gap-1">
                {code.split("").map((char, i) => (
                    <span
                        key={i}
                        className="w-8 h-10 flex items-center justify-center bg-white/5 border border-white/20 rounded text-lg font-black text-neon-purple font-mono shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                    >
                        {char}
                    </span>
                ))}
            </div>
            <button
                onClick={copy}
                className="ml-2 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                title="Copy code"
            >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/60" />}
            </button>
        </div>
    );
}

function ScoreBoard({ myScore, partnerScore, role }: { myScore: number; partnerScore: number; role: string }) {
    return (
        <div className="flex items-center gap-4 bg-black/30 border border-white/10 rounded-xl px-4 py-2">
            <div className="flex flex-col items-center">
                <div className="text-[8px] text-neon-purple font-black uppercase tracking-widest flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    {role === "host" ? "You" : "Partner"}
                </div>
                <div className="text-2xl font-black text-white">{role === "host" ? myScore : partnerScore}</div>
            </div>
            <Swords className="w-5 h-5 text-white/30" />
            <div className="flex flex-col items-center">
                <div className="text-[8px] text-white/50 font-black uppercase tracking-widest">
                    {role === "host" ? "Guest" : "You"}
                </div>
                <div className="text-2xl font-black text-white">{role === "host" ? partnerScore : myScore}</div>
            </div>
        </div>
    );
}

export default function CoopPanel({
    onQuestReceived,
    currentQuestToSync,
    myAnswers = {},
    onNext,
    lastCheckCorrect,
}: CoopPanelProps) {
    const [joinCode, setJoinCode] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);

    const {
        phase,
        role,
        roomCode,
        error,
        partnerState,
        partnerReady,
        myScore,
        partnerScore,
        isConnected,
        createRoom,
        joinRoom,
        disconnect,
        sendQuestSync,
        sendAnswerUpdate,
        sendAnswerSubmit,
        sendNextQuest,
        sendReady,
    } = useCoop({ onQuestReceived });

    // Send quest sync when host changes quest
    const syncQuest = useCallback(() => {
        if (role === "host" && currentQuestToSync) {
            sendQuestSync(currentQuestToSync);
        }
    }, [role, currentQuestToSync, sendQuestSync]);

    // Notify submission result to partner
    const handleSubmitNotify = useCallback(() => {
        if (lastCheckCorrect !== null && lastCheckCorrect !== undefined) {
            sendAnswerSubmit(lastCheckCorrect);
        }
    }, [lastCheckCorrect, sendAnswerSubmit]);

    const StatusDot = () => (
        <div
            className={clsx(
                "w-2 h-2 rounded-full flex-shrink-0",
                isConnected ? "bg-green-400 animate-pulse" : phase === "waiting_guest" || phase === "joining" ? "bg-yellow-400 animate-pulse" : "bg-white/20"
            )}
        />
    );

    return (
        <>
            {/* Floating trigger button */}
            <button
                onClick={() => setPanelOpen((v) => !v)}
                className={clsx(
                    "fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full border shadow-2xl transition-all font-black text-[10px] uppercase tracking-widest",
                    isConnected
                        ? "border-green-500/50 bg-green-500/10 text-green-400 shadow-green-500/20"
                        : "border-neon-purple/50 bg-neon-purple/10 text-neon-purple shadow-neon-purple/20"
                )}
            >
                <StatusDot />
                <Users className="w-4 h-4" />
                Coop
                {isConnected && (
                    <span className="ml-1 bg-green-400 text-black text-[8px] px-1.5 py-0.5 rounded-full font-black">
                        LIVE
                    </span>
                )}
            </button>

            {/* Panel */}
            <AnimatePresence>
                {panelOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 80, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 80, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-20 right-6 z-40 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-neon-purple" />
                                <span className="text-xs font-black uppercase tracking-widest text-white/80">Co-op Mode</span>
                            </div>
                            <button onClick={() => setPanelOpen(false)} className="p-1 hover:bg-white/10 rounded">
                                <X className="w-4 h-4 text-white/40" />
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* IDLE phase */}
                            {phase === "idle" && (
                                <div className="space-y-3">
                                    <p className="text-xs text-white/50 leading-relaxed">
                                        Invite a classmate to solve questions together in real time. No account needed!
                                    </p>
                                    <button
                                        onClick={createRoom}
                                        className="w-full py-3 bg-neon-purple/20 border border-neon-purple/40 text-neon-purple text-xs font-black uppercase tracking-widest rounded-xl hover:bg-neon-purple/30 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Crown className="w-4 h-4" /> Create Room (Host)
                                    </button>
                                    <div className="relative flex items-center">
                                        <div className="flex-1 border-t border-white/10" />
                                        <span className="px-3 text-[10px] text-white/30 uppercase tracking-widest">or</span>
                                        <div className="flex-1 border-t border-white/10" />
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            value={joinCode}
                                            onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
                                            placeholder="Room Code"
                                            maxLength={6}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white uppercase tracking-widest focus:outline-none focus:border-neon-purple/50 transition-colors"
                                        />
                                        <button
                                            onClick={() => joinCode.length === 6 && joinRoom(joinCode)}
                                            disabled={joinCode.length !== 6}
                                            className="px-3 py-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-black rounded-lg hover:bg-cyan-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            Join
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Creating */}
                            {phase === "creating" && (
                                <div className="flex items-center gap-3 py-4 justify-center">
                                    <Loader2 className="w-5 h-5 text-neon-purple animate-spin" />
                                    <span className="text-xs text-white/60">Setting up room...</span>
                                </div>
                            )}

                            {/* Waiting for guest */}
                            {phase === "waiting_guest" && (
                                <div className="space-y-4 py-2">
                                    <div className="text-[10px] uppercase tracking-widest text-white/50 text-center font-black">
                                        Share this code with your classmate
                                    </div>
                                    <div className="flex justify-center">
                                        <RoomCodeDisplay code={roomCode} />
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
                                        <span className="text-xs text-yellow-400 font-mono">Waiting for guest...</span>
                                    </div>
                                    <button onClick={disconnect} className="w-full py-2 text-xs text-white/40 hover:text-white/60 transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            )}

                            {/* Joining */}
                            {phase === "joining" && (
                                <div className="flex items-center gap-3 py-4 justify-center">
                                    <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                                    <span className="text-xs text-white/60">Connecting to host...</span>
                                </div>
                            )}

                            {/* Connected */}
                            {phase === "connected" && (
                                <div className="space-y-4">
                                    {/* Connection banner */}
                                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl px-3 py-2">
                                        <Wifi className="w-4 h-4 text-green-400" />
                                        <div>
                                            <div className="text-[9px] uppercase font-black text-green-400 tracking-widest">Connected</div>
                                            <div className="text-[10px] text-white/60 font-mono">Room: {roomCode} · {role === "host" ? "👑 Host" : "🎮 Guest"}</div>
                                        </div>
                                    </div>

                                    {/* Scoreboard */}
                                    <div className="flex justify-center">
                                        <ScoreBoard myScore={myScore} partnerScore={partnerScore} role={role || "host"} />
                                    </div>

                                    {/* Partner status */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
                                        <div className="text-[9px] uppercase tracking-widest text-white/40 font-black">Partner Status</div>
                                        {Object.keys(partnerState.answers).length > 0 ? (
                                            <div className="space-y-1">
                                                {Object.entries(partnerState.answers).map(([slotId, val]) => (
                                                    <div key={slotId} className="flex justify-between text-xs">
                                                        <span className="text-white/40 font-mono">{slotId}</span>
                                                        <span className="text-white/60 font-mono blur-sm hover:blur-none transition-all">
                                                            {val || "—"}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-xs text-white/30 italic">Partner hasn't typed yet...</div>
                                        )}
                                        {partnerState.submitted && (
                                            <div className={clsx("text-xs font-black flex items-center gap-1", partnerState.correct ? "text-green-400" : "text-orange-400")}>
                                                {partnerState.correct ? "✓ Partner got it right!" : "✗ Partner was wrong"}
                                            </div>
                                        )}
                                    </div>

                                    {/* Host controls */}
                                    {role === "host" && currentQuestToSync && (
                                        <div className="space-y-2">
                                            <button
                                                onClick={syncQuest}
                                                className="w-full py-2.5 bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-neon-purple/20 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Play className="w-3 h-3" /> Sync Quest to Partner
                                            </button>
                                        </div>
                                    )}

                                    {/* Submit notify button */}
                                    {lastCheckCorrect !== null && lastCheckCorrect !== undefined && (
                                        <button
                                            onClick={handleSubmitNotify}
                                            className="w-full py-2 bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-white/10 transition-colors"
                                        >
                                            📡 Notify Partner of Result
                                        </button>
                                    )}

                                    {/* Trophy if both submitted */}
                                    {partnerState.submitted && (
                                        <div className="flex items-center justify-center gap-2 py-1">
                                            <Trophy className="w-4 h-4 text-yellow-400" />
                                            <span className="text-xs text-yellow-400 font-black uppercase tracking-widest">
                                                Round complete!
                                            </span>
                                        </div>
                                    )}

                                    <button
                                        onClick={disconnect}
                                        className="w-full py-2 text-xs text-white/30 hover:text-red-400 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <WifiOff className="w-3 h-3" /> Disconnect
                                    </button>
                                </div>
                            )}

                            {/* Disconnected */}
                            {phase === "disconnected" && (
                                <div className="space-y-4 py-2 text-center">
                                    <WifiOff className="w-8 h-8 text-red-400 mx-auto" />
                                    <div className="text-xs text-white/60">Connection lost</div>
                                    <button
                                        onClick={disconnect}
                                        className="px-4 py-2 bg-white/5 border border-white/10 text-xs text-white/60 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            )}

                            {/* Error */}
                            {phase === "error" && (
                                <div className="space-y-4 py-2">
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                                        <div className="text-[9px] uppercase font-black text-red-400 tracking-widest mb-1">Connection Error</div>
                                        <div className="text-xs text-white/60">{error}</div>
                                    </div>
                                    <button
                                        onClick={disconnect}
                                        className="w-full py-2 bg-white/5 border border-white/10 text-xs text-white/60 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

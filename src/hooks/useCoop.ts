"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { coopService, CoopRole, CoopQuestState, CoopMessage } from "@/lib/coop/coopService";

export type CoopPhase =
    | "idle"
    | "creating"
    | "waiting_guest"
    | "joining"
    | "connected"
    | "disconnected"
    | "error";

export interface PartnerState {
    answers: Record<string, string>;
    submitted: boolean;
    correct: boolean | null;
}

export interface UseCoopOptions {
    onQuestReceived?: (quest: CoopQuestState) => void;
}

export function useCoop({ onQuestReceived }: UseCoopOptions = {}) {
    const [phase, setPhase] = useState<CoopPhase>("idle");
    const [role, setRole] = useState<CoopRole | null>(null);
    const [roomCode, setRoomCode] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [partnerState, setPartnerState] = useState<PartnerState>({
        answers: {},
        submitted: false,
        correct: null,
    });
    const [partnerReady, setPartnerReady] = useState(false);
    const [myScore, setMyScore] = useState(0);
    const [partnerScore, setPartnerScore] = useState(0);

    const questRef = useRef<CoopQuestState | null>(null);

    const generateCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const handleMessage = useCallback(
        (msg: CoopMessage) => {
            switch (msg.type) {
                case "QUEST_SYNC":
                    questRef.current = msg.payload as CoopQuestState;
                    onQuestReceived?.(msg.payload as CoopQuestState);
                    setPartnerState({ answers: {}, submitted: false, correct: null });
                    break;

                case "ANSWER_UPDATE": {
                    const { slotId, value } = msg.payload as { slotId: string; value: string };
                    setPartnerState((prev) => ({
                        ...prev,
                        answers: { ...prev.answers, [slotId]: value },
                    }));
                    break;
                }

                case "ANSWER_SUBMIT": {
                    const { correct } = msg.payload as { correct: boolean };
                    setPartnerState((prev) => ({ ...prev, submitted: true, correct }));
                    if (correct) setPartnerScore((s) => s + 1);
                    break;
                }

                case "NEXT_QUEST":
                    setPartnerState({ answers: {}, submitted: false, correct: null });
                    setPartnerReady(false);
                    break;

                case "PARTNER_READY":
                    setPartnerReady(true);
                    break;

                case "PING":
                    coopService.send({ type: "PONG" });
                    break;
            }
        },
        [onQuestReceived]
    );

    const createRoom = useCallback(async () => {
        const code = generateCode();
        setRoomCode(code);
        setPhase("creating");
        setError(null);

        try {
            await coopService.createRoom(code, {
                onConnected: (r: CoopRole) => {
                    setRole(r);
                    setPhase("connected");
                },
                onDisconnected: () => {
                    setPhase("disconnected");
                    setPartnerReady(false);
                },
                onMessage: handleMessage,
                onError: (err: string) => {
                    setError(err);
                    setPhase("error");
                },
            });
            setPhase("waiting_guest");
        } catch (err: any) {
            setError(err.message || "Failed to create room");
            setPhase("error");
        }
    }, [handleMessage]);

    const joinRoom = useCallback(
        async (code: string) => {
            setPhase("joining");
            setError(null);
            setRoomCode(code.trim().toUpperCase());

            try {
                await coopService.joinRoom(code.trim(), {
                    onConnected: (r: CoopRole) => {
                        setRole(r);
                        setPhase("connected");
                    },
                    onDisconnected: () => {
                        setPhase("disconnected");
                        setPartnerReady(false);
                    },
                    onMessage: handleMessage,
                    onError: (err: string) => {
                        setError(err);
                        setPhase("error");
                    },
                });
            } catch (err: any) {
                setError(err.message || "Cannot reach host. Check the room code.");
                setPhase("error");
            }
        },
        [handleMessage]
    );

    const disconnect = useCallback(() => {
        coopService.disconnect();
        setPhase("idle");
        setRole(null);
        setRoomCode("");
        setPartnerState({ answers: {}, submitted: false, correct: null });
        setPartnerReady(false);
        setMyScore(0);
        setPartnerScore(0);
        questRef.current = null;
    }, []);

    const sendQuestSync = useCallback((quest: CoopQuestState) => {
        coopService.send({ type: "QUEST_SYNC", payload: quest });
    }, []);

    const sendAnswerUpdate = useCallback((slotId: string, value: string) => {
        coopService.send({ type: "ANSWER_UPDATE", payload: { slotId, value } });
    }, []);

    const sendAnswerSubmit = useCallback((correct: boolean) => {
        coopService.send({ type: "ANSWER_SUBMIT", payload: { correct } });
        if (correct) setMyScore((s) => s + 1);
    }, []);

    const sendNextQuest = useCallback(() => {
        coopService.send({ type: "NEXT_QUEST" });
        setPartnerState({ answers: {}, submitted: false, correct: null });
        setPartnerReady(false);
    }, []);

    const sendReady = useCallback(() => {
        coopService.send({ type: "PARTNER_READY" });
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            coopService.disconnect();
        };
    }, []);

    return {
        phase,
        role,
        roomCode,
        error,
        partnerState,
        partnerReady,
        myScore,
        partnerScore,
        isConnected: phase === "connected",
        createRoom,
        joinRoom,
        disconnect,
        sendQuestSync,
        sendAnswerUpdate,
        sendAnswerSubmit,
        sendNextQuest,
        sendReady,
    };
}

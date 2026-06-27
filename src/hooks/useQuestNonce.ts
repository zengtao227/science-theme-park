import { useState, useEffect } from "react";

export interface UseQuestNonceResult {
    nonce: number;
    setNonce: React.Dispatch<React.SetStateAction<number>>;
}

export function useQuestNonce(
    moduleCode: string,
    stage: string,
    difficulty: string
): UseQuestNonceResult {
    const [nonce, setNonce] = useState(() => {
        if (typeof window === "undefined") return 0;
        try {
            const key = `quest_manager_nonce_${moduleCode}_${stage}_${difficulty}`;
            const saved = window.localStorage.getItem(key);
            return saved ? parseInt(saved, 10) : 0;
        } catch {
            return 0;
        }
    });

    // Read from localStorage when stage or difficulty changes
    useEffect(() => {
        if (typeof window === "undefined") return;
        const key = `quest_manager_nonce_${moduleCode}_${stage}_${difficulty}`;
        const saved = window.localStorage.getItem(key);
        setNonce(saved ? parseInt(saved, 10) : 0);
    }, [moduleCode, stage, difficulty]);

    // Write to localStorage whenever nonce changes
    useEffect(() => {
        if (typeof window === "undefined") return;
        const key = `quest_manager_nonce_${moduleCode}_${stage}_${difficulty}`;
        window.localStorage.setItem(key, nonce.toString());
    }, [moduleCode, nonce, stage, difficulty]);

    return { nonce, setNonce };
}

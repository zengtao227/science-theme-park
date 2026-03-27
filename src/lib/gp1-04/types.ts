import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "classical" | "tunneling" | "resonance";

export type TunnelQuest = Quest & {
  stage: Stage;
};

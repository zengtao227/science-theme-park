import type { Quest } from "@/hooks/useQuestManager";
import type { GeometryMeta } from "@/components/chamber/sm1-01/GeometryCanvas";

export type SM101Stage = "AREAS" | "VOLUMES" | "COMPLEX";

export interface S101Quest extends Quest {
  stage: SM101Stage;
  visualMeta?: GeometryMeta;
}

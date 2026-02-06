"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceDot } from "recharts";

type Point = { volume: number; pH: number };

interface TitrationCurveProps {
  data: Point[];
  currentVolume: number;
  currentPh: number;
  accent: string;
}

export default function TitrationCurve({ data, currentVolume, currentPh, accent }: TitrationCurveProps) {
  return (
    <div className="w-full h-[320px] bg-black/70 border border-white/10 rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="volume"
            stroke="rgba(255,255,255,0.4)"
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
            axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
            tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
            label={{ value: "mL", position: "insideBottomRight", fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
          />
          <YAxis
            domain={[0, 14]}
            stroke="rgba(255,255,255,0.4)"
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
            axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
            tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
          />
          <Tooltip
            contentStyle={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12 }}
            labelStyle={{ color: "rgba(255,255,255,0.7)" }}
            formatter={(value) => [`${Number(value).toFixed(2)}`, "pH"]}
          />
          <Line type="monotone" dataKey="pH" stroke={accent} strokeWidth={2} dot={false} />
          <ReferenceDot x={currentVolume} y={currentPh} r={5} fill={accent} stroke="white" strokeWidth={1} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

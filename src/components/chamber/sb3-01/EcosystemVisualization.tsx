"use client";

interface EcosystemVisualizationProps {
    quest: any;
    stage: string;
    translations: any;
}

export default function EcosystemVisualization({ quest, stage, translations }: EcosystemVisualizationProps) {
    const canvasSize = 400;
    const viz = translations?.labels?.viz || {};

    return (
        <div className="w-full h-full flex items-center justify-center bg-black/40 rounded-3xl p-8 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />

            <svg width={canvasSize} height={canvasSize} viewBox={`0 0 ${canvasSize} ${canvasSize}`} className="drop-shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                {stage === "FOOD_CHAINS" && (
                    <g className="animate-in fade-in zoom-in duration-700">
                        {/* Sun */}
                        <circle cx={200} cy={40} r={28} fill="#ffd93d" className="animate-pulse shadow-inner" opacity={0.9} />
                        <text x={200} y={45} textAnchor="middle" fill="black" fontSize="10" fontWeight="900" className="tracking-tighter uppercase italic">
                            {viz.sun || "SUN"}
                        </text>

                        {/* Energy arrow down */}
                        <path d="M 200 75 L 200 110" stroke="#ffd93d" strokeWidth={3} markerEnd="url(#arrowSun)" className="animate-in slide-in-from-top-4 duration-1000" />
                        <text x={225} y={95} fill="#ffd93d" fontSize="10" fontWeight="bold">100%</text>

                        {/* Producer (Plants) */}
                        <rect x={140} y={120} width={120} height={50} fill="#22c55e" opacity={0.6} rx={12} className="stroke-white/30 stroke-2" />
                        <text x={200} y={145} textAnchor="middle" fill="white" fontSize="11" fontWeight="900" className="tracking-widest uppercase italic">
                            {viz.producers || "PRODUCERS"}
                        </text>

                        {/* Energy arrow */}
                        <path d="M 200 170 L 200 200" stroke="#00e5ff" strokeWidth={3} markerEnd="url(#arrowEnergy)" opacity={0.6} />
                        <text x={225} y={190} fill="#00e5ff" fontSize="10" fontWeight="bold" opacity={0.8}>10%</text>

                        {/* Primary Consumer */}
                        <rect x={140} y={210} width={120} height={50} fill="#3b82f6" opacity={0.6} rx={12} className="stroke-white/30 stroke-2" />
                        <text x={200} y={235} textAnchor="middle" fill="white" fontSize="10" fontWeight="900" className="tracking-widest uppercase italic leading-none">
                            {viz.primary_consumer || "PRIMARY"}
                        </text>

                        {/* Energy arrow */}
                        <path d="M 200 260 L 200 290" stroke="#00e5ff" strokeWidth={3} markerEnd="url(#arrowEnergy)" opacity={0.6} />
                        <text x={225} y={280} fill="#00e5ff" fontSize="10" fontWeight="bold" opacity={0.8}>10%</text>

                        {/* Secondary Consumer */}
                        <rect x={140} y={300} width={120} height={50} fill="#8b5cf6" opacity={0.6} rx={12} className="stroke-white/30 stroke-2" />
                        <text x={200} y={325} textAnchor="middle" fill="white" fontSize="10" fontWeight="900" className="tracking-widest uppercase italic leading-none">
                            {viz.secondary_consumer || "SECONDARY"}
                        </text>

                        {/* Decomposers */}
                        <g transform="translate(300, 240)" className="animate-in fade-in duration-1000">
                            <circle cx={0} cy={0} r={45} fill="#78350f" opacity={0.4} className="stroke-white/20 stroke-2 border-dashed" />
                            <text x={0} y={0} textAnchor="middle" fill="white" fontSize="9" fontWeight="900" className="tracking-widest uppercase italic">
                                {viz.decomposers || "DECOMPOSERS"}
                            </text>
                        </g>

                        {/* Decomposer arrows */}
                        <path d="M 260 145 L 285 205" stroke="#78350f" strokeWidth={2} strokeDasharray="4,4" opacity={0.5} />
                        <path d="M 260 235 L 280 240" stroke="#78350f" strokeWidth={2} strokeDasharray="4,4" opacity={0.5} />
                        <path d="M 260 325 L 285 275" stroke="#78350f" strokeWidth={2} strokeDasharray="4,4" opacity={0.5} />
                    </g>
                )}

                {(stage === "CYCLES" || stage === "NUTRIENT_CYCLES") && (
                    <g className="animate-in fade-in duration-700">
                        {/* Carbon Cycle */}
                        <g transform="translate(30, 40)">
                            <text x={80} y={0} textAnchor="middle" fill="white" fontSize="10" fontWeight="900" className="tracking-[0.4em] uppercase font-black italic opacity-60">
                                {viz.carbon_cycle || "CARBON CYCLE"}
                            </text>

                            {/* Atmosphere CO2 */}
                            <rect x={40} y={15} width={80} height={35} fill="#3b82f6" opacity={0.4} rx={8} className="stroke-white/20 stroke-1" />
                            <text x={80} y={37} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                                {viz.co2_air || "CO2 in Air"}
                            </text>

                            {/* Photosynthesis arrow down */}
                            <path d="M 60 55 L 45 90" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arrowPhoto)" />

                            {/* Plants */}
                            <rect x={15} y={100} width={60} height={30} fill="#22c55e" opacity={0.5} rx={6} className="stroke-white/20 stroke-1" />
                            <text x={45} y={119} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                                {viz.plants || "Plants"}
                            </text>

                            {/* Respiration arrow up */}
                            <path d="M 100 55 L 115 90" stroke="#ff6b6b" strokeWidth={2} markerEnd="url(#arrowResp)" />

                            {/* Animals */}
                            <rect x={100} y={100} width={60} height={30} fill="#f59e0b" opacity={0.5} rx={6} className="stroke-white/20 stroke-1" />
                            <text x={130} y={119} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                                {viz.animals || "Animals"}
                            </text>
                        </g>

                        {/* Nitrogen Cycle */}
                        <g transform="translate(240, 40)">
                            <text x={50} y={0} textAnchor="middle" fill="white" fontSize="10" fontWeight="900" className="tracking-[0.4em] uppercase font-black italic opacity-60">
                                {viz.nitrogen_cycle || "N CYCLE"}
                            </text>

                            {/* N2 in air */}
                            <rect x={10} y={15} width={80} height={35} fill="#6366f1" opacity={0.4} rx={8} className="stroke-white/20 stroke-1" />
                            <text x={50} y={37} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">N2 (78%)</text>

                            {/* Fixation */}
                            <path d="M 50 55 L 50 85" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arrowFix)" />
                            <text x={60} y={75} fill="#22c55e" fontSize="8" fontWeight="bold">{viz.fix || "Fix"}</text>

                            {/* Nitrate */}
                            <rect x={10} y={95} width={80} height={35} fill="#22c55e" opacity={0.5} rx={8} className="stroke-white/20 stroke-1" />
                            <text x={50} y={117} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{viz.nitrate || "Nitrate"}</text>
                        </g>

                        {/* Water Cycle */}
                        <g transform="translate(30, 240)">
                            <text x={150} y={0} textAnchor="middle" fill="white" fontSize="10" fontWeight="900" className="tracking-[0.4em] uppercase font-black italic opacity-60">
                                {viz.water_cycle || "WATER CYCLE"}
                            </text>

                            {/* Cloud */}
                            <ellipse cx={150} cy={35} rx={45} ry={22} fill="white" opacity={0.15} />
                            <text x={150} y={40} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                {viz.clouds || "Clouds"}
                            </text>

                            {/* Rain */}
                            <g className="animate-bounce" style={{ animationDuration: '3s' }}>
                                <path d="M 140 60 L 135 85" stroke="#00e5ff" strokeWidth={2} opacity={0.5} />
                                <path d="M 150 60 L 150 85" stroke="#00e5ff" strokeWidth={2} opacity={0.5} />
                                <path d="M 160 60 L 165 85" stroke="#00e5ff" strokeWidth={2} opacity={0.5} />
                            </g>

                            {/* Water body */}
                            <rect x={100} y={100} width={100} height={35} fill="#3b82f6" opacity={0.4} rx={8} className="stroke-white/20 stroke-1" />
                            <text x={150} y={122} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                                {viz.river || "Rhine River"}
                            </text>

                            {/* Evaporation */}
                            <path d="M 175 100 L 175 65" stroke="#ffd93d" strokeWidth={2} markerEnd="url(#arrowEvap)" />
                            <text x={185} y={85} fill="#ffd93d" fontSize="8" fontWeight="bold">{viz.evap || "Evap"}</text>
                        </g>
                    </g>
                )}

                <defs>
                    <marker id="arrowSun" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto">
                        <polygon points="0 0, 10 0, 5 10" fill="#ffd93d" />
                    </marker>
                    <marker id="arrowEnergy" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto">
                        <polygon points="0 0, 10 0, 5 10" fill="#00e5ff" />
                    </marker>
                    <marker id="arrowPhoto" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
                        <polygon points="0 0, 8 0, 4 8" fill="#22c55e" />
                    </marker>
                    <marker id="arrowResp" markerWidth="8" markerHeight="8" refX="4" refY="0" orient="auto" markerUnits="strokeWidth">
                        <polygon points="0 8, 8 8, 4 0" fill="#ff6b6b" />
                    </marker>
                    <marker id="arrowFix" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
                        <polygon points="0 0, 8 0, 4 8" fill="#22c55e" />
                    </marker>
                    <marker id="arrowEvap" markerWidth="8" markerHeight="8" refX="4" refY="0" orient="auto">
                        <polygon points="0 8, 8 8, 4 0" fill="#ffd93d" />
                    </marker>
                </defs>
            </svg>

            <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-black italic">
                    {translations?.monitor_title || "ECO_MONITOR"}
                </span>
            </div>
        </div>
    );
}

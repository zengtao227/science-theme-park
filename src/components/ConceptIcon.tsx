"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ConceptIconProps {
    code: string;
    className?: string;
}

const ConceptIcon: React.FC<ConceptIconProps> = ({ code, className }) => {
    switch (code) {
        case 'SM2.02': // Pythagoras
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M30 70 L70 70 L30 30 Z"
                        stroke="currentColor"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <rect x="30" y="70" width="40" height="15" fill="currentColor" opacity="0.1" />
                    <rect x="15" y="30" width="15" height="40" fill="currentColor" opacity="0.1" />
                    <rect x="30" y="62" width="8" height="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                </svg>
            );
        case 'SM2.01': // Binomial
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="2" />
                    <motion.line x1="60" y1="25" x2="60" y2="75" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                    <motion.line x1="25" y1="60" x2="75" y2="60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                    <rect x="60" y="25" width="15" height="35" fill="currentColor" opacity="0.1" />
                    <rect x="25" y="60" width="35" height="15" fill="currentColor" opacity="0.1" />
                </svg>
            );
        case 'SM2.03': // Functions
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="15" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    <motion.path
                        d="M20 75 L50 45 L80 15"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                    />
                    <circle cx="50" cy="45" r="3" fill="currentColor" />
                </svg>
            );
        case 'GM1.01': // Calculus
        case 'GM1.01-ADV': // Calculus Advanced
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 80 Q50 10 85 80" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                    <motion.path
                        d="M15 80 Q50 10 85 80"
                        stroke="currentColor"
                        strokeWidth="3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2 }}
                    />
                    <motion.line
                        x1="30" y1="25" x2="70" y2="25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="text-neon-green"
                    />
                </svg>
            );
        case 'GM2.01': // Vectors
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.line
                        x1="20" y1="80" x2="80" y2="30"
                        stroke="currentColor"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.4, ease: "easeInOut" }}
                    />
                    <motion.polygon
                        points="80,30 76,40 88,34"
                        fill="currentColor"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                    />
                    <circle cx="20" cy="80" r="4" fill="currentColor" opacity="0.4" />
                    <motion.circle
                        cx="50" cy="55" r="3" fill="currentColor"
                        animate={{ opacity: [0.2, 0.9, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1.6 }}
                    />
                </svg>
            );
        case 'SM2.04': // Similarity
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 85 L50 20 L85 85 Z" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
                    <motion.path
                        d="M30 85 L50 45 L70 85 Z"
                        stroke="currentColor"
                        strokeWidth="3"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    />
                    <line x1="50" y1="20" x2="50" y2="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                </svg>
            );
        case 'SM2.05': // Powers & Roots
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="25" y="75" fontSize="35" fill="currentColor" fontWeight="900" style={{ fontFamily: 'monospace' }}>x</text>
                    <motion.text
                        x="55" y="45" fontSize="22" fill="currentColor" fontWeight="900" style={{ fontFamily: 'monospace' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >n</motion.text>
                    <motion.path
                        d="M20 85 L35 85 L45 25 L85 25"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity="0.3"
                        fill="none"
                    />
                </svg>
            );
        case 'SM2.06': // Linear Systems
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.line x1="20" y1="30" x2="80" y2="70" stroke="currentColor" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                    <motion.line x1="20" y1="70" x2="80" y2="30" stroke="currentColor" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                    <motion.circle
                        cx="50" cy="50" r="5" fill="currentColor"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }}
                    />
                </svg>
            );
        case 'SM2.07': // Coordinate Geometry
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="20" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="2" />
                    <line x1="20" y1="80" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
                    <motion.circle cx="45" cy="55" r="4" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} />
                    <motion.circle cx="60" cy="40" r="4" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
                    <motion.line x1="45" y1="55" x2="60" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
                </svg>
            );
        case 'SM3.02': // Trigonometry
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" />
                    <line x1="50" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    <motion.line
                        x1="50" y1="50" x2="71" y2="29"
                        stroke="currentColor" strokeWidth="3"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    />
                    <motion.circle cx="71" cy="29" r="3" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
                    <motion.path
                        d="M 60 50 A 10 10 0 0 1 65 43"
                        stroke="currentColor" strokeWidth="1.5" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }}
                    />
                </svg>
            );
        case 'SM3.04': // Logarithms
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="20" y="70" fontSize="40" fill="currentColor" fontWeight="900" style={{ fontFamily: 'monospace' }}>log</text>
                    <motion.path
                        d="M25 30 Q40 25 55 35 T85 30"
                        stroke="currentColor" strokeWidth="3" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    />
                    <line x1="20" y1="80" x2="85" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                </svg>
            );
        case 'GM4.01': // Complex Numbers
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    <motion.circle
                        cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    />
                    <motion.line
                        x1="50" y1="50" x2="68" y2="35"
                        stroke="currentColor" strokeWidth="3"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }}
                    />
                    <motion.circle cx="68" cy="35" r="4" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
                    <text x="72" y="32" fontSize="12" fill="currentColor" fontWeight="900" style={{ fontFamily: 'monospace' }}>i</text>
                </svg>
            );
        case 'GM5.01': // Matrix
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 25 L25 25 L25 75 L30 75" stroke="currentColor" strokeWidth="3" />
                    <path d="M70 25 L75 25 L75 75 L70 75" stroke="currentColor" strokeWidth="3" />
                    <motion.text x="40" y="45" fontSize="20" fill="currentColor" fontWeight="900" style={{ fontFamily: 'monospace' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>a</motion.text>
                    <motion.text x="60" y="45" fontSize="20" fill="currentColor" fontWeight="900" style={{ fontFamily: 'monospace' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>b</motion.text>
                    <motion.text x="40" y="65" fontSize="20" fill="currentColor" fontWeight="900" style={{ fontFamily: 'monospace' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>c</motion.text>
                    <motion.text x="60" y="65" fontSize="20" fill="currentColor" fontWeight="900" style={{ fontFamily: 'monospace' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>d</motion.text>
                </svg>
            );
        case 'GMS1.01': // Fractals
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M30 70 L50 30 L70 70 Z"
                        stroke="currentColor" strokeWidth="2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    />
                    <motion.path
                        d="M40 70 L50 50 L60 70 Z"
                        stroke="currentColor" strokeWidth="1.5" opacity="0.7"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }}
                    />
                    <motion.path
                        d="M45 70 L50 60 L55 70 Z"
                        stroke="currentColor" strokeWidth="1" opacity="0.5"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1 }}
                    />
                </svg>
            );
        case 'SM3.01': // Quadratics
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 20 V80 H80" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <motion.path
                        d="M25 25 Q 50 110 75 25"
                        stroke="currentColor"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                    />
                    <circle cx="50" cy="67.5" r="3" fill="currentColor" />
                </svg>
            );
        case 'SM1.01': // Areas & Volumes
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 75 L75 75 L65 45 L35 45 Z" stroke="currentColor" strokeWidth="3" />
                    <motion.path
                        d="M35 45 L45 25 L85 25 L75 45"
                        stroke="currentColor" strokeWidth="1.5" opacity="0.4"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    />
                    <path d="M75 75 L85 55 L85 25" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeDasharray="2 2" />
                </svg>
            );
        case 'SM1.02': // Data
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.rect x="25" y="65" width="12" height="20" fill="currentColor" opacity="0.3" initial={{ height: 0 }} animate={{ height: 20 }} />
                    <motion.rect x="44" y="40" width="12" height="45" fill="currentColor" opacity="0.6" initial={{ height: 0 }} animate={{ height: 45 }} />
                    <motion.rect x="63" y="55" width="12" height="30" fill="currentColor" opacity="0.9" initial={{ height: 0 }} animate={{ height: 30 }} />
                    <motion.path
                        d="M20 80 L45 50 L65 65 L85 30"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-neon-green"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                    />
                </svg>
            );
        case 'SP1.02': // Newton
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.rect
                        x="35" y="45" width="30" height="30" stroke="currentColor" strokeWidth="3"
                        animate={{ x: [35, 40, 35] }} transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <path d="M10 75 H90" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    <motion.path
                        d="M75 60 H95 M90 55 L95 60 L90 65"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-neon-green"
                        initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 5 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    />
                </svg>
            );
        case 'SP1.03': // Energy
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <motion.g
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2.6, ease: "linear" }}
                        style={{ transformOrigin: "50% 50%" }}
                    >
                        <path d="M50 30 L54 50 L50 70 L46 50 Z" fill="currentColor" opacity="0.6" />
                        <path d="M30 50 L50 54 L70 50 L50 46 Z" fill="currentColor" opacity="0.6" />
                    </motion.g>
                    <motion.circle
                        cx="50" cy="50" r="4" fill="currentColor"
                        animate={{ scale: [0.9, 1.1, 0.9] }}
                        transition={{ repeat: Infinity, duration: 1.4 }}
                    />
                </svg>
            );
        case 'SP2.02': // Circuits
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="25" width="60" height="50" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M45 20 V30 M55 20 V30" stroke="currentColor" strokeWidth="3" />
                    <motion.circle
                        r="3" fill="currentColor" className="text-neon-cyan"
                        initial={{ offset: 0 }}
                        animate={{
                            cx: [20, 80, 80, 20, 20],
                            cy: [25, 25, 75, 75, 25]
                        }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    />
                    <rect x="40" y="70" width="20" height="10" fill="currentColor" opacity="0.2" />
                </svg>
            );
        case 'SP3.01': // Optics
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="50" cy="50" rx="6" ry="35" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
                    <line x1="15" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                    <motion.path
                        d="M15 35 L50 50 L85 65"
                        stroke="currentColor"
                        className="text-neon-purple"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    />
                    <motion.path
                        d="M15 65 L50 50 L85 35"
                        stroke="currentColor"
                        className="text-neon-cyan"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    />
                </svg>
            );
        case 'SC1.01': // Chemistry - Periodic Table
        case 'SC1.02': // Chemistry - Bonding
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 20 H60 M50 20 V45 M30 85 H70 L50 45 L30 85 Z" stroke="currentColor" strokeWidth="3" />
                    <motion.path
                        d="M35 75 H65"
                        stroke="currentColor" strokeWidth="8" opacity="0.2"
                        animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <motion.circle cx="45" cy="70" r="2" fill="currentColor" animate={{ y: [0, -20], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} />
                    <motion.circle cx="55" cy="65" r="2.5" fill="currentColor" animate={{ y: [0, -15], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }} />
                </svg>
            );
        case 'SC2.01': // Reactions
        case 'SC2.02': // Acids & Bases
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35 15 H65 M50 15 V40 L70 80 H30 L50 40 Z" stroke="currentColor" strokeWidth="3" />
                    <motion.path
                        d="M35 70 H65"
                        stroke="currentColor"
                        strokeWidth="8"
                        opacity="0.2"
                        animate={{ opacity: [0.1, 0.5, 0.1] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                    />
                    <motion.circle cx="45" cy="68" r="3" fill="currentColor" animate={{ y: [0, -18], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} />
                    <motion.circle cx="55" cy="62" r="2.5" fill="currentColor" animate={{ y: [0, -14], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} />
                </svg>
            );
        case 'SP1.04': // Momentum
        case 'SP1.05': // Gravity
        case 'SP1.06': // Pressure
        case 'SP1.08': // Waves
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M15 50 Q30 30 45 50 T75 50 T105 50"
                        stroke="currentColor"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                    />
                    <motion.circle cx="45" cy="50" r="4" fill="currentColor" animate={{ x: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
                </svg>
            );
        case 'SP2.01': // Magnetism
        case 'SP2.03': // Electromagnetism
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M30 50 Q40 30 50 50 Q60 70 70 50"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                    />
                    <motion.path
                        d="M30 50 Q40 70 50 50 Q60 30 70 50"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.3 }}
                    />
                </svg>
            );
        case 'SP3.02': // Quantum
        case 'SP4.01': // Relativity
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.circle cx="50" cy="50" r="5" fill="currentColor" />
                    <motion.circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2" fill="none" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1.5, opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
                    <motion.circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1.5" fill="none" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1.5, opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} />
                </svg>
            );
        case 'GP5.01': // Thermodynamics
        case 'GP5.02': // Statistical Mechanics
        case 'GP5.03': // Kinetic Theory
        case 'GP5.04': // Heat Transfer
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="35" y="20" width="30" height="60" rx="15" stroke="currentColor" strokeWidth="3" />
                    <motion.rect x="40" y="60" width="20" height="15" fill="currentColor" animate={{ height: [15, 35, 15] }} transition={{ repeat: Infinity, duration: 2 }} />
                    <circle cx="50" cy="30" r="3" fill="currentColor" opacity="0.3" />
                    <circle cx="50" cy="40" r="3" fill="currentColor" opacity="0.5" />
                    <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.7" />
                </svg>
            );
        case 'SC1.03': // Atoms
        case 'SC1.04': // Moles
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="8" fill="currentColor" />
                    <motion.ellipse cx="50" cy="50" rx="30" ry="15" stroke="currentColor" strokeWidth="2" fill="none" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} style={{ transformOrigin: "50% 50%" }} />
                    <motion.ellipse cx="50" cy="50" rx="15" ry="30" stroke="currentColor" strokeWidth="2" fill="none" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} style={{ transformOrigin: "50% 50%" }} />
                    <motion.circle cx="80" cy="50" r="4" fill="currentColor" animate={{ cx: [80, 20, 80] }} transition={{ repeat: Infinity, duration: 3 }} />
                </svg>
            );
        case 'SC2.03': // Stoichiometry
        case 'SC2.04': // Equilibrium
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path d="M20 50 H45" stroke="currentColor" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                    <motion.path d="M55 50 H80" stroke="currentColor" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }} />
                    <motion.polygon points="55,50 50,45 50,55" fill="currentColor" initial={{ x: -10 }} animate={{ x: 0 }} />
                    <motion.polygon points="45,50 50,45 50,55" fill="currentColor" initial={{ x: 10 }} animate={{ x: 0 }} />
                    <circle cx="30" cy="50" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="70" cy="50" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
            );
        case 'SC3.01': // Organic Chemistry
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 70 L50 30 L70 70 L50 50 L30 70" stroke="currentColor" strokeWidth="3" />
                    <circle cx="30" cy="70" r="5" fill="currentColor" />
                    <circle cx="50" cy="30" r="5" fill="currentColor" />
                    <circle cx="70" cy="70" r="5" fill="currentColor" />
                    <circle cx="50" cy="50" r="5" fill="currentColor" />
                </svg>
            );
        case 'GC1.01': // Advanced Bonding
        case 'GC2.01': // Kinetics
        case 'GC3.01': // Electrochemistry
        case 'GC3.02': // Analytical Chemistry
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M25 75 Q50 25 75 75"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                    />
                    <circle cx="25" cy="75" r="6" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.3" />
                    <circle cx="75" cy="75" r="6" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.3" />
                    <motion.circle cx="50" cy="50" r="6" fill="currentColor" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
                </svg>
            );
        case 'SB1.01': // Cell Biology
        case 'SB1.01-MET': // Metabolic Pathways
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="50" cy="50" rx="35" ry="25" stroke="currentColor" strokeWidth="3" />
                    <motion.circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.5" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
                    <motion.ellipse cx="50" cy="50" rx="20" ry="12" stroke="currentColor" strokeWidth="2" fill="none" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} style={{ transformOrigin: "50% 50%" }} />
                </svg>
            );
        case 'SB2.01': // Genetics
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M30 20 Q40 40 30 60 Q20 80 30 100 M70 20 Q60 40 70 60 Q80 80 70 100"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                    />
                    <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="2" />
                    <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="2" />
                    <line x1="30" y1="70" x2="70" y2="70" stroke="currentColor" strokeWidth="2" />
                </svg>
            );
        case 'GB3.01': // Ecology
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.3" />
                    <motion.circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" fill="none" initial={{ scale: 0.5 }} animate={{ scale: 1 }} />
                    <motion.circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
                    <motion.path d="M50 20 L50 35 M50 65 L50 80 M20 50 L35 50 M65 50 L80 50" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
                </svg>
            );
        case 'SM3.03': // Exponential Growth
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 20 V80 H80" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <motion.path
                        d="M20 80 Q30 70 40 55 T60 30 T80 15"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                    />
                </svg>
            );
        case 'GM3.01': // Probability
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="20" width="60" height="60" rx="5" stroke="currentColor" strokeWidth="3" />
                    <motion.circle cx="35" cy="35" r="5" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} />
                    <motion.circle cx="50" cy="50" r="5" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
                    <motion.circle cx="65" cy="65" r="5" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} />
                    <motion.circle cx="35" cy="65" r="5" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} />
                    <motion.circle cx="65" cy="35" r="5" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
                </svg>
            );
        default:
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M40 50 L60 50 M50 40 L50 60" stroke="currentColor" strokeWidth="2" />
                </svg>
            );
    }
};

export default ConceptIcon;

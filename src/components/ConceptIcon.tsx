"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ConceptIconProps {
    code: string;
    className?: string;
}

const ConceptIcon: React.FC<ConceptIconProps> = ({ code, className }) => {
    switch (code) {
        case 'S2.02': // Pythagoras
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
        case 'S2.01': // Binomial
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="2" />
                    <motion.line x1="60" y1="25" x2="60" y2="75" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                    <motion.line x1="25" y1="60" x2="75" y2="60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                    <rect x="60" y="25" width="15" height="35" fill="currentColor" opacity="0.1" />
                    <rect x="25" y="60" width="35" height="15" fill="currentColor" opacity="0.1" />
                </svg>
            );
        case 'S2.03': // Functions
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
        case 'G1.01': // Calculus
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
        case 'G2.01':
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
        case 'S2.04': // Similarity
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
        case 'S2.05': // Powers & Roots
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
        case 'S2.06': // Linear Systems
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
        case 'S3.01': // Quadratics
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
        case 'S1.01': // Areas & Volumes
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
        case 'S1.02': // Data
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
        case 'P1.02': // Newton
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
        case 'P1.03':
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
        case 'P2.02': // Circuits
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
        case 'P3.01': // Optics
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
        case 'C1.01': // Chemistry
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
        case 'C1.02':
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

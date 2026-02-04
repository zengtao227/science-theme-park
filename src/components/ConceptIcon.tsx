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
                        d="M20 80 L80 80 L20 20 Z"
                        stroke="currentColor"
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    {/* Square projections */}
                    <rect x="20" y="80" width="60" height="2" fill="currentColor" opacity="0.3" />
                    <rect x="18" y="20" width="2" height="60" fill="currentColor" opacity="0.3" />
                </svg>
            );
        case 'S2.01': // Binomial
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="4" />
                    <line x1="60" y1="20" x2="60" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                    <line x1="20" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                </svg>
            );
        case 'S2.03': // Functions
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                    <motion.line
                        x1="20" y1="80" x2="80" y2="20"
                        stroke="currentColor"
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                    />
                </svg>
            );
        case 'G1.01': // Calculus
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M10 80 Q50 10 90 80"
                        stroke="currentColor"
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                    />
                    <motion.line
                        x1="30" y1="20" x2="70" y2="20"
                        stroke="#00ff9d"
                        strokeWidth="2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    />
                </svg>
            );
        case 'S2.04': // Similarity
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 90 L50 10 L90 90 Z" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <motion.path
                        d="M30 90 L50 50 L70 90 Z"
                        stroke="currentColor"
                        strokeWidth="4"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    />
                </svg>
            );
        default:
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
            );
    }
};

export default ConceptIcon;

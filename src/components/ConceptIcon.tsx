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
        case 'S2.05': // Powers & Roots
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="20" y="70" fontSize="40" fill="currentColor" fontWeight="bold">x</text>
                    <text x="50" y="40" fontSize="25" fill="currentColor" fontWeight="bold">n</text>
                    <motion.path
                        d="M10 80 Q 50 20 90 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        opacity="0.5"
                        strokeDasharray="4 4"
                    />
                </svg>
            );
        case 'S2.06': // Linear Systems
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="3" />
                    <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" strokeWidth="3" />
                    <circle cx="50" cy="50" r="6" fill="currentColor" />
                </svg>
            );
        case 'S3.01': // Quadratics
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 10 V90 H90" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                    <motion.path
                        d="M20 20 Q 50 90 80 20"
                        stroke="currentColor"
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                    />
                </svg>
            );
        case 'S1.01': // Areas & Volumes
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 80 L80 80 L70 40 L30 40 Z" stroke="currentColor" strokeWidth="4" />
                    <path d="M30 40 L40 20 L80 20 L70 40" stroke="currentColor" strokeWidth="2" opacity="0.5" strokeDasharray="4 2" />
                    <path d="M80 80 L90 60 L80 20" stroke="currentColor" strokeWidth="2" opacity="0.5" strokeDasharray="4 2" />
                </svg>
            );
        case 'S1.02': // Data
            return (
                <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="60" width="15" height="30" fill="currentColor" opacity="0.4" />
                    <rect x="42" y="30" width="15" height="60" fill="currentColor" opacity="0.7" />
                    <rect x="64" y="50" width="15" height="40" fill="currentColor" opacity="0.9" />
                    <motion.line
                        x1="10" y1="70" x2="90" y2="20"
                        stroke="#00ff9d"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
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

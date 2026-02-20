"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";
import { clsx } from "clsx";

type AlertType = "info" | "warning" | "success" | "error";

interface HUDAlertProps {
    type?: AlertType;
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}

const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: XCircle,
};

const styles = {
    info: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.1)]",
    warning: "bg-orange-500/10 border-orange-500/30 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.1)]",
    success: "bg-green-500/10 border-green-500/30 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]",
    error: "bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]",
};

export default function HUDAlert({
    type = "info",
    title,
    description,
    children,
    className
}: HUDAlertProps) {
    const Icon = icons[type];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx(
                "w-full p-4 rounded-xl border flex flex-col gap-2 transition-all duration-500",
                styles[type],
                className
            )}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-black tracking-[0.3em] uppercase">
                        {title}
                    </span>
                </div>
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-current opacity-40 rounded-full" />
                    <div className="w-1 h-1 bg-current opacity-20 rounded-full" />
                </div>
            </div>

            {description && (
                <p className="text-[10px] text-white/70 leading-relaxed font-medium">
                    {description}
                </p>
            )}

            {children && (
                <div className="mt-1">
                    {children}
                </div>
            )}
        </motion.div>
    );
}

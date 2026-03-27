"use client";

import { Info, AlertCircle, Lightbulb, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface CalloutProps {
    type: 'tip' | 'info' | 'warning' | 'summary';
    text: string;
    accentColor: string;
}

export function HighImpactCallout({ type, text, accentColor }: CalloutProps) {
    const icons = {
        tip: <Lightbulb className="w-6 h-6" />,
        info: <Info className="w-6 h-6" />,
        warning: <AlertCircle className="w-6 h-6" />,
        summary: <Zap className="w-6 h-6" />
    };

    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="my-10 p-10 rounded-[40px] border-l-8 relative overflow-hidden shadow-2xl bg-white dark:bg-slate-900"
            style={{ borderLeftColor: accentColor }}
        >
            {/* Background Accent Gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

            <div className="flex items-center gap-6 mb-6">
                <div
                    className="w-12 h-12 flex items-center justify-center rounded-2xl text-white shadow-lg rotate-3"
                    style={{ backgroundColor: accentColor }}
                >
                    {icons[type]}
                </div>
                <h4 className="text-xs font-black uppercase tracking-[0.4em] opacity-40">
                    {type === 'tip' ? 'Pro Insight' : (type === 'summary' ? 'Key Summary' : 'Important')}
                </h4>
            </div>

            <p className="text-lg font-medium leading-relaxed opacity-90 italic">
                "{text}"
            </p>

            <div className="mt-8 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/20" />
                <div className="w-2 h-2 rounded-full bg-primary/20" />
                <div className="w-20 h-2 rounded-full bg-primary/10" />
            </div>
        </motion.div>
    );
}

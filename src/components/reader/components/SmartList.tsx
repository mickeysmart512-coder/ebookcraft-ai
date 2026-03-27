"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface SmartListProps {
    items: string[];
    accentColor: string;
}

export function SmartList({ items, accentColor }: SmartListProps) {
    return (
        <div className="my-12 space-y-4">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-primary/5 shadow-sm group hover:shadow-md transition-all"
                >
                    <div
                        className="mt-1 w-6 h-6 flex items-center justify-center rounded-full text-white shadow-lg"
                        style={{ backgroundColor: accentColor }}
                    >
                        {isNaN(parseInt(item[0])) ? (
                            <CheckCircle2 className="w-4 h-4" />
                        ) : (
                            <span className="text-[10px] font-black">{i + 1}</span>
                        )}
                    </div>
                    <p className="flex-1 text-base font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.replace(/^\d+\.\s*|-\s*/, '')}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}

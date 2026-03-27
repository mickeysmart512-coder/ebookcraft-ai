"use client";

import { EbookTemplate } from "@/lib/templates";
import { motion } from "framer-motion";
import { ContentRenderer } from "../components/ContentRenderer";

interface LayoutProps {
    content: string;
    title: string;
    template: EbookTemplate;
    fontSize: number;
    isDarkMode: boolean;
    currentPage: number;
    totalPages: number;
}

export function ModernSidebar({ content, title, template, fontSize, isDarkMode, currentPage, totalPages }: LayoutProps) {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen relative overflow-hidden bg-white dark:bg-slate-950">
            {/* Background Decorative Patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none" />

            {/* Visual Sidebar */}
            <aside
                className="w-full lg:w-[450px] relative overflow-hidden flex flex-col p-12 lg:p-24 shadow-2xl z-20 min-h-[40vh] lg:min-h-screen"
                style={{ backgroundColor: template.styles.primaryColor }}
            >
                {/* Texture Overlay */}
                <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
                    <img src="/ebook-assets/texture.png" className="w-full h-full object-cover" alt="Texture" />
                </div>

                {/* Decorative Dot Grid */}
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <div className="grid grid-cols-6 gap-3">
                        {[...Array(36)].map((_, i) => (
                            <div key={i} className="w-1 h-1 rounded-full bg-white" />
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mt-auto">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[1em] mb-10 block text-white/40">Edition Alpha</span>
                        <h1
                            className="text-6xl lg:text-8xl font-black leading-[0.8] tracking-tighter mb-12 text-white"
                            style={{ fontFamily: template.styles.headingFont }}
                        >
                            {title}
                        </h1>

                        <div className="flex items-center gap-6">
                            <div className="w-12 h-1 bg-white/20 rounded-full" />
                            <span className="text-xl font-medium text-white/60 italic">Section {currentPage + 1}</span>
                        </div>
                    </motion.div>
                </div>
            </aside>

            {/* Content Pane */}
            <main className="flex-1 p-8 md:p-16 lg:p-32 overflow-y-auto relative z-10">
                <div
                    className="max-w-2xl mx-auto"
                    style={{ fontFamily: template.styles.fontFamily }}
                >
                    <ContentRenderer
                        content={content}
                        accentColor={template.styles.accent}
                        templateCategory={template.category}
                    />
                </div>
            </main>

            <style jsx global>{`
                .dropcap::first-letter {
                    float: left;
                    font-size: 8rem;
                    line-height: 0.7;
                    padding: 0.5rem 1rem 0.5rem 0;
                    font-weight: 900;
                    color: ${template.styles.accent};
                    font-family: ${template.styles.headingFont};
                }
            `}</style>
        </div>
    );
}

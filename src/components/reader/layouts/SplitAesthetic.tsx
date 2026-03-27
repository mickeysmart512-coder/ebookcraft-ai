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

export function SplitAesthetic({ content, title, template, fontSize, isDarkMode, currentPage, totalPages }: LayoutProps) {


    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#fffcf7] dark:bg-slate-950">
            {/* Visual Side (Left on Desktop) */}
            <div className="w-full md:w-1/2 lg:w-2/5 min-h-[40vh] md:min-h-screen relative overflow-hidden flex flex-col justify-end p-12 lg:p-24">
                {/* Background Image with Parallax-ready framing */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/ebook-assets/cover.png"
                        className="w-full h-full object-cover grayscale-[0.2] brightness-75 hover:grayscale-0 transition-all duration-1000"
                        alt="Ebook Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/40 via-transparent to-black/20" />
                </div>

                {/* Glassmorphic Overlay for Text */}
                <div className="relative z-10 backdrop-blur-md bg-white/10 p-10 rounded-[40px] border border-white/20 shadow-2xl">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <h3 className="text-[10px] font-black uppercase tracking-[0.6em] mb-6 text-white/60">
                            The Design Collection
                        </h3>
                        <h1
                            className="text-5xl lg:text-7xl font-black leading-[0.9] mb-8 text-white"
                            style={{ fontFamily: template.styles.headingFont }}
                        >
                            {title}
                        </h1>
                        <div className="flex items-center gap-10">
                            <div className="h-px flex-1 bg-white/30" />
                            <span className="text-4xl font-serif italic text-white/40">{currentPage + 1}</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Side (Right on Desktop) */}
            <main className="flex-1 p-8 md:p-16 lg:p-32 overflow-y-auto bg-white/50 backdrop-blur">
                <div
                    className="max-w-xl mx-auto"
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
                    font-size: 5rem;
                    line-height: 0.7;
                    padding: 0.5rem 0.75rem 0.5rem 0;
                    font-weight: 300;
                    font-style: italic;
                    color: ${template.styles.accent};
                    font-family: ${template.styles.headingFont};
                }
            `}</style>
        </div>
    );
}

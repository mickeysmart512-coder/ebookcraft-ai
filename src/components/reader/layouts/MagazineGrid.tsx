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

export function MagazineGrid({ content, title, template, fontSize, isDarkMode, currentPage, totalPages }: LayoutProps) {
    const paragraphs = content.split('\n').filter(p => p.trim().length > 0);

    return (
        <div className="min-h-screen p-8 md:p-16 lg:p-24 bg-white dark:bg-slate-950 relative overflow-hidden">
            {/* Editorial Background Accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" style={{ backgroundColor: template.styles.accent }} />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

            {/* Magazine Header with High Contrast */}
            <header className="max-w-6xl mx-auto mb-32 relative z-10">
                <div className="flex items-center gap-10 mb-12">
                    <div className="h-px flex-1 bg-primary/20" />
                    <span className="text-[11px] font-black uppercase tracking-[1.2em] opacity-30 whitespace-nowrap">The Editorial Collection</span>
                    <div className="h-px flex-1 bg-primary/20" />
                </div>

                <h1
                    className="text-8xl md:text-[140px] font-black leading-[0.8] tracking-tighter mb-12 text-center"
                    style={{ fontFamily: template.styles.headingFont, color: template.styles.primaryColor }}
                >
                    {title}
                </h1>

                <div className="flex justify-center items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                    <span className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: template.styles.accent }} />
                        Published by EbookCraft
                    </span>
                    <span className="w-1 h-1 rounded-full bg-primary/20" />
                    <span>Page {currentPage + 1} of {totalPages}</span>
                </div>
            </header>

            {/* Two-Column Grid Content with Sidebar Elements */}
            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
                {/* Left Column (Main Text) */}
                <div
                    className="lg:col-span-8 max-w-none"
                    style={{ fontFamily: template.styles.fontFamily }}
                >
                    <ContentRenderer
                        content={content}
                        accentColor={template.styles.accent}
                        templateCategory={template.category}
                    />
                </div>

                {/* Right Column (Insights & Accents) */}
                <div className="lg:col-span-4 space-y-16">
                    <div className="border-t-4 border-primary pt-8" style={{ borderColor: template.styles.accent }}>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6">Key Insights</h4>
                        <div className="space-y-6">
                            {paragraphs.slice(Math.ceil(paragraphs.length / 1.5)).map((para, i) => (
                                <p key={i} className="text-sm leading-relaxed opacity-70 italic relative pl-6">
                                    <span className="absolute left-0 top-0 text-2xl leading-none opacity-20">"</span>
                                    {para.substring(0, 150)}...
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Highly Designed Callout Box */}
                    <div className="p-10 bg-primary/5 rounded-[40px] border-2 border-primary/10 shadow-inner relative overflow-hidden group hover:bg-primary/10 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <div className="w-20 h-20 rounded-full bg-primary" style={{ backgroundColor: template.styles.accent }} />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-40">Pro Tip</h4>
                        <p className="text-sm font-medium leading-relaxed" style={{ color: template.styles.primaryColor }}>
                            "This layout is engineered for maximum authority. The asymmetrical grid and bold typography mirror high-end industry journals."
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer with Structural Integrity */}
            <footer className="max-w-6xl mx-auto mt-32 pt-12 border-t flex justify-between items-end opacity-30 text-[9px] font-black uppercase tracking-[0.5em]">
                <div className="flex flex-col gap-2">
                    <span>EbookCraft AI Platform</span>
                    <span>All Rights Reserved 2026</span>
                </div>
                <div className="text-right">
                    <span>{title}</span>
                </div>
            </footer>

            <style jsx global>{`
                .dropcap::first-letter {
                    float: left;
                    font-size: 8rem;
                    line-height: 0.75;
                    padding: 0.1rem 0.75rem 0rem 0;
                    margin-top: 0.5rem;
                    font-weight: 900;
                    color: ${template.styles.accent};
                    font-family: ${template.styles.headingFont};
                    border-bottom: 8px solid ${template.styles.accent}20;
                }
            `}</style>
        </div>
    );
}

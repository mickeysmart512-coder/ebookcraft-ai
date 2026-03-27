"use client";

import { EbookTemplate } from "@/lib/templates";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface LayoutProps {
    content: string;
    title: string;
    template: EbookTemplate;
    fontSize: number;
    isDarkMode: boolean;
    currentPage: number;
    totalPages: number;
}

export function MinimalistChecklist({ content, title, template, fontSize, isDarkMode, currentPage, totalPages }: LayoutProps) {
    const lines = content.split('\n').filter(l => l.trim().length > 0);

    // Detect special page types
    const isCover = content === "COVER_PAGE_MARKER";
    const isTOC = content.toLowerCase().includes("table of contents");

    // A4 Optimization Wrapper: Centered "Paper" look
    return (
        <div className="flex justify-center p-2 w-full overflow-x-hidden selection:bg-[#cec2b5]/30">
            <div
                className="bg-[#fff9f5] shadow-[0_45px_90px_rgba(0,0,0,0.18)] relative overflow-hidden flex flex-col transform origin-top transition-all duration-500 scale-[0.75] md:scale-90 lg:scale-100"
                style={{
                    width: '210mm',
                    height: '297mm',
                    margin: '0 auto'
                }}
            >
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f5ede6] rounded-full blur-[130px] -mr-40 -mt-40 opacity-40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f5ede6] rounded-full blur-[110px] -ml-20 -mb-20 opacity-30 pointer-events-none" />

                {isCover ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center relative z-10">
                        <div className="w-full max-w-lg aspect-[3/4] bg-slate-800 shadow-2xl relative overflow-hidden rounded-sm group mb-12 border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1602871126344-97eafcbc70f5?q=80&w=1000&auto=format&fit=crop"
                                className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
                                alt="Cover Background"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="border-2 border-white/40 p-10 backdrop-blur-sm"
                                >
                                    <h1 className="text-4xl font-serif text-white tracking-[0.2em] mb-6 leading-tight uppercase">
                                        CANDLE MAKING<br />WITH PRESHY
                                    </h1>
                                    <div className="w-20 h-[1px] bg-white/60 mx-auto mb-6" />
                                    <p className="text-[10px] font-black tracking-[0.5em] text-white/80 uppercase">Master Induction Series</p>
                                </motion.div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[1em] text-[#cec2b5]">EbookCraft Platform</p>
                            <h2 className="text-xl font-serif italic text-slate-800 tracking-wide">Sale-Ready Guide</h2>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 p-14 md:p-18 flex flex-col relative z-10 overflow-hidden">
                        {/* Page Header */}
                        <header className="mb-10 shrink-0">
                            {isTOC ? (
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-left"
                                >
                                    <span className="text-[11px] font-black uppercase tracking-[1em] text-[#cec2b5] mb-2 block font-serif italic">Archive Index</span>
                                    <h1 className="text-6xl font-light tracking-tighter mb-6 text-slate-900 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Contents
                                    </h1>
                                    <div className="w-full h-[2px] bg-slate-900/10 mb-2" />
                                    <div className="w-1/3 h-[1px] bg-[#cec2b5] mb-6" />
                                </motion.div>
                            ) : (
                                <div className="flex items-center justify-between border-b border-[#f5ede6] pb-5 mb-12">
                                    <div className="flex items-center gap-4 text-[10px] uppercase font-black tracking-[0.5em] text-[#cec2b5]">
                                        <span>Induction Review</span>
                                        <span className="opacity-30">/</span>
                                        <span className="text-slate-500">{title}</span>
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-[#cec2b5] opacity-50">Edition 1.1</div>
                                </div>
                            )}
                        </header>

                        <div className="grid grid-cols-12 gap-10 flex-1 overflow-hidden relative">
                            {/* Content Column */}
                            <div className={`${isTOC ? 'col-span-12 columns-3 gap-16' : 'col-span-8'} space-y-7`}>
                                {lines.map((line, i) => {
                                    const trimmed = line.trim();

                                    // Special TOC Headers
                                    const isPartHeader = trimmed.startsWith('PART');
                                    const isChapterNum = trimmed.startsWith('Chapter');
                                    const isTildeHeader = trimmed.startsWith('~') && trimmed.endsWith('~');

                                    if (isPartHeader && isTOC) {
                                        return (
                                            <div key={i} className="mb-6 mt-4 break-inside-avoid">
                                                <div className="text-[12px] font-black text-slate-900 border-b-4 border-[#cec2b5] pb-2 mb-4 uppercase tracking-[0.2em]">
                                                    {trimmed}
                                                </div>
                                            </div>
                                        );
                                    }

                                    if (isChapterNum && isTOC) {
                                        return (
                                            <div key={i} className="mb-3 break-inside-avoid text-[10px] font-bold text-slate-600 uppercase tracking-widest border-l-2 border-[#f5ede6] pl-3">
                                                {trimmed}
                                            </div>
                                        );
                                    }

                                    if (isTildeHeader) {
                                        const headerText = trimmed.replace(/~/g, '').trim();
                                        if (isTOC && headerText.toLowerCase().includes("contents")) return null;

                                        return (
                                            <div key={i} className="pt-6 first:pt-0 break-inside-avoid shrink-0">
                                                <div className="bg-[#f5ede6] py-3 px-8 inline-block mb-6 rounded-sm border-l-8 border-[#cec2b5] shadow-sm">
                                                    <h3 className="text-sm font-black uppercase tracking-[0.5em] text-slate-900">
                                                        {headerText}
                                                    </h3>
                                                </div>
                                            </div>
                                        );
                                    }

                                    // Lists
                                    if (trimmed.startsWith('●') || trimmed.startsWith('•') || trimmed.startsWith('○') || /^\d+\./.test(trimmed)) {
                                        return (
                                            <div key={i} className={`flex items-start gap-4 ${trimmed.startsWith('○') ? 'pl-8' : 'pl-2'} group break-inside-avoid`}>
                                                <div className={`mt-1.5 ${trimmed.startsWith('○') ? 'w-2.5 h-2.5 rounded-full border-[1.5px]' : 'w-3 h-3 rounded-sm border-[2px] shadow-sm'} border-slate-300 shrink-0 bg-white group-hover:border-[#cec2b5] transition-colors`} />
                                                <p className={`${isTOC ? 'text-[9.5px]' : 'text-[14px]'} text-slate-800 font-medium leading-tight`}>
                                                    {trimmed.replace(/^[●•○]\s*|\d+\.\s*/, '')}
                                                </p>
                                            </div>
                                        );
                                    }

                                    // Paragraphs
                                    if (trimmed.length > 0) {
                                        if (isTOC && trimmed.toLowerCase().includes("contents")) return null;
                                        return (
                                            <p key={i} className="text-[14px] leading-[1.8] text-slate-700 text-justify font-serif opacity-95">
                                                {trimmed}
                                            </p>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            {/* Sidebar */}
                            {!isTOC && (
                                <aside className="col-span-4 space-y-10 border-l border-[#f5ede6] pl-8">
                                    <div className="bg-white/40 p-6 border border-slate-100 rounded-[30px] backdrop-blur-sm shadow-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-12 h-12 bg-[#f5ede6] rounded-bl-full flex items-center justify-center">
                                            <Plus className="w-4 h-4 text-[#cec2b5]" />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#cec2b5] mb-4 block">Manual Insight</span>
                                        <p className="text-[12px] italic font-serif leading-relaxed text-slate-600">
                                            "Experience the pour. Every candle is a moment of craft."
                                        </p>
                                    </div>

                                    <div className="flex-1 flex items-end justify-center pb-12 opacity-15 select-none">
                                        <div className="text-center">
                                            <div className="text-[70px] font-serif italic text-[#cec2b5] leading-none mb-3">
                                                {String(currentPage).padStart(2, '0')}
                                            </div>
                                            <div className="text-[8px] font-black uppercase tracking-[1.5em] text-[#cec2b5]">Archive Method</div>
                                        </div>
                                    </div>
                                </aside>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="h-14 px-20 flex justify-between items-center bg-white/20 border-t border-[#f5ede6] text-[9px] font-medium tracking-[0.6em] text-slate-400 shrink-0">
                    <div className="flex items-center gap-5">
                        <span className="w-12 h-[1px] bg-[#cec2b5]/30" />
                        <span className="uppercase text-[8px] font-black text-slate-300">Edition 1.1</span>
                    </div>
                    <div>
                        <span className="text-slate-900 font-black px-6 py-2">P. {currentPage}</span>
                    </div>
                </footer>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600&display=swap');
                body {
                    background-color: #f1f5f9 !important;
                }
            `}</style>
        </div>
    );
}

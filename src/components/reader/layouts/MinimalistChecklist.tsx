"use client";

import { EbookTemplate } from "@/lib/templates";
import { motion } from "framer-motion";
import { Plus, ShieldAlert, Lightbulb, Grid3X3 } from "lucide-react";

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
    // Detect special page types
    const isCover = content === "COVER_PAGE_MARKER";
    const isTOC = content.toLowerCase().includes("archive index");
    const isPartDivider = content.includes("[PART]");

    // A4 Optimization Wrapper
    return (
        <div className="flex justify-center p-2 w-full overflow-x-hidden selection:bg-[#cec2b5]/30 print:p-0 print:m-0 print:block">
            <div
                className="bg-[#fff9f5] shadow-[0_45px_90px_rgba(0,0,0,0.18)] relative overflow-hidden flex flex-col transform origin-top transition-all duration-500 scale-[0.75] md:scale-90 lg:scale-100 border border-slate-200 print:shadow-none print:border-none print:scale-100 print:m-0 print:w-[210mm] print:h-[297mm] print:bg-white print:relative print:overflow-hidden print:page-break-after-always"
                style={{
                    width: '210mm',
                    height: '297mm',
                }}
            >
                {/* Background Accents (Hidden in print to save ink/keep clean) */}
                {!isPartDivider && (
                    <>
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f5ede6] rounded-full blur-[130px] -mr-40 -mt-40 opacity-40 pointer-events-none print:hidden" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f5ede6] rounded-full blur-[110px] -ml-20 -mb-20 opacity-30 pointer-events-none print:hidden" />
                    </>
                )}

                {isCover ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center relative z-10 print:p-0">
                        <div className="w-full max-w-lg aspect-[3/4] bg-slate-800 shadow-2xl relative overflow-hidden rounded-sm group mb-12 border-8 border-white print:border-slate-200">
                            <img
                                src="https://images.unsplash.com/photo-1602871126344-97eafcbc70f5?q=80&w=1000&auto=format&fit=crop"
                                className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
                                alt="Cover Background"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="border-2 border-white/40 p-10 backdrop-blur-sm print:border-slate-800/20"
                                >
                                    <h1 className="text-4xl font-serif text-white tracking-[0.2em] mb-6 leading-tight uppercase print:text-slate-900">
                                        CANDLE MAKING<br />WITH PRESHY
                                    </h1>
                                    <div className="w-20 h-[1px] bg-white/60 mx-auto mb-6 print:bg-slate-900/20" />
                                    <p className="text-[10px] font-black tracking-[0.5em] text-white/80 uppercase print:text-slate-500">Master Induction Series</p>
                                </motion.div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[1em] text-[#cec2b5] print:text-slate-400">EbookCraft Platform</p>
                            <h2 className="text-xl font-serif italic text-slate-800 tracking-wide">Ibenu Precious</h2>
                        </div>
                    </div>
                ) : isPartDivider ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 bg-slate-900 text-white relative print:bg-slate-900 print:text-white print:-m-1">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#cec2b5]" />
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-center"
                        >
                            <span className="text-[14px] font-black uppercase tracking-[1em] text-[#cec2b5] mb-8 block">New Phase</span>
                            <h2 className="text-7xl font-light tracking-tighter mb-12 italic font-serif">
                                {content.replace(/\[PART\]|\[\/PART\]/g, '').trim()}
                            </h2>
                            <div className="w-32 h-[2px] bg-[#cec2b5] mx-auto opacity-30" />
                        </motion.div>
                    </div>
                ) : (
                    <div className="flex-1 p-14 md:p-18 flex flex-col relative z-10 overflow-hidden print:p-16">
                        {/* Page Header */}
                        <header className="mb-10 shrink-0">
                            {isTOC ? (
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-left"
                                >
                                    <span className="text-[11px] font-black uppercase tracking-[1em] text-[#cec2b5] mb-2 block font-serif italic print:text-slate-400">Digital Publication</span>
                                    <h1 className="text-6xl font-light tracking-tighter mb-6 text-slate-900 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Archive Index
                                    </h1>
                                    <div className="w-full h-[2px] bg-slate-900/10 mb-2" />
                                    <div className="w-1/3 h-[1px] bg-[#cec2b5] mb-6" />
                                </motion.div>
                            ) : (
                                <div className="flex items-center justify-between border-b border-[#f5ede6] pb-5 mb-12 print:border-slate-100">
                                    <div className="flex items-center gap-4 text-[10px] uppercase font-black tracking-[0.5em] text-[#cec2b5] print:text-slate-400">
                                        <span>Induction Review</span>
                                        <span className="opacity-30">/</span>
                                        <span className="text-slate-500">{title}</span>
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-[#cec2b5] opacity-50 print:hidden">Edition 1.3</div>
                                </div>
                            )}
                        </header>

                        <div className="grid grid-cols-12 gap-10 flex-1 overflow-hidden relative">
                            {/* Content Column */}
                            <div className={`${isTOC ? 'col-span-12 columns-3 gap-16 print:columns-2 print:gap-12' : 'col-span-8'} space-y-7`}>
                                {content.split('\n').filter(l => l.trim().length > 0).map((line, i) => {
                                    const trimmed = line.trim();

                                    // Grid Parsing
                                    if (trimmed.startsWith('[GRID]')) {
                                        const gridMatch = content.match(/\[GRID\]([\s\S]*?)\[\/GRID\]/);
                                        if (gridMatch) {
                                            const gridContent = gridMatch[1].trim();
                                            const rows = gridContent.split('\n').map(r => r.split('|').map(c => c.trim()));
                                            return (
                                                <div key={i} className="my-10 border rounded-sm overflow-hidden shadow-sm bg-white print:shadow-none print:my-6 print:break-inside-avoid">
                                                    <div className="bg-slate-900 text-white p-4 flex items-center gap-3">
                                                        <Grid3X3 className="w-4 h-4 text-[#cec2b5]" />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">30-Day Execution Plan</span>
                                                    </div>
                                                    <table className="w-full text-left text-[11px] border-collapse">
                                                        <thead>
                                                            <tr className="bg-slate-50 border-b print:bg-slate-100">
                                                                {rows[0].map((h, hi) => (
                                                                    <th key={hi} className="p-4 font-black uppercase tracking-widest text-slate-500 border-r last:border-r-0">{h}</th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {rows.slice(1).map((row, ri) => (
                                                                <tr key={ri} className="border-b last:border-b-0 group hover:bg-slate-50/50 transition-colors">
                                                                    {row.map((cell, ci) => (
                                                                        <td key={ci} className="p-4 text-slate-700 font-medium border-r last:border-r-0">{cell}</td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }
                                    if (trimmed.includes('|') || trimmed === '[/GRID]') return null;

                                    // Special TOC Headers
                                    const isPartHeader = trimmed.startsWith('PART');
                                    const isChapterNum = trimmed.startsWith('Chapter');
                                    const isTildeHeader = trimmed.startsWith('~') && trimmed.endsWith('~');

                                    if (isTOC) {
                                        if (isPartHeader) {
                                            return (
                                                <div key={i} className="mb-6 mt-4 break-inside-avoid">
                                                    <div className="text-[12px] font-black text-slate-900 border-b-4 border-[#cec2b5] pb-2 mb-4 uppercase tracking-[0.2em]">
                                                        {trimmed}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        if (isChapterNum) {
                                            return (
                                                <div key={i} className="mb-2 break-inside-avoid text-[10px] font-bold text-slate-700 uppercase tracking-widest pl-3 border-l-2 border-slate-200">
                                                    {trimmed}
                                                </div>
                                            );
                                        }
                                        if (!isTildeHeader) {
                                            return (
                                                <div key={i} className="mb-1 break-inside-avoid text-[9px] text-slate-500 font-medium pl-6 opacity-80 italic">
                                                    {trimmed}
                                                </div>
                                            );
                                        }
                                        return null;
                                    }

                                    // [SAFETY] Block
                                    if (trimmed.startsWith('[SAFETY]')) {
                                        return (
                                            <div key={i} className="my-8 bg-red-50 border-l-8 border-red-500 p-8 rounded-sm shadow-sm flex gap-6 items-start print:shadow-none print:break-inside-avoid print:bg-white print:border-red-400">
                                                <div className="p-3 bg-red-500 rounded-full shrink-0 print:bg-red-500">
                                                    <ShieldAlert className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 mb-2 block">Critical Safety Rule</span>
                                                    <p className="text-[13px] font-bold text-red-900 leading-relaxed italic">
                                                        {trimmed.replace(/\[SAFETY\]|\[\/SAFETY\]/g, '')}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }

                                    // [TIP] Block
                                    if (trimmed.startsWith('[TIP]')) {
                                        return (
                                            <div key={i} className="my-8 bg-[#f5ede6] border-2 border-dashed border-[#cec2b5] p-8 rounded-xl shadow-inner flex gap-6 items-start print:shadow-none print:break-inside-avoid print:bg-white print:border-slate-200">
                                                <div className="p-3 bg-white rounded-full border border-slate-100 shadow-sm shrink-0">
                                                    <Lightbulb className="w-5 h-5 text-[#cec2b5]" />
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 block">Preshy's Professional Tip</span>
                                                    <p className="text-[14px] font-serif italic text-slate-700 leading-relaxed">
                                                        {trimmed.replace(/\[TIP\]|\[\/TIP\]/g, '')}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }

                                    if (isTildeHeader) {
                                        const headerText = trimmed.replace(/~/g, '').trim();
                                        if (headerText.toLowerCase().includes("archive index")) return null;

                                        return (
                                            <div key={i} className="pt-6 first:pt-0 break-inside-avoid shrink-0">
                                                <div className="bg-[#f5ede6] py-3 px-8 inline-block mb-6 rounded-sm border-l-8 border-[#cec2b5] shadow-sm print:bg-slate-50 print:shadow-none print:border-slate-900">
                                                    <h3 className="text-sm font-black uppercase tracking-[0.5em] text-slate-900">
                                                        {headerText.toUpperCase()}
                                                    </h3>
                                                </div>
                                            </div>
                                        );
                                    }

                                    // Lists
                                    if (trimmed.startsWith('●') || trimmed.startsWith('•') || trimmed.startsWith('○') || /^\d+\./.test(trimmed)) {
                                        return (
                                            <div key={i} className="flex items-start gap-4 pl-2 break-inside-avoid">
                                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#cec2b5] shrink-0 print:bg-slate-400" />
                                                <p className="text-[14px] text-slate-800 font-medium leading-relaxed">
                                                    {trimmed.replace(/^[●•○]\s*|\d+\.\s*/, '')}
                                                </p>
                                            </div>
                                        );
                                    }

                                    // Elite Paragraph Flow
                                    if (trimmed.length > 0) {
                                        if (trimmed.startsWith('[') && trimmed.endsWith(']')) return null;

                                        return (
                                            <p key={i} className="text-[15px] leading-[1.8] text-slate-800 text-justify font-serif opacity-95 print:text-[12pt] print:leading-[1.6]">
                                                {trimmed}
                                            </p>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            {/* Sidebar */}
                            {!isTOC && (
                                <aside className="col-span-4 space-y-10 border-l border-[#f5ede6] pl-8 flex flex-col h-full print:border-slate-100">
                                    <div className="bg-white/40 p-6 border border-slate-100 rounded-[20px] backdrop-blur-sm shadow-sm relative overflow-hidden group print:shadow-none print:bg-slate-50/50 print:break-inside-avoid">
                                        <div className="absolute top-0 right-0 w-12 h-12 bg-[#f5ede6] rounded-bl-full flex items-center justify-center print:hidden">
                                            <Plus className="w-4 h-4 text-[#cec2b5]" />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#cec2b5] mb-4 block print:text-slate-400">Archive Insight</span>
                                        <p className="text-[12px] italic font-serif leading-relaxed text-slate-600">
                                            "Experience the pour. Every candle is a moment of craft."
                                        </p>
                                    </div>

                                    <div className="flex-1 flex items-end justify-center pb-12 opacity-15 select-none mt-auto print:opacity-30">
                                        <div className="text-center">
                                            <div className="text-[70px] font-serif italic text-[#cec2b5] leading-none mb-3 print:text-slate-400">
                                                {String(currentPage).padStart(2, '0')}
                                            </div>
                                            <div className="text-[8px] font-black uppercase tracking-[1.5em] text-[#cec2b5] print:text-slate-400">Project Induction</div>
                                        </div>
                                    </div>
                                </aside>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="h-14 px-20 flex justify-between items-center bg-white/20 border-t border-[#f5ede6] text-[9px] font-medium tracking-[0.6em] text-slate-400 shrink-0 print:px-16 print:border-slate-100">
                    <div className="flex items-center gap-5">
                        <span className="w-12 h-[1px] bg-[#cec2b5]/30" />
                        <span className="uppercase text-[8px] font-black text-slate-300">Edition 1.3</span>
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
                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0mm;
                    }
                    body {
                        background: white !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .A4-page {
                        display: block !important;
                        page-break-after: always !important;
                        break-after: page !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 210mm !important;
                        height: 297mm !important;
                    }
                    /* Hide everything EXCEPT the print container */
                    body > *:not(.print-container) {
                        display: none !important;
                    }
                    /* If using Next.js __next or similar wrappers, target them */
                    #__next > *:not(.print-container) {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}

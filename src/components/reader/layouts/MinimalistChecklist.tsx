import React from 'react';
import { Playfair_Display, Poppins, Inter } from 'next/font/google';
import { ShieldAlert, Lightbulb, BookOpen, Layers, ChevronRight } from 'lucide-react';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

interface MinimalistLayoutProps {
    title: string;
    subtitle: string;
    author: string;
    content: string;
}

export const MinimalistChecklist: React.FC<MinimalistLayoutProps> = ({ title, subtitle, author, content }) => {
    const lines = content.split('\n');
    const isTOC = content.toLowerCase().includes('archive index') || content.toLowerCase().includes('table of contents');

    return (
        <div className={`min-h-[297mm] w-[210mm] bg-[#f6f3ec] p-[20mm] mx-auto shadow-2xl relative overflow-hidden print:shadow-none print:m-0 print:w-full ${poppins.className}`}>
            {/* Elegant Border Decoration */}
            <div className="absolute inset-4 border border-[#cec2b5]/30 pointer-events-none" />
            <div className="absolute inset-6 border-2 border-[#cec2b5]/10 pointer-events-none" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[#8B5A2B]/20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[#8B5A2B]/20 pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col">
                {/* Header Decoration */}
                <div className="flex justify-between items-center mb-12 opacity-40">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-light text-[#8B5A2B]">EbookCraft AI Elite</span>
                    <div className="h-[1px] flex-grow mx-4 bg-[#cec2b5]" />
                    <span className="text-[9px] uppercase tracking-[0.4em] font-light text-[#8B5A2B]">Candle Making Masterclass</span>
                </div>

                <div className="flex-grow">
                    {/* Content Logic */}
                    {lines.map((line, i) => {
                        const trimmed = line.trim();
                        if (!trimmed && !isTOC) return <div key={i} className="h-4" />;
                        if (!trimmed && isTOC) return null;

                        // Flags
                        const isPartHeader = trimmed.startsWith('PART');
                        const isIntroHeader = trimmed === 'Introduction' || (trimmed.startsWith('~') && trimmed.toLowerCase().includes('introduction'));
                        const isChapterNum = trimmed.startsWith('Chapter');
                        const isSubBullet = trimmed.startsWith('●');
                        const isNestedBullet = trimmed.startsWith('○');
                        const isGridMarker = trimmed === '[GRID]';
                        const isGridEnd = trimmed === '[/GRID]';
                        const isSafety = trimmed.startsWith('[SAFETY]');
                        const isTip = trimmed.startsWith('[TIP]');
                        const isTildeHeader = trimmed.startsWith('~') && trimmed.endsWith('~');

                        // 1. Table of Contents Handling
                        if (isTOC) {
                            if (isPartHeader || isIntroHeader) {
                                return (
                                    <div key={i} className="mb-6 mt-8 break-inside-avoid">
                                        <div className="text-[14px] font-bold text-[#8B5A2B] border-b-2 border-[#cec2b5] pb-2 mb-4 uppercase tracking-[0.2em] font-serif">
                                            {trimmed.replace(/~/g, '')}
                                        </div>
                                    </div>
                                );
                            }
                            if (isChapterNum) {
                                return (
                                    <div key={i} className="mb-3 break-inside-avoid text-[12px] font-bold text-slate-800 tracking-wide mt-4 font-serif italic">
                                        {trimmed}
                                    </div>
                                );
                            }
                            if (isSubBullet) {
                                return (
                                    <div key={i} className="mb-1.5 break-inside-avoid text-[10px] text-slate-600 font-medium pl-4 flex items-start gap-2">
                                        <span className="text-[#cec2b5] mt-0.5">●</span>
                                        <span>{trimmed.replace('●', '').trim()}</span>
                                    </div>
                                );
                            }
                            if (isNestedBullet) {
                                return (
                                    <div key={i} className="mb-1.5 break-inside-avoid text-[9.5px] text-slate-500 font-medium pl-10 flex items-start gap-2 italic">
                                        <span className="text-[#cec2b5] mt-0.5">○</span>
                                        <span>{trimmed.replace('○', '').trim()}</span>
                                    </div>
                                );
                            }
                            if (trimmed.toLowerCase().includes("archive index") || trimmed.toLowerCase().includes("table of contents")) {
                                return (
                                    <div key={i} className="mb-12">
                                        <span className="text-[11px] font-black uppercase tracking-[1em] text-[#cec2b5] mb-2 block font-serif italic">Digital Publication</span>
                                        <h1 className="text-6xl font-light tracking-tighter mb-6 text-slate-900 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            Table of Contents
                                        </h1>
                                        <div className="w-full h-[2px] bg-slate-900/10 mb-2" />
                                        <div className="w-1/3 h-[1px] bg-[#cec2b5] mb-6" />
                                    </div>
                                );
                            }
                            return null;
                        }

                        // 2. Part Divider Handling
                        if (isPartHeader) {
                            return (
                                <div key={i} className="h-full flex flex-col justify-center items-center text-center my-[30mm] break-before-page">
                                    <div className="w-32 h-[1px] bg-[#cec2b5] mb-8" />
                                    <span className="text-[14px] font-black uppercase tracking-[0.5em] text-[#8B5A2B] mb-4">Section Divider</span>
                                    <h1 className="text-6xl font-thin tracking-tighter text-slate-900 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {trimmed}
                                    </h1>
                                    <div className="w-48 h-[2px] bg-slate-900" />
                                    <div className="mt-12 opacity-20">
                                        <Layers className="w-12 h-12 text-[#8B5A2B]" />
                                    </div>
                                </div>
                            );
                        }

                        // 3. Header Handling (H1 & H2)
                        if (isIntroHeader || isChapterNum) {
                            return (
                                <div key={i} className="mb-12 mt-16 first:mt-0 break-inside-avoid">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-[1px] flex-grow bg-slate-200" />
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#cec2b5] font-serif italic">Elite Document</span>
                                        <div className="h-[1px] flex-grow bg-slate-200" />
                                    </div>
                                    <h1 className="text-5xl font-light tracking-tight text-slate-900 leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {trimmed.replace(/~/g, '')}
                                    </h1>
                                    <div className="w-24 h-1 bg-slate-900 mt-8" />
                                </div>
                            );
                        }

                        // Sub-header Detection (Title Case)
                        const isSubHeader = trimmed.length > 0 && trimmed.length < 50 && !trimmed.endsWith('.') && !trimmed.endsWith(':') && trimmed[0] === trimmed[0].toUpperCase() && !isChapterNum && !isPartHeader && !isIntroHeader;
                        if (isSubHeader) {
                            return (
                                <div key={i} className="mb-6 mt-12 break-inside-avoid">
                                    <h2 className="text-xl font-bold tracking-tight text-[#8B5A2B] font-serif italic border-b border-[#cec2b5] pb-2">
                                        {trimmed}
                                    </h2>
                                </div>
                            );
                        }

                        // 4. Special Callouts (TIP / SAFETY)
                        if (isSafety) {
                            return (
                                <div key={i} className="my-8 bg-red-50 border-l-8 border-red-500 p-8 rounded-sm shadow-sm flex gap-6 items-start break-inside-avoid">
                                    <div className="p-3 bg-red-500 rounded-full shrink-0">
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

                        if (isTip) {
                            return (
                                <div key={i} className="my-8 bg-[#fefaf6] border-2 border-dashed border-[#cec2b5] p-8 rounded-xl shadow-inner flex gap-6 items-start break-inside-avoid">
                                    <div className="p-3 bg-white rounded-full border border-slate-100 shadow-sm shrink-0">
                                        <Lightbulb className="w-5 h-5 text-[#cec2b5]" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 block">Professional Insight</span>
                                        <p className="text-[14px] font-serif italic text-slate-700 leading-relaxed">
                                            {trimmed.replace(/\[TIP\]|\[\/TIP\]/g, '')}
                                        </p>
                                    </div>
                                </div>
                            );
                        }

                        // 5. Grid Handling (Chapter 14)
                        if (isGridMarker) {
                            const gridLines = [];
                            let j = i + 1;
                            while (j < lines.length && lines[j].trim() !== '[/GRID]') {
                                if (lines[j].trim()) gridLines.push(lines[j].trim());
                                j++;
                            }
                            return (
                                <div key={i} className="my-10 overflow-hidden rounded-lg border border-[#cec2b5] shadow-sm">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-[#f5ede6]">
                                            <tr>
                                                {gridLines[0].split('|').map((h, idx) => (
                                                    <th key={idx} className="p-4 text-[10px] font-black uppercase tracking-widest text-[#8B5A2B] border-b border-[#cec2b5]">
                                                        {h.trim()}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gridLines.slice(1).map((row, rIdx) => (
                                                <tr key={rIdx} className="border-b border-[#cec2b5]/50 last:border-0 hover:bg-white/50 transition-colors">
                                                    {row.split('|').map((cell, cIdx) => (
                                                        <td key={cIdx} className={`p-4 text-[12px] text-slate-700 ${cIdx === 0 ? 'font-bold w-16' : ''}`}>
                                                            {cell.trim()}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            );
                        }
                        if (trimmed.includes('|') || isGridEnd) return null;

                        // 6. Standard Body Text
                        return (
                            <p key={i} className="text-[15px] leading-[1.8] text-slate-800 font-light mb-6 text-justify">
                                {trimmed}
                            </p>
                        );
                    })}
                </div>

                {/* Footer / Page Info */}
                <div className="mt-12 border-t border-[#cec2b5]/30 pt-8 flex justify-between items-center opacity-60">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-3 h-3 text-[#8B5A2B]" />
                        <span className="text-[10px] font-medium text-slate-500 italic">Preshy's Candle Making Guide</span>
                    </div>
                    <span className="text-[12px] font-serif italic text-[#8B5A2B]">Elite Publication &copy; 2026</span>
                </div>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap');
                body {
                    background-color: #f1f5f9 !important;
                    font-family: 'Poppins', sans-serif;
                }
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        background-color: white !important;
                    }
                    .print-break-before {
                        break-before: page;
                    }
                }
            `}</style>
        </div>
    );
};

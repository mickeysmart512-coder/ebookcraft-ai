import React from 'react';
import { Playfair_Display, Poppins, Inter } from 'next/font/google';
import { ShieldAlert, Lightbulb, BookOpen, Layers, ChevronRight } from 'lucide-react';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

interface MinimalistLayoutProps {
    title: string;
    subtitle?: string;
    author?: string;
    content: string;
    isTOC?: boolean;
}

export const MinimalistChecklist: React.FC<MinimalistLayoutProps> = ({ title, subtitle, author, content, isTOC }) => {

    // Explicitly Handle the Document Cover Page
    if (content === "COVER_PAGE_MARKER") {
        return (
            <div className={`min-h-[297mm] w-[210mm] bg-[#f6f3ec] p-[20mm] mx-auto shadow-2xl relative overflow-hidden print:shadow-none print:m-0 print:w-full flex flex-col items-center justify-center ${poppins.className}`}>
                <div className="absolute inset-4 border border-[#cec2b5]/30 pointer-events-none" />
                <div className="absolute inset-6 border-2 border-[#cec2b5]/10 pointer-events-none" />
                <div className="absolute top-0 left-0 w-32 h-32 border-t-[8px] border-l-[8px] border-[#8B5A2B]/30 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-[8px] border-r-[8px] border-[#8B5A2B]/30 pointer-events-none" />

                <span className="text-[12px] uppercase tracking-[0.5em] font-bold text-[#8B5A2B] mb-12">EbookCraft AI Elite</span>
                <h1 className="text-7xl font-black text-center text-[#0f172a] leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {title}
                </h1>
                <div className="w-1/3 h-[2px] bg-[#8B5A2B] mb-12" />
                <h2 className="text-2xl font-light italic text-[#475569] mb-24">
                    {subtitle || "Master Induction Series"}
                </h2>
                <div className="text-center mt-auto">
                    <span className="text-[14px] uppercase tracking-widest text-[#94a3b8] block mb-2">Authored By</span>
                    <span className="text-xl font-medium text-[#1e293b]">{author || "Preshy's Candle Making Guide"}</span>
                </div>
            </div>
        );
    }

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
                <div className="flex justify-between items-center mb-12 opacity-40 shrink-0">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-light text-[#8B5A2B]">EbookCraft AI Elite</span>
                    <div className="h-[1px] flex-grow mx-4 bg-[#cec2b5]" />
                    <span className="text-[9px] uppercase tracking-[0.4em] font-light text-[#8B5A2B]">Candle Making Masterclass</span>
                </div>

                <div className="flex-grow prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#8B5A2B] prose-h2:italic prose-h2:border-b prose-h2:border-[#cec2b5] prose-h2:pb-2 prose-h2:mb-4 prose-p:text-justify prose-p:font-light prose-p:leading-relaxed prose-li:marker:text-[#8B5A2B]"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Footer / Page Info */}
                <div className="mt-12 border-t border-[#cec2b5]/30 pt-8 flex justify-between items-center opacity-60 shrink-0">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-3 h-3 text-[#8B5A2B]" />
                        <span className="text-[10px] font-medium text-[#64748b] italic">Preshy's Candle Making Guide</span>
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

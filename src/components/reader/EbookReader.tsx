"use client";

import { useState, useMemo } from "react";
import { TEMPLATES, EbookTemplate } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    Menu,
    Sun,
    Moon,
    X,
    List,
    BookOpen,
    Download
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { ModernSidebar } from "./layouts/ModernSidebar";
import { FloatingCards } from "./layouts/FloatingCards";
import { MagazineGrid } from "./layouts/MagazineGrid";
import { SplitAesthetic } from "./layouts/SplitAesthetic";
import { MinimalistChecklist } from "./layouts/MinimalistChecklist";
import { ContentRenderer } from "./components/ContentRenderer";

export function EbookReader({
    content,
    title,
    templateId,
    onClose
}: {
    content: string,
    title: string,
    templateId: string,
    onClose: () => void
}) {
    const template = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(18);
    const [showSidebar, setShowSidebar] = useState(false);
    const [viewMode, setViewMode] = useState<'paginated' | 'feed'>('paginated');
    const [isPrinting, setIsPrinting] = useState(false);

    const isMaster = title.toLowerCase().includes("candle");

    // Strict A4 Pagination Engine
    const pages = useMemo(() => {
        // 1. Initial Split by headers
        const chapterChunks = isMaster
            ? content.split(/(?=~[^~]+~)/g)
            : content.split('\n\n').filter(p => p.trim().length > 0);

        const processedPages: string[] = [];

        chapterChunks.forEach(chunk => {
            const trimmed = chunk.trim();
            if (trimmed.length === 0) return;

            // Special Case: Table of Contents (High Limit)
            const isTOC = trimmed.toLowerCase().includes("table of contents");
            const MAX_CHARS = isTOC ? 8000 : 1150;

            if (trimmed.length > MAX_CHARS && isMaster) {
                const lines = trimmed.split('\n');
                let currentSubPage = "";

                lines.forEach(line => {
                    const l = line.trim();
                    if (l.length === 0) return;

                    if ((currentSubPage.length + l.length) > MAX_CHARS && currentSubPage.length > 0) {
                        processedPages.push(currentSubPage.trim());
                        currentSubPage = l + "\n\n";
                    } else {
                        currentSubPage += l + "\n\n";
                    }
                });
                if (currentSubPage) processedPages.push(currentSubPage.trim());
            } else {
                processedPages.push(trimmed);
            }
        });

        if (isMaster) {
            processedPages.unshift("COVER_PAGE_MARKER");
            // Ensure TOC is always right after cover if found
            const tocIndex = processedPages.findIndex(p => p.toLowerCase().includes("table of contents"));
            if (tocIndex > 1) {
                const [toc] = processedPages.splice(tocIndex, 1);
                processedPages.splice(1, 0, toc);
            }
        }

        return processedPages.filter(p => p.length > 2);
    }, [content, isMaster]);

    const [currentPage, setCurrentPage] = useState(0);

    const renderLayout = (pageContent: string, index: number) => {
        const props = {
            content: pageContent,
            title,
            template,
            fontSize,
            isDarkMode,
            currentPage: index,
            totalPages: pages.length
        };

        switch (template.layoutId) {
            case 'modern-sidebar':
                return <ModernSidebar {...props} />;
            case 'floating-cards':
                return <FloatingCards {...props} />;
            case 'magazine-grid':
                return <MagazineGrid {...props} />;
            case 'split-aesthetic':
                return <SplitAesthetic {...props} />;
            case 'minimal-checklist':
                return <MinimalistChecklist {...props} />;
            default:
                return (
                    <div className="max-w-4xl mx-auto py-20 px-8 relative">
                        {index === 0 && (
                            <h1 className="text-6xl font-black mb-20 text-center" style={{ fontFamily: template.styles.headingFont }}>{title}</h1>
                        )}
                        <ContentRenderer content={pageContent} accentColor={template.styles.accent} templateCategory={template.category} />
                    </div>
                );
        }
    };

    const isMinimalist = template.layoutId === 'minimal-checklist';

    return (
        <div className={`fixed inset-0 z-[100] flex flex-col transition-colors duration-500 ${isMinimalist ? 'bg-[#f1f5f9]' : (isDarkMode ? 'bg-[#020617] text-white' : 'bg-[#f8fafc] text-slate-900')}`}>
            <header className={`h-16 border-b flex items-center justify-between px-6 ${isMinimalist ? 'bg-white/80 border-slate-200' : 'bg-background/80 backdrop-blur'} z-50 shrink-0 shadow-sm backdrop-blur-md`}>
                <div className="flex items-center gap-6">
                    <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex flex-col">
                        <h2 className={`font-bold text-sm truncate max-w-[250px] ${isMinimalist ? 'text-slate-800' : ''}`}>{title}</h2>
                        <span className={`text-[10px] uppercase tracking-widest opacity-40 font-black ${isMinimalist ? 'text-slate-600' : ''}`}>Master Induction Series</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-200/50 p-1 rounded-xl items-center mr-2">
                        <Button variant={viewMode === 'paginated' ? 'secondary' : 'ghost'} size="sm" className="h-8 rounded-lg" onClick={() => setViewMode('paginated')}>
                            <BookOpen className="h-4 w-4 mr-2" /> <span className="text-[10px] font-bold">Flip</span>
                        </Button>
                        <Button variant={viewMode === 'feed' ? 'secondary' : 'ghost'} size="sm" className="h-8 rounded-lg" onClick={() => setViewMode('feed')}>
                            <List className="h-4 w-4 mr-2" /> <span className="text-[10px] font-bold">Feed</span>
                        </Button>
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 rounded-lg bg-[#cec2b5] text-white hover:bg-[#bfae9a]"
                        onClick={() => {
                            window.print();
                        }}
                    >
                        <Download className="h-4 w-4 mr-2" /> <span className="text-[10px] font-bold">Download PDF</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
                </div>
            </header>

            <div className="flex-1 overflow-hidden relative">
                {viewMode === 'paginated' ? (
                    <div className="h-full overflow-y-auto pt-4 pb-32">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                {renderLayout(pages[currentPage], currentPage)}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="h-full overflow-y-auto space-y-12 bg-slate-100 p-12">
                        {pages.map((page, i) => (
                            <section key={i} className="flex justify-center">
                                {renderLayout(page, i)}
                            </section>
                        ))}
                    </div>
                )}

                {viewMode === 'paginated' && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
                        <Button variant="secondary" size="icon" disabled={currentPage === 0} onClick={() => setCurrentPage(prev => prev - 1)} className="rounded-full shadow-2xl w-14 h-14 border bg-white/90 active:scale-95 transition-transform">
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <div className="bg-white/90 backdrop-blur px-10 py-4 rounded-full border shadow-2xl text-[10px] font-black tracking-[0.3em]">
                            PAGE {currentPage} / {pages.length - 1}
                        </div>
                        <Button variant="secondary" size="icon" disabled={currentPage === pages.length - 1} onClick={() => setCurrentPage(prev => prev + 1)} className="rounded-full shadow-2xl w-14 h-14 border bg-white/90 active:scale-95 transition-transform">
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Hidden Print Container - Renders ALL pages for high-fidelity PDF export */}
            <div className="hidden print:block bg-white w-full print-container">
                {pages.map((page, i) => (
                    <div key={i} className="A4-page break-after-page">
                        {renderLayout(page, i)}
                    </div>
                ))}
            </div>
        </div>
    );
}

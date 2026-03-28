"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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
    autoDownload,
    onClose
}: {
    content: string,
    title: string,
    templateId: string,
    autoDownload?: boolean,
    onClose: () => void
}) {
    const template = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(18);
    const [showSidebar, setShowSidebar] = useState(false);
    const [viewMode, setViewMode] = useState<'paginated' | 'feed'>('paginated');
    const [isPrinting, setIsPrinting] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);

    const isMaster = title.toLowerCase().includes("candle");

    const handleDownloadPDF = async () => {
        if (!printRef.current) return;

        // 1. Debugging Mandate: Pre-Export CSS Reset
        const originalStyle = printRef.current.getAttribute('style') || '';
        const originalScrollY = window.scrollY;

        // Ensure container is height:auto and overflow:visible for capture
        printRef.current.style.height = 'auto';
        printRef.current.style.overflow = 'visible';
        window.scrollTo(0, 0);

        setIsExporting(true);

        try {
            // @ts-ignore - html2pdf doesn't have official types easily available
            const html2pdf = (await import('html2pdf.js')).default;

            const opt = {
                margin: 0,
                filename: 'Candle-Making-With-Preshy.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    foreignObjectRendering: true,
                    windowWidth: document.documentElement.offsetWidth,
                    onclone: (clonedDoc: Document) => {
                        const styleTags = clonedDoc.querySelectorAll('style');
                        styleTags.forEach((s) => {
                            if (s.innerHTML) {
                                s.innerHTML = s.innerHTML
                                    .replace(/oklch\([^)]+\)/gi, '#1e293b')
                                    .replace(/lab\([^)]+\)/gi, '#1e293b');
                            }
                        });

                        const elements = clonedDoc.querySelectorAll('*');
                        const unsupported = ['oklch', 'lab', 'lch', 'color-mix'];

                        elements.forEach(el => {
                            const styles = window.getComputedStyle(el);
                            // Manually check all common properties where Tailwind hides modern colors
                            const propsToCheck = [
                                'backgroundColor', 'color', 'borderColor', 'outlineColor',
                                'textDecorationColor', 'boxShadow', 'textShadow', 'fill', 'stroke'
                            ] as const;

                            propsToCheck.forEach(prop => {
                                // @ts-ignore
                                const val = styles[prop];
                                if (val && unsupported.some(u => val.includes(u))) {
                                    // Strip shadows completely, fallback colors to safe hex values
                                    if (prop.includes('Shadow')) {
                                        // @ts-ignore
                                        (el as HTMLElement).style[prop] = 'none';
                                    } else if (prop === 'color' || prop === 'fill' || prop === 'stroke') {
                                        // @ts-ignore
                                        (el as HTMLElement).style[prop] = '#000000';
                                    } else {
                                        // @ts-ignore
                                        (el as HTMLElement).style[prop] = '#ffffff';
                                    }
                                }
                            });
                        });
                    }
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };

            await html2pdf().from(printRef.current).set(opt).save();
            console.log('PDF Successfully Generated');
        } catch (error: any) {
            console.error('PDF Generation Error:', error);
            alert(`Failed to generate PDF: ${error.message || 'Unknown error'}. Please check your console for details.`);
        } finally {
            // Restore Original CSS and State
            if (printRef.current) {
                printRef.current.setAttribute('style', originalStyle);
            }
            window.scrollTo(0, originalScrollY);
            setIsExporting(false);
        }
    };

    // Strict A4 Pagination Engine
    const pages = useMemo(() => {
        // 1. Initial Split by headers
        const chapterChunks = isMaster
            ? content.split(/(?=~[^~]+~|\[TOC\])/g)
            : content.split('\n\n').filter(p => p.trim().length > 0);

        const processedPages: { content: string; isTOC: boolean }[] = [];

        chapterChunks.forEach(chunk => {
            const trimmed = chunk.trim();
            if (trimmed.length === 0) return;

            // Special Case: Table of Contents (High Limit)
            const isTOC = trimmed.toLowerCase().includes("table of contents") || trimmed.toLowerCase().includes("[toc]");
            const MAX_CHARS = isTOC ? 8000 : 1150;

            if (trimmed.length > MAX_CHARS && isMaster) {
                const lines = trimmed.split('\n');
                let currentSubPage = "";

                lines.forEach(line => {
                    const l = line.trim();
                    if (l.length === 0) return;

                    if ((currentSubPage.length + l.length) > MAX_CHARS && currentSubPage.length > 0) {
                        processedPages.push({ content: currentSubPage.trim(), isTOC });
                        currentSubPage = l + "\n\n";
                    } else {
                        currentSubPage += l + "\n\n";
                    }
                });
                if (currentSubPage) processedPages.push({ content: currentSubPage.trim(), isTOC });
            } else {
                processedPages.push({ content: trimmed, isTOC });
            }
        });

        if (isMaster) {
            processedPages.unshift({ content: "COVER_PAGE_MARKER", isTOC: false });
            // Ensure TOC is always right after cover if found
            const tocIndex = processedPages.findIndex(p => p.content.toLowerCase().includes("table of contents") || p.isTOC);
            if (tocIndex > 1) {
                const [toc] = processedPages.splice(tocIndex, 1);
                processedPages.splice(1, 0, toc);
            }
        }

        return processedPages.filter(p => p.content.length > 2);
    }, [content, isMaster]);

    useEffect(() => {
        if (autoDownload && pages.length > 0 && !isExporting) {
            const timer = setTimeout(() => {
                handleDownloadPDF().then(onClose);
            }, 1000); // Allow DOM and fonts to settle
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoDownload, pages]);

    const [currentPage, setCurrentPage] = useState(0);

    const renderLayout = (page: { content: string; isTOC: boolean }, index: number) => {
        const props = {
            content: page.content,
            title,
            subtitle: isMaster ? "From First Pour to First Sale" : "",
            author: isMaster ? "Ibenu Precious" : "",
            template,
            fontSize,
            isDarkMode,
            currentPage: index,
            totalPages: pages.length,
            isTOC: page.isTOC
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
                        <ContentRenderer content={page.content} accentColor={template.styles.accent} templateCategory={template.category} />
                    </div>
                );
        }
    };

    const isMinimalist = template.layoutId === 'minimal-checklist';

    if (autoDownload) {
        return (
            <div className="fixed inset-0 z-[100] flex flex-col bg-white overflow-hidden">
                <div className="absolute inset-0 z-[200] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center">
                    <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                        <motion.div
                            className="h-full bg-[#8B5A2B]"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5, ease: "easeInOut" }}
                        />
                    </div>
                    <span className="text-[12px] font-black tracking-[0.4em] text-[#8B5A2B] uppercase">Preparing Elite PDF</span>
                    <span className="text-[10px] text-slate-400 mt-2">Optimizing A4 Proportions & Typography...</span>
                </div>
                {/* Hidden Print Container */}
                <div
                    ref={printRef}
                    className="bg-white w-full print-container px-4 py-8 mx-auto"
                    style={{ width: '210mm' }}
                >
                    {pages.map((page, i) => (
                        <div key={i} className="A4-page break-after-page">
                            {renderLayout(page, i)}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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
                    <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
                </div>
            </header>

            <AnimatePresence>
                {isExporting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[200] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center"
                    >
                        <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                            <motion.div
                                className="h-full bg-[#8B5A2B]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 5, ease: "easeInOut" }}
                            />
                        </div>
                        <span className="text-[12px] font-black tracking-[0.4em] text-[#8B5A2B] uppercase">Preparing Elite PDF</span>
                        <span className="text-[10px] text-slate-400 mt-2">Optimizing A4 Proportions & Typography...</span>
                    </motion.div>
                )}
            </AnimatePresence>

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
            <div
                ref={printRef}
                className={`${isExporting ? 'absolute top-0 left-0 z-0 opacity-100' : 'hidden'} print:block bg-white w-full print-container`}
                style={{
                    width: '210mm',
                    pointerEvents: 'none'
                }}
            >
                {pages.map((page, i) => (
                    <div key={i} className="A4-page break-after-page">
                        {renderLayout(page, i)}
                    </div>
                ))}
            </div>
        </div>
    );
}

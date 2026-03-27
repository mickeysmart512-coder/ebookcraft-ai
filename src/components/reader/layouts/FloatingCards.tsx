"use client";

import { EbookTemplate } from "@/lib/templates";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
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

export function FloatingCards({ content, title, template, fontSize, isDarkMode, currentPage, totalPages }: LayoutProps) {
    const paragraphs = content.split('\n').filter(p => p.trim().length > 0);

    return (
        <div className="min-h-screen p-8 md:p-12 lg:p-24 bg-primary/5 flex flex-col items-center">
            {/* Floating Title Card */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-4xl mb-12"
            >
                <Card className="p-12 border-none shadow-2xl bg-background/80 backdrop-blur-xl relative overflow-hidden ring-1 ring-primary/20">
                    <div className="absolute top-0 right-0 p-8 text-8xl font-black opacity-5 italic" style={{ color: template.styles.accent }}>
                        {currentPage + 1}
                    </div>
                    <div className="h-1 w-12 bg-primary mb-6" style={{ backgroundColor: template.styles.accent }} />
                    <h1
                        className="text-5xl font-black leading-none tracking-tight"
                        style={{ fontFamily: template.styles.headingFont, color: template.styles.primaryColor }}
                    >
                        {currentPage === 0 ? title : `Chapter ${currentPage + 1}`}
                    </h1>
                </Card>
            </motion.div>

            {/* Content Cards Grid/Stack */}
            <div className="w-full max-w-4xl space-y-8">
                <Card
                    className={`p-10 border-none shadow-xl transition-transform hover:scale-[1.01] duration-300 ${template.styles.cardStyle === 'bordered' ? 'border-l-4 border-primary' : ''}`}
                    style={{
                        backgroundColor: isDarkMode ? '#0f172a' : template.styles.background,
                        borderColor: template.styles.accent
                    }}
                >
                    <div style={{ fontFamily: template.styles.fontFamily }}>
                        <ContentRenderer
                            content={content}
                            accentColor={template.styles.accent}
                            templateCategory={template.category}
                        />
                    </div>
                </Card>
            </div>

            {/* Pagination Accent */}
            <footer className="mt-12 opacity-40 font-bold tracking-[0.4em] uppercase text-xs">
                {currentPage + 1} / {totalPages}
            </footer>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TEMPLATES, EbookTemplate } from "@/lib/templates";
import { AnalysisResult, TemplateRecommendation } from "@/lib/gemini";
import { Check, Sparkles, Layout, Info, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface TemplateSelectorProps {
    analysis: AnalysisResult;
    onSelect: (templateId: string) => void;
}

export function TemplateSelector({ analysis, onSelect }: TemplateSelectorProps) {
    const [selectedId, setSelectedId] = useState<string>(analysis.recommendations[0]?.templateId || 'modern-minimal');

    const recommendations = analysis.recommendations.map(rec => {
        const template = TEMPLATES.find(t => t.id === rec.templateId);
        return { ...rec, template };
    }).filter(r => r.template);

    const handleSelect = (id: string) => {
        setSelectedId(id);
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="text-center space-y-4">
                <Badge variant="secondary" className="px-4 py-1 text-sm font-semibold tracking-wider uppercase bg-primary/10 text-primary border-primary/20">
                    Content Profiling Complete
                </Badge>
                <h1 className="text-4xl font-extrabold tracking-tight italic text-primary">
                    Select Your Brand's Soul
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Our AI deep-analyzed your ebook: <span className="text-foreground font-bold italic">"{analysis.suggestedTitle}"</span>.
                    We've curated the Top 6 designs that perfectly match your <span className="text-foreground font-semibold">{analysis.contentProfile.genre}</span> content.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec, index) => {
                    const template = rec.template!;
                    const isSelected = selectedId === template.id;
                    const isTopMatch = index === 0;

                    return (
                        <motion.div
                            key={template.id}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card
                                className={`h-full flex flex-col cursor-pointer transition-all duration-300 border-2 ${isSelected ? 'border-primary ring-4 ring-primary/10 shadow-xl' : 'border-muted hover:border-primary/40'}`}
                                onClick={() => handleSelect(template.id)}
                            >
                                <CardHeader className="relative">
                                    {isTopMatch && (
                                        <Badge className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 border-none px-3 py-1 shadow-lg">
                                            <Sparkles className="h-3 w-3 mr-1" /> AI Best Match
                                        </Badge>
                                    )}
                                    <div className="flex justify-between items-start mb-2">
                                        <CardTitle className="text-xl font-bold">{template.name}</CardTitle>
                                        <Badge variant="outline" className="text-[10px] uppercase tracking-tighter">
                                            {Math.round(rec.confidence * 100)}% Match
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-xs italic line-clamp-2">
                                        {template.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-4">
                                    {/* Design Preview Placeholder (Colored gradient based on template) */}
                                    <div
                                        className="h-32 rounded-lg relative overflow-hidden flex items-center justify-center p-4"
                                        style={{ background: template.styles.background }}
                                    >
                                        <div className="absolute inset-0 opacity-10" style={{ background: `linear-gradient(45deg, ${template.styles.primaryColor}, transparent)` }} />
                                        <div className="z-10 text-center space-y-2">
                                            <div className="w-12 h-1 bg-primary mx-auto rounded" style={{ backgroundColor: template.styles.primaryColor }} />
                                            <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: template.styles.primaryColor }}>{template.name}</div>
                                            <div className="flex gap-1 justify-center">
                                                <div className="w-4 h-4 rounded-full border border-black/5" style={{ backgroundColor: template.styles.primaryColor }} />
                                                <div className="w-4 h-4 rounded-full border border-black/5" style={{ backgroundColor: template.styles.secondaryColor }} />
                                                <div className="w-4 h-4 rounded-full border border-black/5" style={{ backgroundColor: template.styles.accent }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                            <Layout className="h-3 w-3" /> Layout Strengths
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {template.strengths.slice(0, 3).map(s => (
                                                <Badge key={s} variant="secondary" className="text-[9px] bg-muted/50 border-none">
                                                    {s}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-primary/5 rounded-md p-3 text-[11px] leading-relaxed border border-primary/10">
                                        <p className="font-semibold text-primary mb-1 flex items-center gap-1">
                                            <Info className="h-3 w-3" /> Why this fits:
                                        </p>
                                        {rec.reasoning}
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <div className={`w-full flex items-center justify-center p-2 rounded border-2 transition-colors ${isSelected ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/50 text-muted-foreground border-transparent'}`}>
                                        {isSelected ? (
                                            <div className="flex items-center gap-2 font-bold text-sm uppercase">
                                                <Check className="h-4 w-4" /> Selected
                                            </div>
                                        ) : (
                                            <span className="text-xs font-semibold uppercase italic">Pick Template</span>
                                        )}
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-muted">
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold italic opacity-60">Deep Analysis Findings:</span>
                    <div className="flex gap-2">
                        {analysis.contentProfile.detectedStructures.hasNumberedSteps && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Numbered Steps Found</Badge>}
                        {analysis.contentProfile.detectedStructures.hasProTips && <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Pro Tips Detected</Badge>}
                        {analysis.contentProfile.detectedStructures.hasBulletLists && <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Detailed Lists Detected</Badge>}
                    </div>
                </div>
                <Button
                    size="lg"
                    className="px-12 py-7 text-xl font-extrabold italic shadow-2xl hover:scale-105 active:scale-95 transition-transform bg-primary"
                    onClick={() => onSelect(selectedId)}
                >
                    Finalize & Render <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}

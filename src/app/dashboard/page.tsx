"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    Upload,
    FileText,
    Clock,
    ExternalLink,
    Play,
    Settings,
    MoreVertical,
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TemplateSelector } from "@/components/dashboard/TemplateSelector";
import { CraftingStatus } from "@/components/dashboard/CraftingStatus";
import { EbookReader } from "@/components/reader/EbookReader";
import { AnalysisResult } from "@/lib/gemini";

interface DashboardEbook {
    id: string | number;
    title: string;
    date: string;
    template?: string;
    templateId?: string;
    status: string;
    isMaster?: boolean;
}

export default function DashboardPage() {
    const [isCrafting, setIsCrafting] = useState(false);
    const [isRecommending, setIsRecommending] = useState(false);
    const [showReader, setShowReader] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
    const [selectedEbook, setSelectedEbook] = useState<{
        title: string;
        content: string;
        templateId: string;
    } | null>(null);

    const startCrafting = (file: File) => {
        setSelectedFile(file);
        setIsCrafting(true);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            startCrafting(file);
        }
    };

    const handleCraftingComplete = (result: { analysis: AnalysisResult; title: string; content: string }) => {
        setIsCrafting(false);
        setAnalysisData(result.analysis);
        setSelectedEbook({
            title: result.title,
            content: result.content,
            templateId: result.analysis.recommendations[0]?.templateId || 'modern-minimal'
        });
        setIsRecommending(true);
    };

    const handleTemplateSelect = (templateId: string) => {
        if (selectedEbook) {
            setSelectedEbook({ ...selectedEbook, templateId });
            setIsRecommending(false);
            setShowReader(true);
        }
    };

    // Mock data for processed ebooks (keeping for UI structure)
    const ebooks: DashboardEbook[] = [
        { id: 1, title: "Modern Web Architectures", date: "2026-03-20", template: "Modern Minimal", status: "Completed" },
        { id: 2, title: "The Art of Stoicism", date: "2026-03-22", template: "Classic Literary", status: "Completed" },
        { id: 3, title: "Deep Space Tales", date: "2026-03-24", template: "Sci-Fi Neon", status: "Processing" },
    ];

    const masterEbook: DashboardEbook = {
        id: 'master',
        title: "Candle Making With Preshy",
        date: "NEW",
        templateId: "minimal-beige-checklist",
        status: "READY",
        isMaster: true
    };

    const allEbooks = [masterEbook, ...ebooks];

    if (showReader && selectedEbook) {
        return (
            <EbookReader
                content={selectedEbook.content}
                title={selectedEbook.title}
                templateId={selectedEbook.templateId}
                onClose={() => setShowReader(false)}
            />
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <AnimatePresence>
                {isCrafting && selectedFile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur flex items-center justify-center p-4"
                    >
                        <CraftingStatus file={selectedFile} onComplete={handleCraftingComplete} />
                    </motion.div>
                )}

                {isRecommending && analysisData && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[110] bg-background overflow-y-auto"
                    >
                        <TemplateSelector
                            analysis={analysisData}
                            onSelect={handleTemplateSelect}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold">Your Library</h1>
                    <p className="text-muted-foreground">Manage and track your AI-crafted ebooks.</p>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileSelect}
                    />
                    <Button
                        className="gap-2 shrink-0"
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <Plus className="h-4 w-4" /> New Upload
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Ebook List */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Recent Ebooks</CardTitle>
                            <CardDescription>You have processed 12 ebooks this month.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {allEbooks.map((ebook) => (
                                    <div key={ebook.id} className={`flex items-center justify-between p-4 rounded-xl border ${ebook.isMaster ? 'bg-primary/10 border-primary/30 ring-1 ring-primary/20' : 'bg-card/50'} hover:bg-accent/50 transition-colors group`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-lg ${ebook.isMaster ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                                                <FileText className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold">{ebook.title}</h3>
                                                    {ebook.isMaster && <Badge className="bg-primary text-[10px] h-4">MASTER INDUCTION</Badge>}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Clock className="h-3 w-3" /> {ebook.date}
                                                    <span className="text-primary/50">•</span>
                                                    <span className="italic">{ebook.templateId === 'minimal-beige-checklist' ? 'Minimalist Beige' : (ebook.template || 'Modern Minimal')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {ebook.status === "READY" || ebook.status === "Completed" ? (
                                                <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                                                    <CheckCircle2 className="h-3 w-3 mr-1" /> Ready
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="animate-pulse">
                                                    Processing...
                                                </Badge>
                                            )}
                                            <Button
                                                variant={ebook.isMaster ? "default" : "ghost"}
                                                size="icon"
                                                className={`h-8 w-8 ${!ebook.isMaster && 'opacity-0 group-hover:opacity-100'} transition-opacity`}
                                                onClick={async () => {
                                                    if (ebook.isMaster) {
                                                        const { CANDLE_MAKING_CONTENT } = await import("@/lib/manual-induction-data");
                                                        setSelectedEbook({
                                                            title: ebook.title,
                                                            content: CANDLE_MAKING_CONTENT,
                                                            templateId: 'minimal-beige-checklist'
                                                        });
                                                    } else {
                                                        setSelectedEbook({
                                                            title: ebook.title,
                                                            content: "Sample content for " + ebook.title + ". \n\n This is a beautifully formatted ebook. It was designed to showcase the power of AI in book crafting.",
                                                            templateId: ebook.template === "Modern Minimal" ? "modern-minimal" : (ebook.template === "Classic Literary" ? "classic-literary" : "sci-fi-neon")
                                                        });
                                                    }
                                                    setShowReader(true);
                                                }}
                                            >
                                                <Play className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar: Upload & Stats */}
                <div className="space-y-6">
                    <Card
                        className="border-dashed bg-primary/5 border-primary/30 relative overflow-hidden group cursor-pointer"
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Upload</CardTitle>
                            <CardDescription>Click to select or drag and drop your PDF (Max 50MB)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed border-primary/20 rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-colors group-hover:border-primary/50 group-hover:bg-primary/5">
                                <div className="p-4 rounded-full bg-primary/10 text-primary">
                                    <Upload className="h-8 w-8" />
                                </div>
                                <Button variant="secondary" size="sm">Select File</Button>
                            </div>
                        </CardContent>
                        {/* Animated background flourish */}
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Plan Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Quota Used</span>
                                <span className="font-bold">1 / 1 Ebook</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-full" />
                            </div>
                            <p className="text-xs text-muted-foreground italic">You are currently on the Free Tier.</p>
                            <Button variant="outline" className="w-full gap-2">
                                Upgrade to Pro <ArrowUpRight className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function ArrowUpRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M7 7h10v10" /><path d="M7 17 17 7" />
        </svg>
    );
}

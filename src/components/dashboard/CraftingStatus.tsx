"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    Loader2
} from "lucide-react";
import { motion } from "framer-motion";

export function CraftingStatus({ file, onComplete }: { file: File, onComplete: (result: any) => void }) {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const steps = [
        "Analyzing ebook structure...",
        "Extracting chapters and themes...",
        "Running multi-engine genre detection...",
        "Selecting the perfect template...",
        "Rendering your masterpiece..."
    ];

    useEffect(() => {
        let isMounted = true;

        // Progress simulation that slows down as it gets higher
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return 95; // Wait for API at 95%
                const increment = prev < 50 ? 2 : (prev < 80 ? 0.5 : 0.1);
                return prev + increment;
            });
        }, 100);

        // Step simulation
        const stepInterval = setInterval(() => {
            setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 2000);

        // Actual API Call
        const performAnalysis = async () => {
            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || "Failed to analyze ebook");
                }

                const data = await response.json();

                if (isMounted) {
                    setProgress(100);
                    setStep(steps.length - 1);

                    // Small delay to show 100%
                    setTimeout(() => {
                        onComplete({
                            analysis: data.analysis,
                            title: data.analysis.suggestedTitle || file.name.replace('.pdf', ''),
                            content: data.text,
                            numPages: data.numPages
                        });
                    }, 1000);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message);
                    console.error("Crafting Error:", err);
                }
            }
        };

        performAnalysis();

        return () => {
            isMounted = false;
            clearInterval(interval);
            clearInterval(stepInterval);
        };
    }, [file, onComplete]);

    if (error) {
        return (
            <Card className="w-full max-w-lg mx-auto shadow-2xl border-destructive/20 bg-card/50 backdrop-blur">
                <CardHeader className="text-center">
                    <CardTitle className="text-destructive font-bold">Analysis Failed</CardTitle>
                    <CardDescription>{error}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                    <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-lg mx-auto overflow-hidden shadow-2xl border-primary/20 bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary animate-pulse">
                    <Sparkles className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold italic">Crafting Your Masterpiece</CardTitle>
                <CardDescription>Our AI is deep-diving into your content to find the perfect soul for your book.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                        <span>{steps[step]}</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-3 grow" />
                </div>

                <div className="space-y-3">
                    {steps.map((s, i) => (
                        <motion.div
                            key={i}
                            className={`flex items-center gap-3 text-sm transition-opacity duration-500 ${i <= step ? 'opacity-100' : 'opacity-30'}`}
                            initial={{ x: -10 }}
                            animate={{ x: 0 }}
                        >
                            {i < step ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                            ) : i === step ? (
                                <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                            ) : (
                                <div className="h-4 w-4 rounded-full border shrink-0" />
                            )}
                            <span>{s}</span>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="bg-muted/30 p-4 border-t flex justify-center">
                <p className="text-xs text-muted-foreground italic font-medium">"Good things take time. Perfection takes a little longer."</p>
            </CardFooter>
        </Card>
    );
}

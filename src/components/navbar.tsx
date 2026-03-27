"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Github } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span>EbookCraft <span className="text-primary italic">AI</span></span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm">Dashboard</Button>
                    </Link>
                    <Link href="/login">
                        <Button size="sm">Get Started</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

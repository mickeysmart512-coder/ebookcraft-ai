export function Footer() {
    return (
        <footer className="border-t bg-muted/50">
            <div className="container mx-auto py-8 px-4">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © 2026 EbookCraft AI. All rights reserved. Crafting masterpieces from PDFs.
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                        <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

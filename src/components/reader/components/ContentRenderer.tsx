"use client";

interface ContentRendererProps {
    content: string;
    accentColor: string;
    templateCategory: string;
}

export function ContentRenderer({ content, accentColor, templateCategory }: ContentRendererProps) {
    return (
        <div
            className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-a:text-primary prose-img:rounded-xl prose-hr:border-primary/20 content-renderer"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

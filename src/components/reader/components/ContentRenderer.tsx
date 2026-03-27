"use client";

import { SmartList } from "./SmartList";
import { HighImpactCallout } from "./HighImpactCallout";

interface ContentRendererProps {
    content: string;
    accentColor: string;
    templateCategory: string;
}

export function ContentRenderer({ content, accentColor, templateCategory }: ContentRendererProps) {
    const lines = content.split('\n').filter(l => l.trim().length > 0);

    const renderedContent = [];
    let currentList: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // 1. Detect Chapter Headers
        if (/^CHAPTER|^SECTION|^INTRODUCTION/i.test(line) || (line.length < 50 && line === line.toUpperCase())) {
            if (currentList.length > 0) {
                renderedContent.push(<SmartList key={`list-${i}`} items={currentList} accentColor={accentColor} />);
                currentList = [];
            }

            renderedContent.push(
                <div key={`header-${i}`} className="my-16">
                    <h2
                        className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4"
                        style={{ color: accentColor }}
                    >
                        {line}
                    </h2>
                    <div className="w-16 h-1 bg-primary/20 rounded-full" style={{ backgroundColor: accentColor + '20' }} />
                </div>
            );
            continue;
        }

        // 2. Detect List Items
        if (/^\d+\. |- /.test(line) || line.startsWith('•')) {
            currentList.push(line);
            continue;
        } else if (currentList.length > 0) {
            renderedContent.push(<SmartList key={`list-${i}`} items={currentList} accentColor={accentColor} />);
            currentList = [];
        }

        // 3. Normal Paragraph
        renderedContent.push(
            <p
                key={`p-${i}`}
                className="mb-8 text-lg leading-relaxed opacity-80"
            >
                {line}
            </p>
        );
    }

    if (currentList.length > 0) {
        renderedContent.push(<SmartList key="list-trailing" items={currentList} accentColor={accentColor} />);
    }

    return <div className="content-renderer space-y-4">{renderedContent}</div>;
}

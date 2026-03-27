export type EbookTemplate = {
    id: string;
    name: string;
    description: string;
    category: 'DIY' | 'Business' | 'Fiction' | 'Cooking' | 'Technical' | 'Lifestyle' | 'Minimal' | 'Minimalist';
    layoutId: 'modern-sidebar' | 'magazine-grid' | 'floating-cards' | 'standard-serif' | 'blueprint-technical' | 'split-aesthetic' | 'minimal-checklist';
    strengths: string[]; // e.g. ["numbered lists", "large imagery"]
    traits: string[];
    styles: {
        primaryColor: string;
        secondaryColor: string;
        fontFamily: string;
        headingFont: string;
        layoutType: 'minimal' | 'serif' | 'experimental' | 'illustrated' | 'grid';
        background: string;
        accent: string;
        cardStyle?: 'flat' | 'elevated' | 'bordered';
    };
};

export const TEMPLATES: EbookTemplate[] = [
    {
        id: 'minimal-beige-checklist',
        name: 'Minimalist Beige Checklist',
        description: 'Perfectly induced design with beige header strips and checkbox-style lists.',
        category: 'Minimalist',
        layoutId: 'minimal-checklist',
        strengths: ['checklists', 'clean spacing', 'professional induction'],
        traits: ['minimalist', 'beige', 'clean', 'professional'],
        styles: {
            primaryColor: '#433422',
            secondaryColor: '#8a7e72',
            fontFamily: 'Inter, sans-serif',
            headingFont: 'Playfair Display, serif',
            layoutType: 'minimal',
            background: '#fff9f5',
            accent: '#f5ede6',
            cardStyle: 'bordered'
        }
    },
    {
        id: 'modern-minimal',
        name: 'Modern Minimal',
        description: 'Clean, spacious, and perfect for business or self-help.',
        category: 'Minimal',
        layoutId: 'modern-sidebar',
        strengths: ['clean layout', 'readability', 'professional polish'],
        traits: ['business', 'clean', 'professional', 'minimalist'],
        styles: {
            primaryColor: '#0f172a',
            secondaryColor: '#64748b',
            fontFamily: 'Inter, sans-serif',
            headingFont: 'Inter, sans-serif',
            layoutType: 'minimal',
            background: '#ffffff',
            accent: '#4f46e5',
            cardStyle: 'flat'
        }
    },
    {
        id: 'warm-cozy-craft',
        name: 'Warm Cozy Craft',
        description: 'Soft beige tones and organic shapes for DIY and handmade guides.',
        category: 'DIY',
        layoutId: 'split-aesthetic',
        strengths: ['numbered steps', 'process photos', 'cozy feel'],
        traits: ['craft', 'diy', 'warm', 'handmade', 'artistic'],
        styles: {
            primaryColor: '#433422',
            secondaryColor: '#8c7851',
            fontFamily: 'Outfit, sans-serif',
            headingFont: 'Playfair Display, serif',
            layoutType: 'illustrated',
            background: '#fdf8f1',
            accent: '#d97706',
            cardStyle: 'bordered'
        }
    },
    {
        id: 'professional-consultant',
        name: 'Professional Consultant',
        description: 'Deep blues and sharp grids for business reports and whitepapers.',
        category: 'Business',
        layoutId: 'magazine-grid',
        strengths: ['tables', 'charts', 'numbered lists', 'executive summary'],
        traits: ['corporate', 'blue', 'structured', 'authoritative'],
        styles: {
            primaryColor: '#1e3a8a',
            secondaryColor: '#3b82f6',
            fontFamily: 'Inter, sans-serif',
            headingFont: 'Montserrat, sans-serif',
            layoutType: 'minimal',
            background: '#ffffff',
            accent: '#1d4ed8',
            cardStyle: 'elevated'
        }
    },
    {
        id: 'vibrant-chef',
        name: 'Vibrant Chef',
        description: 'High-energy colors and bold typography for recipe books.',
        category: 'Cooking',
        layoutId: 'blueprint-technical',
        strengths: ['ingredient lists', 'timed steps', 'vibrant callouts'],
        traits: ['bold', 'food', 'active', 'energetic'],
        styles: {
            primaryColor: '#111827',
            secondaryColor: '#ef4444',
            fontFamily: 'Inter, sans-serif',
            headingFont: 'Bebas Neue, sans-serif',
            layoutType: 'grid',
            background: '#ffffff',
            accent: '#f97316',
            cardStyle: 'bordered'
        }
    },
    {
        id: 'abstract-modern',
        name: 'Abstract Creator',
        description: 'Artistic backgrounds and unique typography for creative portfolios.',
        category: 'Lifestyle',
        layoutId: 'floating-cards',
        strengths: ['visual storytelling', 'creative layout', 'unique typography'],
        traits: ['abstract', 'creative', 'modern', 'colorful'],
        styles: {
            primaryColor: '#1e293b',
            secondaryColor: '#ec4899',
            fontFamily: 'Outfit, sans-serif',
            headingFont: 'Outfit, sans-serif',
            layoutType: 'experimental',
            background: '#f8fafc',
            accent: '#8b5cf6',
            cardStyle: 'elevated'
        }
    },
    {
        id: 'technical-blueprints',
        name: 'Technical Blueprint',
        description: 'Grid-heavy and precise for engineering and technical documentation.',
        category: 'Technical',
        layoutId: 'blueprint-technical',
        strengths: ['numbered steps', 'detailed diagrams', 'troubleshooting'],
        traits: ['precise', 'technical', 'structured', 'blueprint'],
        styles: {
            primaryColor: '#0f172a',
            secondaryColor: '#334155',
            fontFamily: 'JetBrains Mono, monospace',
            headingFont: 'Space Grotesk, sans-serif',
            layoutType: 'grid',
            background: '#f1f5f9',
            accent: '#0891b2',
            cardStyle: 'bordered'
        }
    },
    {
        id: 'classic-manuscript',
        name: 'Classic Manuscript',
        description: 'Timeless serif design for serious non-fiction and memoirs.',
        category: 'Fiction',
        layoutId: 'standard-serif',
        strengths: ['long-form text', 'chapter headers', 'elegant quotes'],
        traits: ['classic', 'stable', 'authoritative', 'literary'],
        styles: {
            primaryColor: '#1c1917',
            secondaryColor: '#57534e',
            fontFamily: 'Libre Baskerville, serif',
            headingFont: 'Libre Baskerville, serif',
            layoutType: 'serif',
            background: '#fffcf7',
            accent: '#78350f',
            cardStyle: 'flat'
        }
    }
];

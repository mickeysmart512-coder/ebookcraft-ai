const fs = require('fs');

const file = 'src/components/reader/layouts/MinimalistChecklist.tsx';
let content = fs.readFileSync(file, 'utf8');

const map = {
    'text-slate-800': 'text-[#1e293b]',
    'text-slate-600': 'text-[#475569]',
    'text-slate-500': 'text-[#64748b]',
    'text-slate-900': 'text-[#0f172a]',
    'bg-slate-900/10': 'bg-[#0f172a]/10',
    'bg-slate-900': 'bg-[#0f172a]',
    'bg-slate-200': 'bg-[#e2e8f0]',
    'border-slate-200': 'border-[#e2e8f0]',
    'bg-red-50 ': 'bg-[#fef2f2] ',
    'border-red-500': 'border-[#ef4444]',
    'bg-red-500': 'bg-[#ef4444]',
    'text-white': 'text-[#ffffff]',
    'text-red-600': 'text-[#dc2626]',
    'text-red-900': 'text-[#7f1d1d]',
    'text-slate-700': 'text-[#334155]',
    'hover:bg-white/50': 'hover:bg-[#ffffff]/50',
    'bg-white ': 'bg-[#ffffff] ',
    'border-slate-100': 'border-[#f1f5f9]'
};

for (const [key, val] of Object.entries(map)) {
    content = content.split(key).join(val);
}

fs.writeFileSync(file, content);
console.log('Replaced successfully');

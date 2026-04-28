"use client";

import React from 'react';
import DragDropZone from './DragDropZone';

interface Sponsor {
  company: string;
  year: string;
  link: string;
  logo_file?: string;
}

interface SponsorsManagerProps {
  sponsors: Sponsor[];
  wsNum: string;
  onChange: (sponsors: Sponsor[]) => void;
}

export default function SponsorsManager({ sponsors = [], wsNum, onChange }: SponsorsManagerProps) {

  const updateItem = (index: number, field: keyof Sponsor, value: string) => {
    const updated = [...sponsors];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addItem = () => {
    onChange([...sponsors, { company: '', year: '', link: '' }]);
  };

  const removeItem = (index: number) => {
    const updated = [...sponsors];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-700 pb-2">
        <h3 className="text-xl font-bold text-sky-400">Corporate Sponsors</h3>
        <button onClick={addItem} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-sm">+ Add Sponsor</button>
      </div>

      <div className="space-y-4">
        {sponsors.map((s, i) => {
          const cleanCompany = s.company ? s.company.replace(/[^a-zA-Z0-9]/g, '_') : `Company_${i}`;
          const logoFileName = `${cleanCompany}_${s.year}.png`;

          return (
            <div key={i} className={`p-4 rounded border-l-4 border-emerald-500 relative flex gap-4 items-start ${i % 2 === 0 ? 'bg-slate-700/50' : 'bg-slate-800'}`}>
              <button 
                onClick={() => removeItem(i)} 
                className="absolute top-2 right-2 text-red-400 hover:text-red-300 font-bold"
              >
                ✕
              </button>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Company</label>
                  <input type="text" value={s.company} onChange={e => updateItem(i, 'company', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Year Began</label>
                  <input type="text" value={s.year} onChange={e => updateItem(i, 'year', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">External Link</label>
                  <input type="url" value={s.link} onChange={e => updateItem(i, 'link', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" />
                </div>
              </div>
              <div className="w-48">
                <DragDropZone 
                  label="Drop Logo PNG" 
                  category="Sponsor" 
                  wsNum={wsNum} 
                  fileName={logoFileName}
                  onSuccess={() => updateItem(i, 'logo_file', logoFileName)}
                />
                {s.logo_file && <div className="mt-1 text-xs text-green-400 truncate">{s.logo_file}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React from 'react';
import DragDropZone from './DragDropZone';

interface Student {
  name: string;
  institute: string;
  url?: string;
  presentation_file?: string;
}

interface StudentsManagerProps {
  students: Student[];
  wsNum: string;
  onChange: (students: Student[]) => void;
}

export default function StudentsManager({ students = [], wsNum, onChange }: StudentsManagerProps) {

  const updateItem = (index: number, field: keyof Student, value: string) => {
    const updated = [...students];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addItem = () => {
    onChange([...students, { name: '', institute: '', url: '' }]);
  };

  const removeItem = (index: number) => {
    const updated = [...students];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-700 pb-2">
        <h3 className="text-xl font-bold text-sky-400">Student Award Presenters</h3>
        <button onClick={addItem} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-sm">+ Add Student</button>
      </div>

      <div className="space-y-4">
        {students.map((s, i) => {
          const cleanName = s.name ? s.name.replace(/[^a-zA-Z0-9]/g, '_') : `Student_${i}`;
          const presFileName = `${wsNum}th_${cleanName}_Student_Award.pdf`;

          return (
            <div key={i} className={`p-4 rounded border-l-4 border-purple-500 relative flex gap-4 items-start ${i % 2 === 0 ? 'bg-slate-700/50' : 'bg-slate-800'}`}>
              <button 
                onClick={() => removeItem(i)} 
                className="absolute top-2 right-2 text-red-400 hover:text-red-300 font-bold"
              >
                ✕
              </button>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Student Name</label>
                  <input type="text" value={s.name} onChange={e => updateItem(i, 'name', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Affiliate Institute</label>
                  <input type="text" value={s.institute} onChange={e => updateItem(i, 'institute', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 mb-1">Legacy URL</label>
                  <input type="url" value={s.url || ''} onChange={e => updateItem(i, 'url', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" />
                </div>
              </div>
              <div className="w-48">
                <DragDropZone 
                  label="Drop Pres. PDF" 
                  category="Student_Award" 
                  wsNum={wsNum} 
                  fileName={presFileName}
                  onSuccess={() => updateItem(i, 'presentation_file', presFileName)}
                />
                {s.presentation_file && <div className="mt-1 text-xs text-green-400 truncate">{s.presentation_file}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

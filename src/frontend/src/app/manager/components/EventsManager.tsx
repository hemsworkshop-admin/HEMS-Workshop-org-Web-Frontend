"use client";

import React from 'react';

interface EventItem {
  date: string;
  time: string;
  title: string;
  subtitle: string;
}

interface EventsManagerProps {
  events: EventItem[];
  onChange: (events: EventItem[]) => void;
}

export default function EventsManager({ events = [], onChange }: EventsManagerProps) {

  const updateItem = (index: number, field: keyof EventItem, value: string) => {
    const updated = [...events];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addItem = () => {
    onChange([...events, { date: '', time: '', title: '', subtitle: '' }]);
  };

  const removeItem = (index: number) => {
    const updated = [...events];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-700 pb-2">
        <h3 className="text-xl font-bold text-sky-400">Itinerary Events</h3>
        <button onClick={addItem} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-sm">+ Add Event</button>
      </div>

      <div className="space-y-4">
        {events.map((e, i) => (
          <div key={i} className={`p-4 rounded border-l-4 border-orange-500 relative ${i % 2 === 0 ? 'bg-slate-700/50' : 'bg-slate-800'}`}>
            <button 
              onClick={() => removeItem(i)} 
              className="absolute top-2 right-2 text-red-400 hover:text-red-300 font-bold"
            >
              ✕
            </button>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Date</label>
                <input type="text" value={e.date} onChange={ev => updateItem(i, 'date', ev.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Time</label>
                <input type="text" value={e.time} onChange={ev => updateItem(i, 'time', ev.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Title (e.g. Breakfast)</label>
                <input type="text" value={e.title} onChange={ev => updateItem(i, 'title', ev.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Subtitle (e.g. Lobby)</label>
                <input type="text" value={e.subtitle} onChange={ev => updateItem(i, 'subtitle', ev.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { PenLine } from "lucide-react";

export default function Notes({ notes, setNotes }) {
  return (
    <div className="md:col-span-1 border-r border-gray-100 pr-4 flex flex-col">
      <div className="flex items-center gap-2 text-blue-600 mb-2">
        <PenLine size={14} />
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Plan / Notes
        </span>
      </div>

      <textarea placeholder="Plan your activities..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="flex-1 bg-transparent resize-none text-sm leading-[28px] text-gray-500 bg-lined-paper outline-none"
      />
    </div>
  );
}
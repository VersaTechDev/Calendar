import { format } from "date-fns";

export default function Footer({ startDate, endDate }) {
  return (
    <div className="px-6 py-3 border-t text-xs text-gray-400 flex justify-between">
      <span>Date Range:</span>
      <span className="text-blue-600 font-bold">
        {startDate ? format(startDate, "MMM d") : "None"}
        {endDate ? ` — ${format(endDate, "MMM d")}` : ""}
      </span>
    </div>
  );
}
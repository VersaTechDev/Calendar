import { format, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero({ currentMonth, setCurrentMonth, setDirection }) {
  return (
    <div className="relative h-44 md:h-56">

      {/* SPIRAL */}
      <div className="absolute top-0 left-0 right-0 h-6 flex justify-around px-10 z-50 pointer-events-none">
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-1.5 h-6 bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 rounded-full border border-gray-500 -mt-3 shadow-sm" />
            <div className="w-2 h-2 bg-black/30 rounded-full mt-0.5 shadow-inner" />
          </div>
        ))}
      </div>

      {/* IMAGE */}
      <motion.img
        key={currentMonth.getTime()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* TEXT */}
      <div className="absolute bottom-4 left-6 text-white">
        <h1 className="text-4xl md:text-5xl font-bold">
          {format(currentMonth, "yyyy")}
        </h1>
        <p className="text-lg uppercase tracking-[0.3em]">
          {format(currentMonth, "MMMM")}
        </p>
      </div>

      {/* NAV */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => {
            setDirection(-1);
            setCurrentMonth(subMonths(currentMonth, 1));
          }}
          className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => {
            setDirection(1);
            setCurrentMonth(addMonths(currentMonth, 1));
          }}
          className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
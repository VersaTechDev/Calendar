import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  eachDayOfInterval,
  isWithinInterval,
  isBefore,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import Hero from "./Hero";
import Notes from "./Notes";
import Footer from "./Footer";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [notes, setNotes] = useState("");
  const [direction, setDirection] = useState(0);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);

  const calendarDays = eachDayOfInterval({
    start: startOfWeek(monthStart, { weekStartsOn: 1 }),
    end: endOfWeek(monthEnd, { weekStartsOn: 1 }),
  });

  const handleDateClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else {
      if (isBefore(day, startDate)) setStartDate(day);
      else setEndDate(day);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4 bg-[#ebebe8] overflow-hidden">
      <div className="w-full max-w-3xl mx-auto relative" style={{ perspective: "1500px" }}>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentMonth.toISOString()}
            initial={{ rotateX: direction > 0 ? -80 : 80, opacity: 0, scale: 0.95 }}
            animate={{ rotateX: 0, opacity: 1, scale: 1 }}
            exit={{ rotateX: direction > 0 ? 80 : -80, opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{ transformOrigin: "top" }}
            className="bg-white rounded-sm shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border overflow-hidden max-h-[95vh] flex flex-col"
          >

            <Hero
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              setDirection={setDirection}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 flex-1 overflow-hidden bg-[#fdfdfd]">

              <Notes notes={notes} setNotes={setNotes} />

              {/* CALENDAR */}
              <div className="md:col-span-2 flex flex-col">
                <div className="grid grid-cols-7 mb-4">
                  {["MON","TUE","WED","THU","FRI","SAT","SUN"].map((d) => (
                    <div key={d} className="text-[10px] text-gray-300 text-center uppercase">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-1 flex-1">
                  {calendarDays.map((day, idx) => {
                    const isCurrent = isSameMonth(day, currentMonth);
                    const isStart = startDate && isSameDay(day, startDate);
                    const isEnd = endDate && isSameDay(day, endDate);
                    const isInRange =
                      startDate && endDate &&
                      isWithinInterval(day, { start: startDate, end: endDate });

                    // ✅ NEW: weekend detection
                    const dayIndex = day.getDay(); // 0=Sun, 6=Sat
                    const isWeekend = dayIndex === 0 || dayIndex === 6;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleDateClick(day)}
                        className={cn(
                          "h-10 flex items-center justify-center text-xs",

                          !isCurrent && "text-gray-200",

                          isCurrent && !isWeekend && "text-gray-700 hover:bg-gray-50",

                          // ✅ WEEKEND STYLE
                          isCurrent && isWeekend && "text-blue-500 font-medium",

                          isInRange && "bg-blue-50 text-blue-600",

                          isStart && "bg-blue-600 text-white rounded-l-md",
                          isEnd && "bg-blue-600 text-white rounded-r-md"
                        )}
                      >
                        {format(day, "d")}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <Footer startDate={startDate} endDate={endDate} />

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
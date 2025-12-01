import { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function TimePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const [hour, setHour] = useState(value.split(":")[0]);
  const [minute, setMinute] = useState(value.split(":")[1]);

  // close klik luar
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // update parent
  useEffect(() => {
    onChange(`${hour}:${minute}`);
  }, [hour, minute]);

  const hours = [...Array(24)].map((_, i) => String(i).padStart(2, "0"));
  const minutes = [...Array(60)].map((_, i) => String(i).padStart(2, "0"));

  return (
    <div className="relative w-full" ref={pickerRef}>
      {/* INPUT FULLWIDTH */}
      <div
        onClick={() => setOpen(!open)}
        className="
          bg-gray-800 text-gray-200 p-2 w-full rounded-md border border-gray-700 
          cursor-pointer flex items-center justify-between
          hover:border-blue-500 transition-all duration-200
        "
      >
        <span>{hour}:{minute}</span>
        <Clock size={18} className="text-gray-300" />
      </div>

      {/* DROPDOWN (COMPACT) */}
      {open && (
        <div
          className="
            absolute z-50 mt-2 w-40    /* ⬅ COMPACT */
            bg-gray-900 border border-gray-700 rounded-lg shadow-xl
          "
        >
          <div className="grid grid-cols-2 divide-x divide-gray-700">

            {/* HOURS */}
            <div className="max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
              {hours.map((h) => (
                <div
                  key={h}
                  onClick={() => {
                    setHour(h);
                    setOpen(false);
                  }}
                  className={`
                    p-2 text-center text-sm cursor-pointer
                    hover:bg-blue-600 hover:text-white transition
                    ${hour === h ? "bg-blue-500 text-white" : "text-gray-300"}
                  `}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* MINUTES */}
            <div className="max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
              {minutes.map((m) => (
                <div
                  key={m}
                  onClick={() => {
                    setMinute(m);
                    setOpen(false);
                  }}
                  className={`
                    p-2 text-center text-sm cursor-pointer
                    hover:bg-blue-600 hover:text-white transition
                    ${minute === m ? "bg-blue-500 text-white" : "text-gray-300"}
                  `}
                >
                  {m}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

import { CalendarDays, Pencil, Eye, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const priorityStyles = {
  Low: "bg-green-500/15 text-green-400",
  Medium: "bg-yellow-500/15 text-yellow-400",
  High: "bg-orange-500/15 text-orange-400",
  Critical: "bg-red-500/15 text-red-400",
};

const borderStyles = {
  Low: "before:bg-green-500",
  Medium: "before:bg-yellow-500",
  High: "before:bg-orange-500",
  Critical: "before:bg-red-500",
};

export default function BugCard({
  title,
  description,
  priority,
  createdAt,
}) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl before:absolute before:left-0 before:top-0 before:h-full before:w-1 ${borderStyles[priority]}`}
    >
      <div className="flex justify-between gap-5">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{title}</h2>

          <p className="mt-1 line-clamp-2 text-sm text-slate-400">
            {description}
          </p>
        </div>

        <span
          className={`h-fit rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[priority]}`}
        >
          {priority}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={15} />
          {createdAt}
        </div>

        <div className="flex translate-x-2 items-center gap-4 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
          <button className="hover:text-indigo-400">
            <Pencil size={18} />
          </button>

          <button className="hover:text-cyan-400">
            <Eye size={18} />
          </button>

          <button className="hover:text-red-400">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
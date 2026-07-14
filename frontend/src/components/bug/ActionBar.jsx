import { Plus, Search, ChevronDown } from "lucide-react";

export default function ActionBar({onCreate}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      {/* Left Side */}
      <div className="flex flex-wrap items-center gap-3 flex-1">
        {/* Search */}
        <div className="relative min-w-[280px] flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search bugs..."
            className="w-full rounded-xl border border-white/10 bg-black/20 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500"
          />
        </div>

        {/* Filters */}
        {["Filter", "Sort", "Date", "Limit"].map((item) => (
          <button
            key={item}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm transition hover:border-indigo-500 hover:bg-white/5"
          >
            {item}
            <ChevronDown size={16} />
          </button>
        ))}
      </div>

      {/* Right Side */}
      <button onClick={onCreate}
      className="flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-indigo-400 active:scale-95">
        <Plus
          size={18}
          className="transition-transform duration-200 group-hover:rotate-90"
        />
        Create Bug
      </button>
    </div>
  );
}
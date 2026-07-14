import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { generateSummary, suggestFix,
  suggestPriority, } from "../../api/bugApi";

export default function BugDetailsPanel({
  bug,
  open,
  onClose,
}) {
    const [summary, setSummary] = useState(bug.summary || "");
    const [recommendation, setRecommendation] = useState(
        bug.suggestedFix || ""
    );

    const [priority, setPriority] = useState(bug.priority);
    const [previousPriority, setPreviousPriority] = useState(null);

    const [loadingSummary, setLoadingSummary] = useState(false);
    const [loadingFix, setLoadingFix] = useState(false);
    const [loadingPriority, setLoadingPriority] = useState(false);
    const handleGenerateSummary = async () => {
  try {
    setLoadingSummary(true);

    const data = await generateSummary(bug._id);

    setSummary(data.summary);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingSummary(false);
  }
};
const handleSuggestFix = async () => {
  try {
    setLoadingFix(true);

    const data = await suggestFix(bug._id);

    setRecommendation(data.suggestedFix);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingFix(false);
  }
};
const handleSuggestPriority = async () => {
  try {
    setLoadingPriority(true);

    const data = await suggestPriority(bug._id);

    
    setPriority(data.priority);

setTimeout(() => {
  setPreviousPriority(null);
}, 3000);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingPriority(false);
  }
};
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

            <div>
              <h2 className="text-xl font-semibold">
                {bug.title}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Bug Details
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-white/10"
            >
              <X size={18} />
            </button>

          </div>

          {/* Body */}

          <div className="grid grid-cols-2 gap-8 p-6">

            {/* LEFT */}

            <div className="space-y-6">

              <div>
    <h3 className="mb-2 text-sm font-semibold text-slate-300">
      Description
    </h3>

    <p className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-400">
      {bug.description}
    </p>
  </div>
        {summary && (
  <div className="mt-6">
    <h3 className="mb-2 text-sm font-semibold text-slate-300">
      Summary
    </h3>

    <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-400">
      {summary}
    </div>
  </div>
)}
  {/* Summary */}

  

              <div className="grid grid-cols-2 gap-4 text-sm">

                <div>
  <p className="text-slate-500 mb-1">
    Priority
  </p>

  <AnimatePresence mode="wait">
  {previousPriority ? (
    <motion.div
      key="changed-priority"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-3"
    >
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.45, x: -8 }}
        transition={{ duration: 0.8 }}
        className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-400 line-through"
      >
        {previousPriority}
      </motion.span>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        →
      </motion.span>

      <motion.span
        initial={{ scale: 0.9 }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 0.45 }}
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          {
            Low: "bg-green-500/15 text-green-400",
            Medium: "bg-yellow-500/15 text-yellow-400",
            High: "bg-orange-500/15 text-orange-400",
            Critical: "bg-red-500/15 text-red-400",
          }[priority]
        }`}
      >
        {priority}
      </motion.span>
    </motion.div>
  ) : (
    <motion.span
      key="current-priority"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        {
          Low: "bg-green-500/15 text-green-400",
          Medium: "bg-yellow-500/15 text-yellow-400",
          High: "bg-orange-500/15 text-orange-400",
          Critical: "bg-red-500/15 text-red-400",
        }[priority]
      }`}
    >
      {priority}
    </motion.span>
  )}
</AnimatePresence>
</div>

                <div>
                  <p className="text-slate-500">Status</p>
                  <p>{bug.status}</p>
                </div>

                <div>
                  <p className="text-slate-500">Created</p>
                  <p>
                    {new Date(bug.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Updated</p>
                  <p>
                    {new Date(bug.updatedAt).toLocaleDateString()}
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="space-y-4">

              <h3 className="text-sm font-semibold">
                AI Assistant
              </h3>

              <button
  onClick={handleGenerateSummary}
  disabled={loadingSummary}
  className="w-full rounded-xl bg-amber-500 py-3 font-medium text-black transition hover:bg-amber-400 disabled:opacity-60"
>
  {loadingSummary ? "Generating..." : "✨ Generate Summary"}
</button>

<button
  onClick={handleSuggestFix}
  disabled={loadingFix}
  className="w-full rounded-xl bg-amber-500 py-3 font-medium text-black transition hover:bg-amber-400 disabled:opacity-60"
>
  {loadingFix ? "Generating..." : "✨ Suggest Fix"}
</button>

<button
  onClick={handleSuggestPriority}
  disabled={loadingPriority}
  className="w-full rounded-xl bg-amber-500 py-3 font-medium text-black transition hover:bg-amber-400 disabled:opacity-60"
>
  {loadingPriority ? "Generating..." : "✨ Suggest Priority"}
</button>

              <div>

  <h3 className="mb-2 text-sm font-semibold text-slate-300">
    AI Recommendation
  </h3>

  <div className="min-h-[210px] rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-400">
  {recommendation} </div>

</div>

            </div>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t border-white/10 p-5">

            <button className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/10">
              Edit
            </button>

            <button className="rounded-xl bg-red-500 px-5 py-2 hover:bg-red-400">
              Delete
            </button>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
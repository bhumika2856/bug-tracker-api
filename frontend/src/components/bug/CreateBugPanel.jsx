import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createBug, updateBug  } from "../../api/bugApi";


export default function CreateBugPanel({ open, onClose, onBugCreated,editingBug}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
  if (editingBug) {
    setTitle(editingBug.title);
    setDescription(editingBug.description);
    setPriority(editingBug.priority || "");
  } else {
    setTitle("");
    setDescription("");
    setPriority("");
  }
}, [editingBug, open]);

    const handleCreateBug = async () => {
  if (!title.trim() || !description.trim()) {
    alert("Title and Description are required.");
    return;
  }

  try {
    setLoading(true);

    if (editingBug) {
      await updateBug(editingBug._id, {
        title,
        description,
        priority,
      });
    } else {
      await createBug({
        title,
        description,
        priority: priority || undefined,
      });
    }

    setTitle("");
    setDescription("");
    setPriority("");

    onClose();
    onBugCreated();

  } catch (error) {
    console.error(error);
    alert(
      editingBug
        ? "Failed to update bug."
        : "Failed to create bug."
    );
  } finally {
    setLoading(false);
  }
};
    return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            <div

              onClick={(e) => e.stopPropagation()}
              className="relative h-[85vh] w-full max-w-6xl rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
            >
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5" />
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-6">
                <h2 className="text-2xl font-semibold">
                  {editingBug ? "Edit Bug" : "Create New Bug"}
                </h2>

                <button
                  onClick={onClose}
                  className="rounded-lg p-2 transition hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}

<div className="flex h-[calc(85vh-89px)] flex-col p-8">

  <div className="space-y-6">

    {/* Title */}

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Bug Title
      </label>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Bug Title..."
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-indigo-500"
      />
    </div>

    {/* Description */}

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Description
      </label>

      <textarea
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the Bug in detail..."
        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-indigo-500"
      />
    </div>

    {/* Priority */}

    <div className="flex items-end gap-4">

      <div className="w-72">
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Priority
          <span className="ml-2 text-xs text-slate-500">
            (Optional)
          </span>
        </label>

        <select
  className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
value={priority}
onChange={(e) => setPriority(e.target.value)} >
  <option value="" className="bg-slate-800 text-white">
    Select priority
  </option>
  <option className="bg-slate-800 text-white">Low</option>
  <option className="bg-slate-800 text-white">Medium</option>
  <option className="bg-slate-800 text-white">High</option>
  <option className="bg-slate-800 text-white">Critical</option>
</select>
      </div>

      <button
        className="mb-[1px] rounded-xl bg-amber-500 px-5 py-3 font-medium text-black transition hover:bg-amber-400"
      >
        ✨ Suggest Priority
      </button>

    </div>

  </div>

  {/* Footer */}

  <div className="mt-auto flex justify-end gap-4 border-t border-white/10 pt-6">

    <button
      onClick={onClose}
      className="rounded-xl border border-white/10 px-5 py-3 transition hover:bg-white/10"
    >
      Cancel
    </button>

    <button
    onClick={handleCreateBug}
        disabled={loading}
      className="rounded-xl bg-indigo-500 px-6 py-3 font-medium transition hover:bg-indigo-400"
    >
       {loading
  ? editingBug
    ? "Saving..."
    : "Creating..."
  : editingBug
    ? "Save Changes"
    : "Create Bug"}
    </button>

  </div>

</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
import { AnimatePresence, motion } from "framer-motion";

export default function DeleteDialog({
  open,
  onCancel,
  onConfirm,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          <motion.div
            className="fixed inset-0 z-[61] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-[420px] rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl"
            >
              <h2 className="text-xl font-semibold">
                Delete Bug?
              </h2>

              <p className="mt-3 text-slate-400">
                This action cannot be undone.
              </p>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={onCancel}
                  className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  onClick={onConfirm}
                  className="rounded-xl bg-red-500 px-5 py-2 hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
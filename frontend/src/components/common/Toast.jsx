import { AnimatePresence, motion } from "framer-motion";

export default function Toast({
  open,
  type = "success",
  title,
  message,
  icon,
}) {
  const colors = {
    success: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
    },
    error: {
      border: "border-red-500/30",
      bg: "bg-red-500/10",
    },
    info: {
      border: "border-sky-500/30",
      bg: "bg-sky-500/10",
    },
  };

  const current = colors[type] || colors.success;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 20, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed left-1/2 top-4 z-[999] -translate-x-1/2"
        >
          <div
            className={`flex min-w-[340px] items-center gap-4 rounded-2xl border ${current.border} ${current.bg} bg-slate-900/90 px-5 py-4 shadow-2xl backdrop-blur-xl`}
          >
            <motion.div
              animate={{ rotate: type === "success" ? [0, -10, 10, 0] : 0 }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="shrink-0"
            >
              {icon}
            </motion.div>

            <div className="flex-1">
              <h3 className="font-semibold text-white">
                {title}
              </h3>

              {message && (
                <p className="mt-1 text-sm text-slate-300">
                  {message}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
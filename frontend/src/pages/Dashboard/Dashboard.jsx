import { useEffect, useState } from "react";

import ActionBar from "../../components/bug/ActionBar";
import BugCard from "../../components/bug/BugCard";
import CreateBugPanel from "../../components/bug/CreateBugPanel";
import { getAllBugs } from "../../api/bugApi";

export default function Dashboard() {
  const [openPanel, setOpenPanel] = useState(false);

  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const data = await getAllBugs();
      setBugs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <ActionBar
        onCreate={() => setOpenPanel(true)}
      />

      {loading ? (
        <div className="text-center text-slate-400 py-20">
          Loading bugs...
        </div>
      ) : bugs.length === 0 ? (
        <div className="text-center text-slate-400 py-20">
          No bugs found.
        </div>
      ) : (
        <div className="space-y-4">
          {bugs.map((bug) => (
            <BugCard
              key={bug._id}
              title={bug.title}
              description={bug.description}
              priority={bug.priority}
              createdAt={new Date(bug.createdAt).toLocaleDateString()}
            />
          ))}
        </div>
      )}

      <CreateBugPanel
        open={openPanel}
        onClose={() => setOpenPanel(false)}
        onBugCreated={fetchBugs}
      />
    </section>
  );
}
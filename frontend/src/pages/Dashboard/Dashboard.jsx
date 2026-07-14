import { useState } from "react";

import ActionBar from "../../components/bug/ActionBar";
import BugCard from "../../components/bug/BugCard";
import CreateBugPanel from "../../components/bug/CreateBugPanel";

export default function Dashboard() {
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <section className="space-y-6">
      <ActionBar
        onCreate={() => setOpenPanel(true)}
      />

      <div className="space-y-4">
        <BugCard
          title="Login page crashes"
          description="Users are unable to login after entering valid credentials. The application throws an unexpected server error."
          priority="Critical"
          createdAt="9 Jul 2026"
        />

        <BugCard
          title="Navbar alignment issue"
          description="The profile icon shifts on smaller screen sizes causing layout inconsistency."
          priority="Medium"
          createdAt="8 Jul 2026"
        />
      </div>

      <CreateBugPanel
        open={openPanel}
        onClose={() => setOpenPanel(false)}
      />
    </section>
  );
}
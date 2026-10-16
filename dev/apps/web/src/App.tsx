import { useState } from "react";

type Tab = "factors" | "activities" | "footprint";

const TABS: { id: Tab; label: string }[] = [
  { id: "factors", label: "Factors" },
  { id: "activities", label: "Activities" },
  { id: "footprint", label: "Footprint" }
];

const PLACEHOLDERS: Record<Tab, string> = {
  factors: "Coming in story 1.1",
  activities: "Coming in story 2.1",
  footprint: "Coming in story 3.2"
};

export function App() {
  const [tab, setTab] = useState<Tab>("factors");

  return (
    <div className="shell">
      <header className="header">
        <h1>Carbon Hub Lite</h1>
      </header>
      <nav className="tabs" aria-label="Main">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={t.id === tab ? "tab tab-active" : "tab"}
            aria-current={t.id === tab ? "page" : undefined}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main className="main">
        <div className="card placeholder">{PLACEHOLDERS[tab]}</div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import NavDrawer from "./NavDrawer";

export default function AppShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="shell">
      <header className="topbar">
        <button className="hamburger" onClick={() => setOpen(true)} aria-label="Open menu">
          ☰
        </button>
        <span className="brand">Physics &amp; Maths</span>
      </header>
      <main className="content">{children}</main>
      <NavDrawer open={open} onClose={() => setOpen(false)} email={email} />
    </div>
  );
}
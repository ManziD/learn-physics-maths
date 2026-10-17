"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
  email?: string;
}

const WA_URL = "https://wa.me/256750349712";

export default function NavDrawer({ open, onClose, email }: NavDrawerProps) {
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => { onClose(); }, [pathname]); // eslint-disable-line

  const is = (href: string) => pathname === href;

  return (
    <>
      <div className={`overlay ${open ? "open" : ""}`} onClick={onClose} />
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer-header">
          <span className="brand">Physics &amp; Maths</span>
          <button className="hamburger" onClick={onClose} aria-label="Close menu">
            ✕
          </button>
        </div>

        <Link href="/" className={`nav-item ${is("/") ? "active" : ""}`}>
          Home
        </Link>

        <div className="nav-group">
          <div className="nav-group-label">Learn</div>
          <span className="nav-item disabled">
            Study plan <span className="soon">Coming soon</span>
          </span>
          <Link href="/chapters" className={`nav-item ${pathname.startsWith("/chapters") ? "active" : ""}`}>
            Chapters
          </Link>
          <span className="nav-item disabled">
            Tests <span className="soon">Coming soon</span>
          </span>
        </div>

        <div className="nav-group">
          <div className="nav-group-label">Track</div>
          <span className="nav-item disabled">
            Analytics <span className="soon">Coming soon</span>
          </span>
          <span className="nav-item disabled">
            Workspace <span className="soon">Coming soon</span>
          </span>
        </div>

        <div className="nav-group">
          <div className="nav-group-label">Support</div>
          <span className="nav-item disabled">
            Toolbox <span className="soon">Coming soon</span>
          </span>
          <span className="nav-item disabled">
            Live classes <span className="soon">Coming soon</span>
          </span>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-item"
          >
            Tutoring
          </a>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 20 }}>
          {email && <div className="muted" style={{ padding: "0 12px 8px" }}>{email}</div>}
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="nav-item"
              style={{ width: "100%", background: "transparent", border: 0, textAlign: "left", cursor: "pointer" }}
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
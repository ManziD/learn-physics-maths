"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import type { Chapter } from "@/lib/types";

const SUBJECTS = ["All", "Physics", "Mathematics"];
const LEVELS = ["All", "O-Level", "A-Level"];

export default function ChapterList({
  chapters,
  viewedIds,
  subject,
  level,
}: {
  chapters: Chapter[];
  viewedIds: string[];
  subject: string;
  level: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const viewed = new Set(viewedIds);

  const setFilter = useCallback(
    (key: "subject" | "level", value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value === "All") next.delete(key);
      else next.set(key, value);
      router.push(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router]
  );

  return (
    <div className="stack">
      <div className="filter-bar" role="tablist" aria-label="Subject filter">
        {SUBJECTS.map((s) => (
          <button
            key={s}
            className={`chip ${subject === s ? "active" : ""}`}
            onClick={() => setFilter("subject", s)}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="filter-bar" role="tablist" aria-label="Level filter">
        {LEVELS.map((l) => (
          <button
            key={l}
            className={`chip ${level === l ? "active" : ""}`}
            onClick={() => setFilter("level", l)}
          >
            {l}
          </button>
        ))}
      </div>

      {chapters.length === 0 ? (
        <div className="card muted">No chapters match these filters yet.</div>
      ) : (
        <div className="stack">
          {chapters.map((c) => {
            const seen = viewed.has(c.id);
            return (
              <Link key={c.id} href={`/chapters/${c.id}`} className="card chapter-card">
                <div className="meta">
                  <span className="pill" style={{ background: "var(--accent-tint)", color: "var(--accent-deep)" }}>
                    {c.subject}
                  </span>
                  <span className="pill" style={{ background: "#ededed", color: "var(--faint)" }}>
                    {c.level}
                  </span>
                  <span className={`pill ${seen ? "pill-viewed" : "pill-notstarted"}`}>
                    {seen ? "Viewed" : "Not started"}
                  </span>
                </div>
                <h3>{c.title}</h3>
                {c.description && <p>{c.description}</p>}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
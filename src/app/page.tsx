import Link from "next/link";
import { createServerClient, DB_ID, TABLES } from "@/lib/appwrite/client";
import AppShell from "@/components/AppShell";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { tablesDB } = createServerClient();

  const { rows: chapters } = await tablesDB.listRows({
    databaseId: DB_ID,
    tableId: TABLES.CHAPTERS,
  });

  const recent = chapters.slice(0, 5);
  const lastChapter = recent[0];

  return (
    <AppShell email="student@example.com">
      <div className="stack">
        <div>
          <h1>Hi Student 👋</h1>
          <p className="soft" style={{ marginTop: 4 }}>
            Welcome back. Ready to keep going?
          </p>
        </div>

        {lastChapter ? (
          <div className="hero-card">
            <div className="muted" style={{ color: "rgba(255,255,255,0.85)" }}>
              Continue where you left off
            </div>
            <h2 style={{ marginTop: 6 }}>{lastChapter.title}</h2>
            <p>
              {lastChapter.subject} · {lastChapter.level}
              {lastChapter.description ? ` — ${lastChapter.description}` : ""}
            </p>
            <Link href={`/chapters/${lastChapter.$id}`} className="btn">
              Resume chapter
            </Link>
          </div>
        ) : (
          <div className="card tint">
            <h3>No chapters started yet</h3>
            <p className="soft" style={{ marginTop: 6 }}>
              Pick a topic from Chapters to get going.
            </p>
            <Link href="/chapters" className="btn btn-primary" style={{ marginTop: 12, display: "inline-block" }}>
              Browse chapters
            </Link>
          </div>
        )}

        <div className="section-title">Recently added</div>
        <div className="stack">
          {recent.length > 0 ? (
            recent.map((c: any) => (
              <Link key={c.$id} href={`/chapters/${c.$id}`} className="card chapter-card">
                <div className="meta">
                  <span className="pill" style={{ background: "var(--accent-tint)", color: "var(--accent-deep)" }}>
                    {c.subject}
                  </span>
                  <span className="pill" style={{ background: "#ededed", color: "var(--faint)" }}>
                    {c.level}
                  </span>
                </div>
                <h3>{c.title}</h3>
                {c.description && <p>{c.description}</p>}
              </Link>
            ))
          ) : (
            <div className="card muted">No chapters published yet. Add some in your Appwrite console!</div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
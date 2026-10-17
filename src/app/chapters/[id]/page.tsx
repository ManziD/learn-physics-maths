import { notFound } from "next/navigation";
import { createServerClient, DB_ID, TABLES } from "@/lib/appwrite/client";
import AppShell from "@/components/AppShell";

export const dynamic = "force-dynamic";

function youtubeId(url: string | null): string | null {
  if (!url) return null;
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

export default async function ChapterPage({ params }: { params: { id: string } }) {
  const { tablesDB } = createServerClient();

  let chapter: any;
  try {
    chapter = await tablesDB.getRow({
      databaseId: DB_ID,
      tableId: TABLES.CHAPTERS,
      rowId: params.id,
    });
  } catch (e) {
    notFound();
  }

  const yt = youtubeId(chapter.video_url);

  return (
    <AppShell email="student@example.com">
      <div className="stack">
        <div className="row">
          <span className="pill" style={{ background: "var(--accent-tint)", color: "var(--accent-deep)" }}>
            {chapter.subject}
          </span>
          <span className="pill" style={{ background: "#ededed", color: "var(--faint)" }}>
            {chapter.level}
          </span>
        </div>

        <h1>{chapter.title}</h1>
        {chapter.description && <p className="soft" style={{ marginTop: -6 }}>{chapter.description}</p>}

        {yt && (
          <div className="video-frame">
            <iframe
              src={`https://www.youtube.com/embed/${yt}`}
              title={chapter.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {chapter.content && (
          <article
            className="card rich-text"
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
        )}
      </div>
    </AppShell>
  );
}
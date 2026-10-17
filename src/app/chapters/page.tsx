import { createServerClient, DB_ID, TABLES } from "@/lib/appwrite/client";
import { Query } from "node-appwrite";
import AppShell from "@/components/AppShell";
import ChapterList from "./ChapterList";

export const dynamic = "force-dynamic";

export default async function ChaptersPage({
  searchParams,
}: {
  searchParams: { subject?: string; level?: string };
}) {
  const { tablesDB } = createServerClient();

  const queries = [Query.orderAsc("order")];
  if (searchParams.subject && searchParams.subject !== "All") {
    queries.push(Query.equal("subject", searchParams.subject));
  }
  if (searchParams.level && searchParams.level !== "All") {
    queries.push(Query.equal("level", searchParams.level));
  }

  const { rows: chapters } = await tablesDB.listRows({
    databaseId: DB_ID,
    tableId: TABLES.CHAPTERS,
    queries,
  });

  return (
    <AppShell email="student@example.com">
      <div className="stack">
        <div>
          <h1>Chapters</h1>
          <p className="soft" style={{ marginTop: 4 }}>
            Physics &amp; Mathematics lessons across O-Level and A-Level.
          </p>
        </div>
        <ChapterList
          chapters={chapters as any}
          viewedIds={[]}
          subject={searchParams.subject ?? "All"}
          level={searchParams.level ?? "All"}
        />
      </div>
    </AppShell>
  );
}

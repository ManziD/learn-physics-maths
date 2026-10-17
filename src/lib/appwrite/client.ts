import { Client, Account, TablesDB } from "appwrite";
import { Client as NodeClient, TablesDB as NodeTablesDB } from "node-appwrite";

// --- Browser Client (used in Client Components) ---
export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

// --- Server Client (used in Server Components) ---
export function createServerClient() {
  const nodeClient = new NodeClient()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  return {
    tablesDB: new NodeTablesDB(nodeClient),
  };
}

// These are the IDs from your Appwrite Database
export const DB_ID = "learn_db";
export const TABLES = {
  PROFILES: "profiles",
  CHAPTERS: "chapters",
  PROGRESS: "chapter_progress",
};
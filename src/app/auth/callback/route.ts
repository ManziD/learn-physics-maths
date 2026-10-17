import { NextResponse } from "next/server";
import { account } from "@/lib/appwrite/client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  if (userId && secret) {
    try {
      // Create the session cookie
      await account.createSession(userId, secret);
      return NextResponse.redirect(`${origin}/`);
    } catch (error) {
      return NextResponse.redirect(`${origin}/sign-in?error=session_failed`);
    }
  }
  return NextResponse.redirect(`${origin}/sign-in`);
}
"use client";

import { useState } from "react";
import { account } from "@/lib/appwrite/client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // This creates the user if they don't exist, and sends the magic link
      await account.createMagicURLToken(
        "unique()", // generates a unique ID
        email,
        `${window.location.origin}/auth/callback` // where they land after clicking
      );
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className="signin-wrap">
      <div className="signin-card">
        <h1>Sign in</h1>
        <p className="soft" style={{ marginTop: 6, marginBottom: 18 }}>
          Enter your email. We'll send you a magic link to sign in instantly — no passwords.
        </p>

        {sent ? (
          <div className="tint" style={{ padding: 16, borderRadius: 12 }}>
            <strong>Check your inbox.</strong>
            <div className="soft" style={{ marginTop: 6 }}>
              We sent a sign-in link to <b>{email}</b>.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <div style={{ color: "crimson", fontSize: 13 }}>{error}</div>}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !email}
              style={{ width: "100%" }}
            >
              {loading ? "Sending…" : "Send magic link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
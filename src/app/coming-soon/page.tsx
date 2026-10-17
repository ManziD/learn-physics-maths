import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function ComingSoonPage() {
  return (
    <AppShell>
      <div className="card">
        <h1>Coming soon</h1>
        <p className="soft" style={{ marginTop: 6 }}>
          This section is still being built. Check back shortly.
        </p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: 14, display: "inline-block" }}>
          Back to Home
        </Link>
      </div>
    </AppShell>
  );
}
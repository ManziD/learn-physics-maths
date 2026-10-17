const sdk = require("node-appwrite");

const client = new sdk.Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6ad255e9000f1643bfd3")
  .setKey(process.env.APPWRITE_API_KEY);

const tablesDB = new sdk.TablesDB(client);

const chapters = [
  {
    subject: "Physics",
    level: "O-Level",
    title: "Newton's Laws of Motion",
    description: "An introduction to force, mass and acceleration.",
    content: "<p>Newton's three laws describe how forces change the motion of objects.</p><ul><li>Law 1: Inertia</li><li>Law 2: F = ma</li><li>Law 3: Action & reaction</li></ul>",
    video_url: "https://www.youtube.com/watch?v=kKKM8Y-u7ds",
    order: 1,
  },
  {
    subject: "Mathematics",
    level: "A-Level",
    title: "Differentiation from First Principles",
    description: "Derivatives using limits — the foundation of calculus.",
    content: "<p>The derivative of f at x is the limit of the difference quotient as h → 0.</p>",
    video_url: "https://www.youtube.com/watch?v=9vKqVkMQHKk",
    order: 2,
  },
  {
    subject: "Physics",
    level: "A-Level",
    title: "Projectile Motion",
    description: "Analysing motion in two dimensions under gravity.",
    content: "<p>Projectile motion combines constant horizontal velocity with accelerated vertical motion.</p>",
    video_url: "https://www.youtube.com/watch?v=aNtZbG4b-XI",
    order: 3,
  },
];

async function seed() {
  for (const chapter of chapters) {
    try {
      const row = await tablesDB.createRow({
        databaseId: "learn_db",
        tableId: "chapters",
        rowId: "unique()",
        data: chapter,
      });
      console.log(`✅ Added: ${chapter.title}`);
    } catch (err) {
      console.error(`❌ Failed: ${chapter.title} — ${err.message}`);
    }
  }
  console.log("\n🎉 Done seeding chapters!");
}

seed();
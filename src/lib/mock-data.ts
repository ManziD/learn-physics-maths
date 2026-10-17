export const mockUser = {
  id: "12345-67890",
  email: "student@example.com",
};

export const mockProfile = {
  full_name: "Manzi Delick",
  email: "student@example.com",
};

export const mockChapters = [
  {
    id: "chapter-1",
    subject: "Physics",
    level: "O-Level",
    title: "Newton's Laws of Motion",
    description: "An introduction to force, mass and acceleration.",
    content: "<p>Newton's three laws describe how forces change the motion of objects.</p><ul><li>Law 1: Inertia</li><li>Law 2: F = ma</li><li>Law 3: Action & reaction</li></ul>",
    video_url: "https://www.youtube.com/watch?v=kKKM8Y-u7ds",
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "chapter-2",
    subject: "Mathematics",
    level: "A-Level",
    title: "Differentiation from First Principles",
    description: "Derivatives using limits — the foundation of calculus.",
    content: "<p>The derivative of f at x is the limit of the difference quotient as h → 0.</p>",
    video_url: "https://www.youtube.com/watch?v=9vKqVkMQHKk",
    order: 2,
    created_at: new Date().toISOString(),
  },
];
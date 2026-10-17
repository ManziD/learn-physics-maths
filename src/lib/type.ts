export type Role = "student" | "parent" | "admin";
export type Subject = "Physics" | "Mathematics";
export type Level = "O-Level" | "A-Level";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  created_at: string;
}

export interface Chapter {
  id: string;
  subject: Subject;
  level: Level;
  title: string;
  description: string | null;
  content: string | null;
  video_url: string | null;
  order: number;
  created_at: string;
}

export interface ChapterProgress {
  id: string;
  student_id: string;
  chapter_id: string;
  viewed_at: string;
}
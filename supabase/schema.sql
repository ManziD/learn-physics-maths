-- ===========================================
-- PROFILES
-- ===========================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'student'
    check (role in ('student','parent','admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row on first sign-in
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'student')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ===========================================
-- CHAPTERS
-- ===========================================
create table if not exists public.chapters (
  id uuid primary key default gen_random_uuid(),
  subject text not null check (subject in ('Physics','Mathematics')),
  level text not null check (level in ('O-Level','A-Level')),
  title text not null,
  description text,
  content text,
  video_url text,
  "order" int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists chapters_subject_level_idx
  on public.chapters(subject, level, "order");

alter table public.chapters enable row level security;

create policy "Authenticated users can read chapters"
  on public.chapters for select
  to authenticated
  using (true);

-- ===========================================
-- CHAPTER_PROGRESS
-- ===========================================
create table if not exists public.chapter_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  chapter_id uuid not null references public.chapters(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  unique(student_id, chapter_id)
);

create index if not exists chapter_progress_student_idx
  on public.chapter_progress(student_id, viewed_at desc);

alter table public.chapter_progress enable row level security;

create policy "Students view own progress"
  on public.chapter_progress for select
  using (auth.uid() = student_id);

create policy "Students insert own progress"
  on public.chapter_progress for insert
  with check (auth.uid() = student_id);

create policy "Students update own progress"
  on public.chapter_progress for update
  using (auth.uid() = student_id);

create policy "Students delete own progress"
  on public.chapter_progress for delete
  using (auth.uid() = student_id);
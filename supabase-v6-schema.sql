-- V6: cloud learning progress + test results
-- Run this once in Supabase SQL Editor. Safe to run repeatedly.
create table if not exists public.learning_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  node_id text not null,
  language text not null,
  status text not null default 'in_progress',
  score integer,
  updated_at timestamptz not null default now(),
  primary key (user_id, node_id)
);

alter table public.learning_progress enable row level security;

drop policy if exists "learning_progress_own" on public.learning_progress;
create policy "learning_progress_own" on public.learning_progress
for all to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  node_id text not null,
  language text not null,
  score integer not null,
  passed boolean not null,
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.test_results enable row level security;

drop policy if exists "test_results_own" on public.test_results;
create policy "test_results_own" on public.test_results
for all to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

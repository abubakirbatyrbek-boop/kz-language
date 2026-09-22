-- V4 learning progress tables
create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  node_id text not null,
  language text not null check (language in ('kk','ru')),
  status text not null default 'in_progress',
  score integer,
  updated_at timestamptz not null default now(),
  unique (user_id, node_id)
);

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  node_id text not null,
  language text not null check (language in ('kk','ru')),
  score integer not null,
  passed boolean not null default false,
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.learning_progress enable row level security;
alter table public.test_results enable row level security;

drop policy if exists "learning_progress_select_own" on public.learning_progress;
create policy "learning_progress_select_own" on public.learning_progress for select to authenticated using (user_id = auth.uid());
drop policy if exists "learning_progress_insert_own" on public.learning_progress;
create policy "learning_progress_insert_own" on public.learning_progress for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "learning_progress_update_own" on public.learning_progress;
create policy "learning_progress_update_own" on public.learning_progress for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "test_results_select_own" on public.test_results;
create policy "test_results_select_own" on public.test_results for select to authenticated using (user_id = auth.uid());
drop policy if exists "test_results_insert_own" on public.test_results;
create policy "test_results_insert_own" on public.test_results for insert to authenticated with check (user_id = auth.uid());

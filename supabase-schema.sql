-- 中亚语言通：反馈表
create extension if not exists pgcrypto;

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  category text not null,
  subject text,
  message text not null,
  rating smallint check (rating between 1 and 5),
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

-- 允许未登录用户和已登录用户提交反馈，但不能随意冒充其他 user_id。
drop policy if exists "feedback_insert" on public.feedback;
create policy "feedback_insert"
on public.feedback
for insert
to anon, authenticated
with check (user_id is null or user_id = auth.uid());

-- 用户只能看到自己的反馈记录。
-- 目前前端没有开放“我的反馈”页面，但后续可以直接使用这条规则。
drop policy if exists "feedback_select_own" on public.feedback;
create policy "feedback_select_own"
on public.feedback
for select
to authenticated
using (user_id = auth.uid());

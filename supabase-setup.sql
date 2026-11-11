-- A coller dans Supabase > SQL Editor > New query, puis Run
create table public.planner (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.planner enable row level security;
create policy "lecture perso" on public.planner for select to authenticated using ((select auth.uid()) = user_id);
create policy "ajout perso" on public.planner for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "maj perso" on public.planner for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
alter publication supabase_realtime add table public.planner;

create table if not exists public.sync_states (
  id text primary key,
  payload text not null,
  updated_at timestamptz not null default now()
);

alter table public.sync_states enable row level security;

drop policy if exists "Allow encrypted personal sync reads" on public.sync_states;
drop policy if exists "Allow encrypted personal sync writes" on public.sync_states;
drop policy if exists "Allow encrypted personal sync updates" on public.sync_states;

create policy "Allow encrypted personal sync reads"
on public.sync_states
for select
to anon
using (true);

create policy "Allow encrypted personal sync writes"
on public.sync_states
for insert
to anon
with check (true);

create policy "Allow encrypted personal sync updates"
on public.sync_states
for update
to anon
using (true)
with check (true);

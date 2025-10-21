-- 1️⃣ Add new columns
alter table public.organizations
add column if not exists created_by uuid references auth.users(id) on delete set null,
add column if not exists visibility text check (visibility in ('visible', 'archived')) not null default 'visible';

-- 2️⃣ Replace the existing SELECT policy to include creator access
drop policy if exists "Members can view their organizations" on public.organizations;

create policy "Members or creators can view their organizations"
on public.organizations
for select
using (
  id in (
    select organization_id from public.organization_members
    where user_id = auth.uid()
  )
  or created_by = auth.uid()
);
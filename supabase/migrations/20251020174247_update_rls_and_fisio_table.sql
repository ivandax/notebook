-- Allow authenticated users to insert new organizations
create policy "Authenticated users can create organizations"
on public.organizations
for insert
with check (
  auth.role() = 'authenticated'
);

-- Allow authenticated users to update organizations
create policy "Authenticated users can update organizations"
on public.organizations
for update
using (
  auth.role() = 'authenticated'
)
with check (
  auth.role() = 'authenticated'
);

-- 1️⃣ Remove obsolete field
alter table public.organizations
drop column if exists is_main;

-- 2️⃣ Create new table for organization clients
create table public.fisio_organization_clients (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    name text not null,
    email text,
    phone text,
    notes text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 3️⃣ Enable RLS
alter table public.fisio_organization_clients enable row level security;

-- 4️⃣ Policy: allow select for members of the organization
create policy "Members can view clients of their organizations"
on public.fisio_organization_clients
for select
using (
  auth.role() = 'authenticated' and
  organization_id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
);

-- 5️⃣ Policy: allow insert for members of the organization
create policy "Members can insert clients into their organizations"
on public.fisio_organization_clients
for insert
with check (
  auth.role() = 'authenticated' and
  organization_id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
);

-- 6️⃣ Policy: allow update for members of the organization
create policy "Members can update clients of their organizations"
on public.fisio_organization_clients
for update
using (
  auth.role() = 'authenticated' and
  organization_id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
)
with check (
  auth.role() = 'authenticated' and
  organization_id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
);

-- 7️⃣ Policy: allow delete for members of the organization
create policy "Members can delete clients of their organizations"
on public.fisio_organization_clients
for delete
using (
  auth.role() = 'authenticated' and
  organization_id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
);

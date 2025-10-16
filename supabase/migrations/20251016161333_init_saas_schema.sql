-- Organizations table
create table public.organizations (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Profiles table (linked to Supabase Auth users)
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text unique,
    display_name text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Organization memberships (many-to-many)
create table public.organization_members (
    organization_id uuid references public.organizations(id) on delete cascade,
    user_id uuid references public.profiles(id) on delete cascade,
    role text check (role in ('owner', 'admin', 'member')) not null default 'member',
    created_at timestamptz default now(),
    primary key (organization_id, user_id)
);

-- ✅ RLS (Row Level Security)
alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.organization_members enable row level security;

-- Policies
-- Only members can see their own organization memberships
create policy "Users can view their memberships"
    on public.organization_members
    for select
    using (auth.uid() = user_id);

-- Only members can see their own profiles
create policy "Users can view their own profile"
    on public.profiles
    for select
    using (auth.uid() = id);

-- Organizations are visible only to their members
create policy "Members can view their organizations"
    on public.organizations
    for select
    using (
        id in (
            select organization_id from public.organization_members
            where user_id = auth.uid()
        )
    );
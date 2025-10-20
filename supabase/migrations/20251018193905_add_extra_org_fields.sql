-- Add slug, type and is_main to organizations
alter table public.organizations
add column slug text unique,
add column type text not null default 'test',
add column is_main boolean not null default false;

-- Add organization_role to profiles
alter table public.profiles
add column organization_role text;
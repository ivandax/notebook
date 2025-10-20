-- Add "is_default" column to organization_members
alter table public.organization_members
add column is_default boolean not null default false;

-- Ensure that each user can have at most one default organization
create unique index unique_default_org_per_user
on public.organization_members (user_id)
where is_default = true;
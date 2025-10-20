-- Drop the old insert policy
drop policy if exists "Authenticated users can create organizations" on public.organizations;

-- Allow authenticated users to create new organizations
create policy "Authenticated users can create organizations"
on public.organizations
for insert
to authenticated
with check (auth.role() = 'authenticated');
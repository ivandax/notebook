-- Allow authenticated users to insert their own memberships
create policy "Users can insert their own memberships"
on public.organization_members
for insert
to authenticated
with check (auth.uid() = user_id);

-- Allow users to update their own memberships
create policy "Users can update their own memberships"
on public.organization_members
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
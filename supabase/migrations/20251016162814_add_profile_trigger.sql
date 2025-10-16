-- Create the function that inserts a profile row when a user signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Create the trigger on the auth.users table
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
-- Create a table to store user info
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text,
  full_name text,
  email text unique,
  is_active boolean default false,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

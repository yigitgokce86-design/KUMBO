-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Users)
-- Links to Supabase Auth. Handles both Parents and Children.
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  role text check (role in ('parent', 'child')) not null,
  full_name text,
  username text unique, -- For children login
  avatar_emoji text,
  pin_code text, -- Encrypted or hashed in real app, simple for MVP
  balance decimal(10,2) default 0.00,
  allowance_amount decimal(10,2) default 0.00,
  allowance_day text, -- 'Monday', 'Friday', etc.
  parent_id uuid references profiles(id), -- For children to link to parent
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- GOALS
-- Savings goals created by children
create table goals (
  id uuid default uuid_generate_v4() primary key,
  child_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  target_amount decimal(10,2) not null,
  current_amount decimal(10,2) default 0.00,
  emoji text,
  status text check (status in ('active', 'reached', 'pending_approval')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TASKS / CHORES
-- Created by parents, completed by children
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  child_id uuid references profiles(id) on delete cascade not null,
  creator_id uuid references profiles(id), -- Parent who created it
  title text not null,
  reward_amount decimal(10,2) not null,
  status text check (status in ('available', 'pending_approval', 'approved', 'completed')) default 'available',
  is_recurring boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TRANSACTIONS
-- History of money movement (Allowance, Task Reward, Goal Contribution)
create table transactions (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references profiles(id) on delete cascade not null,
  amount decimal(10,2) not null, -- Positive for income, negative for spend/save
  description text not null,
  type text check (type in ('allowance', 'task_reward', 'goal_contribution', 'spend', 'correction')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) Policies (Concept)
-- Parents can see all data linked to their family.
-- Children can only see their own data.

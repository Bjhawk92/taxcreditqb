-- Team HQ client portal (per-user, scoped by user_id)
create table if not exists hq_members (
  user_id text primary key,
  plan text,
  consult_allowance integer not null default 1,
  consult_used integer not null default 0,
  renewal_date date,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists hq_questions (
  id serial primary key,
  user_id text not null,
  project_name text,
  body text not null,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);
create index if not exists hq_questions_user_id_idx on hq_questions (user_id);

create table if not exists hq_huddles (
  id serial primary key,
  user_id text not null,
  question text not null,
  project_info text,
  deadline text,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);
create index if not exists hq_huddles_user_id_idx on hq_huddles (user_id);

create table if not exists hq_meetings (
  id serial primary key,
  user_id text not null,
  meeting_type text not null,
  meeting_at text,
  location text,
  audience text,
  role text,
  prep text,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);
create index if not exists hq_meetings_user_id_idx on hq_meetings (user_id);

create table if not exists hq_projects (
  id serial primary key,
  user_id text not null,
  name text not null,
  location text,
  scope text,
  status text not null default 'scoping',
  next_milestone text,
  created_at timestamptz not null default now()
);
create index if not exists hq_projects_user_id_idx on hq_projects (user_id);

create table if not exists hq_messages (
  id serial primary key,
  user_id text not null,
  project_name text,
  body text not null,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);
create index if not exists hq_messages_user_id_idx on hq_messages (user_id);

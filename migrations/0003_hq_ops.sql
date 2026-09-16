-- Team HQ operations: confirmed huddle details, answers, file log, internal notes
alter table hq_huddles add column if not exists scheduled_at text;
alter table hq_huddles add column if not exists meeting_link text;
alter table hq_huddles add column if not exists notes text;
alter table hq_huddles add column if not exists action_items text;

alter table hq_questions add column if not exists answer text;

alter table hq_members add column if not exists company text;

create table if not exists hq_files (
  id serial primary key,
  user_id text not null,
  project_name text,
  name text not null,
  format text,
  status text not null default 'draft',
  version text,
  created_at timestamptz not null default now()
);
create index if not exists hq_files_user_id_idx on hq_files (user_id);

create table if not exists hq_internal_notes (
  id serial primary key,
  subject_user_id text not null,
  body text not null,
  created_at timestamptz not null default now()
);
create index if not exists hq_internal_notes_subject_idx on hq_internal_notes (subject_user_id);

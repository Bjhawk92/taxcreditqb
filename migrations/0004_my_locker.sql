-- My Locker: companies, deals, documents, modeling — additive, no drops.

alter table hq_members add column if not exists onboarding_complete boolean not null default false;
alter table hq_members add column if not exists first_name text;
alter table hq_members add column if not exists last_name text;
alter table hq_members add column if not exists phone text;
alter table hq_members add column if not exists questions_used integer not null default 0;

create table if not exists companies (
  id serial primary key,
  name text not null,
  website text,
  address text,
  city text,
  state text,
  phone text,
  email text,
  created_by text not null,
  created_at timestamptz not null default now()
);

create table if not exists company_members (
  company_id integer not null references companies (id) on delete cascade,
  user_id text not null,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  primary key (company_id, user_id)
);
create index if not exists company_members_user_id_idx on company_members (user_id);

create table if not exists developer_profiles (
  user_id text primary key,
  company_id integer references companies (id) on delete set null,
  states_active text,
  developments_completed text,
  units_developed text,
  experience text,
  updated_at timestamptz not null default now()
);

create table if not exists deals (
  id serial primary key,
  user_id text not null,
  company_id integer references companies (id) on delete set null,
  name text not null,
  address text,
  city text,
  state text,
  county text,
  hfa text,
  deal_type text,
  unit_count text,
  stage text not null default 'Evaluating Site',
  programs text,
  ami_set_asides text,
  application_due date,
  expected_award date,
  award_date date,
  expected_closing date,
  expected_construction_start date,
  expected_completion date,
  placed_in_service date,
  next_milestone text,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists deals_user_id_idx on deals (user_id);
create index if not exists deals_company_id_idx on deals (company_id);

create table if not exists deal_checklists (
  id serial primary key,
  deal_id integer not null references deals (id) on delete cascade,
  user_id text not null,
  slug text not null,
  title text not null,
  status text not null default 'not_started',
  updated_at timestamptz not null default now(),
  unique (deal_id, slug)
);
create index if not exists deal_checklists_user_id_idx on deal_checklists (user_id);

create table if not exists deal_checklist_items (
  id serial primary key,
  checklist_id integer not null references deal_checklists (id) on delete cascade,
  item_key text not null,
  label text not null,
  section text,
  status text not null default 'not_started',
  responsible text,
  due_date date,
  notes text,
  updated_at timestamptz not null default now(),
  unique (checklist_id, item_key)
);

create table if not exists locker_documents (
  id serial primary key,
  user_id text not null,
  company_id integer,
  deal_id integer references deals (id) on delete set null,
  name text not null,
  doc_type text not null default 'other',
  format text,
  body text,
  storage_ref text,
  equipment_slug text,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists locker_documents_user_id_idx on locker_documents (user_id);
create index if not exists locker_documents_deal_id_idx on locker_documents (deal_id);

create table if not exists model_requests (
  id serial primary key,
  user_id text not null,
  company_id integer,
  deal_id integer references deals (id) on delete set null,
  status text not null default 'draft',
  intake jsonb,
  customer_notes text,
  provider_notes_internal text,
  submitted_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists model_requests_user_id_idx on model_requests (user_id);

create table if not exists locker_files (
  id serial primary key,
  user_id text not null,
  company_id integer,
  deal_id integer references deals (id) on delete set null,
  model_request_id integer references model_requests (id) on delete set null,
  document_id integer references locker_documents (id) on delete set null,
  name text not null,
  file_type text,
  resource_type text,
  storage_ref text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists locker_files_user_id_idx on locker_files (user_id);

create table if not exists locker_notifications (
  id serial primary key,
  user_id text not null,
  kind text not null,
  title text not null,
  body text,
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists locker_notifications_user_id_idx on locker_notifications (user_id);

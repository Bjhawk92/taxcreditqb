-- Additive locker ops. No drops.

alter table hq_questions add column if not exists deal_id integer references deals (id) on delete set null;
create index if not exists hq_questions_deal_id_idx on hq_questions (deal_id);

alter table hq_huddles add column if not exists deal_id integer references deals (id) on delete set null;
create index if not exists hq_huddles_deal_id_idx on hq_huddles (deal_id);

alter table hq_members add column if not exists notify_nonessential boolean not null default true;

alter table locker_documents add column if not exists parent_id integer references locker_documents (id) on delete set null;

alter table locker_files add column if not exists version integer not null default 1;

alter table model_requests add column if not exists customer_visible_notes text;

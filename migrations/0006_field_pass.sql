-- Field Pass: up to three states a member wants monitored.
alter table hq_members add column if not exists followed_states text;

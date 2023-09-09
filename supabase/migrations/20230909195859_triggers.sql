create trigger create_profile
  after insert on auth.users
  for each row execute procedure public.trigger_profiles();

create trigger create_token
  after insert on auth.users
  for each row execute procedure public.trigger_tokens();
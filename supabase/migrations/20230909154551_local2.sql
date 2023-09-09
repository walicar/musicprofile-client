drop policy "LastfmTopItems are viewable by everyone." on "public"."lastfm_topitems";

drop policy "SpotifyTopItems are viewable by everyone." on "public"."spotify_topitems";

drop policy "Topitems are viewable by everyone." on "public"."topitems";

drop policy "Users can update own Topitems record." on "public"."topitems";

alter table "public"."topitems" drop constraint "topitems_id_fkey";

drop function if exists "public"."get_spotify_artists"(token text);

drop function if exists "public"."handle_new_user"();

drop function if exists "public"."handle_new_user_tokens"();

alter table "public"."topitems" drop constraint "topitems_pkey";

drop index if exists "public"."topitems_pkey";

drop table "public"."topitems";

alter table "public"."lastfm_topitems" alter column "last_updated" set default '2000-01-01 12:34:56+00'::timestamp with time zone;

alter table "public"."profiles" drop column "tokens";

alter table "public"."profiles" drop column "top_items";

alter table "public"."spotify_topitems" alter column "last_updated" set default '2000-01-01 12:34:56+00'::timestamp with time zone;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.change_user_password(current_plain_password character varying, new_plain_password character varying)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
_uid uuid; -- for checking by 'is not found'
user_id uuid; -- to store the user id from the request
BEGIN
  -- First of all check the new password rules
  -- not empty
  IF (new_plain_password = '') IS NOT FALSE THEN
    RAISE EXCEPTION 'new password is empty';
  -- minimum 6 chars
  ELSIF char_length(new_plain_password) < 6 THEN
    RAISE EXCEPTION 'it must be at least 6 characters in length';
  END IF;
  
  -- Get user by his current auth.uid and current password
  user_id := auth.uid();
  SELECT id INTO _uid
  FROM auth.users
  WHERE id = user_id
  AND encrypted_password =
  crypt(current_plain_password::text, auth.users.encrypted_password);

  -- Check the currect password
  IF NOT FOUND THEN
    RAISE EXCEPTION 'incorrect password';
  END IF;

  -- Then set the new password
  UPDATE auth.users SET 
  encrypted_password =
  crypt(new_plain_password, gen_salt('bf'))
  WHERE id = user_id;
  
  RETURN '{"data":true}';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_profiles()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_tokens()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.tokens (id)
  values (new.id);
  return new;
end;
$function$
;

create policy "Users can view their own LastfmTopItems "
on "public"."lastfm_topitems"
as permissive
for select
to public
using ((auth.uid() = id));


create policy "Users can only view their own Profiles record."
on "public"."profiles"
as permissive
for select
to public
using ((auth.uid() = id));


create policy "Users can update own Profiles record."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Users can view their own SpotifyTopItems "
on "public"."spotify_topitems"
as permissive
for select
to public
using ((auth.uid() = id));
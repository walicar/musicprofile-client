create extension if not exists "http" with schema "extensions";


create table "public"."tokens" (
    "id" uuid not null,
    "spotify" text,
    "lastfm" text
);


alter table "public"."tokens" enable row level security;

create table "public"."topitems" (
    "id" uuid not null,
    "songs" jsonb[],
    "genres" text[],
    "artists" text[]
);


alter table "public"."topitems" enable row level security;

alter table "public"."profiles" drop column "last_visited";

CREATE UNIQUE INDEX token_pkey ON public.tokens USING btree (id);

CREATE UNIQUE INDEX topitems_pkey ON public.topitems USING btree (id);

alter table "public"."tokens" add constraint "token_pkey" PRIMARY KEY using index "token_pkey";

alter table "public"."topitems" add constraint "topitems_pkey" PRIMARY KEY using index "topitems_pkey";

alter table "public"."tokens" add constraint "tokens_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."tokens" validate constraint "tokens_id_fkey";

alter table "public"."topitems" add constraint "topitems_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."topitems" validate constraint "topitems_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_spotify_artists(token text)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
declare
        result jsonb;
begin
        select content::jsonb
        from http((
                'GET',
                'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=0',
                ARRAY[http_header('Authorization','Bearer ' || token)],
                NULL,
                NULL
        )::http_request)
        into result;
        return result;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user_tokens()
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

create policy "Tokens are viewable by users who created them."
on "public"."tokens"
as permissive
for select
to public
using ((auth.uid() = id));


create policy "Users can update own Tokens record."
on "public"."tokens"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Topitems are viewable by everyone."
on "public"."topitems"
as permissive
for select
to public
using (true);


create policy "Users can update own Topitems record."
on "public"."topitems"
as permissive
for update
to public
using ((auth.uid() = id));
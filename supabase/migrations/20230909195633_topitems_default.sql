alter table "public"."lastfm_topitems" alter column "artists" set default '{}'::jsonb[];

alter table "public"."lastfm_topitems" alter column "genres" set default '{}'::jsonb[];

alter table "public"."lastfm_topitems" alter column "songs" set default '{}'::jsonb[];

alter table "public"."spotify_topitems" alter column "artists" set default '{}'::jsonb[];

alter table "public"."spotify_topitems" alter column "genres" set default '{}'::jsonb[];

alter table "public"."spotify_topitems" alter column "songs" set default '{}'::jsonb[];
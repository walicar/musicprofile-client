create table "public"."lastfm_topitems" (
    "id" uuid not null,
    "songs" jsonb[],
    "genres" jsonb[],
    "artists" jsonb[],
    "last_updated" timestamp with time zone
);


alter table "public"."lastfm_topitems" enable row level security;

create table "public"."spotify_topitems" (
    "id" uuid not null,
    "songs" jsonb[],
    "genres" jsonb[],
    "artists" jsonb[],
    "last_updated" timestamp with time zone
);


alter table "public"."spotify_topitems" enable row level security;

alter table "public"."topitems" add column "last_updated" timestamp with time zone;

CREATE UNIQUE INDEX lastfm_topitems_pkey ON public.lastfm_topitems USING btree (id);

CREATE UNIQUE INDEX spotify_topitems_pkey ON public.spotify_topitems USING btree (id);

alter table "public"."lastfm_topitems" add constraint "lastfm_topitems_pkey" PRIMARY KEY using index "lastfm_topitems_pkey";

alter table "public"."spotify_topitems" add constraint "spotify_topitems_pkey" PRIMARY KEY using index "spotify_topitems_pkey";

alter table "public"."lastfm_topitems" add constraint "lastfm_topitems_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."lastfm_topitems" validate constraint "lastfm_topitems_id_fkey";

alter table "public"."spotify_topitems" add constraint "spotify_topitems_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."spotify_topitems" validate constraint "spotify_topitems_id_fkey";

create policy "LastfmTopItems are viewable by everyone."
on "public"."lastfm_topitems"
as permissive
for select
to public
using (true);


create policy "Users can update own LastfmTopItems record."
on "public"."lastfm_topitems"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "SpotifyTopItems are viewable by everyone."
on "public"."spotify_topitems"
as permissive
for select
to public
using (true);


create policy "Users can update own SpotifyTopItems record."
on "public"."spotify_topitems"
as permissive
for update
to public
using ((auth.uid() = id));
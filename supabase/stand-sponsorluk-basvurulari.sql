create extension if not exists pgcrypto;

create table if not exists public.stand_basvurulari (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  firma_adi text not null,
  segment text not null check (segment in ('Startup', 'KOBİ', 'Büyük Firma')),
  yetkili_kisi text not null,
  email text not null,
  telefon text,
  web_sitesi text,
  sektor text not null,
  urun_aciklamasi text not null,
  stand_ihtiyaci text not null,
  ozel_ihtiyaclar text[] not null default '{}',
  notlar text,
  durum text not null default 'beklemede'
);

alter table public.stand_basvurulari enable row level security;

drop policy if exists "Anon stand basvurusu ekleyebilir" on public.stand_basvurulari;
create policy "Anon stand basvurusu ekleyebilir"
on public.stand_basvurulari
for insert
to anon
with check (true);

create table if not exists public.sponsorluk_basvurulari (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  firma_adi text not null,
  yetkili_kisi text not null,
  email text not null,
  telefon text,
  web_sitesi text,
  sponsor_tipi text not null,
  butce_araligi text not null,
  gorunurluk_beklentisi text[] not null default '{}',
  notlar text,
  durum text not null default 'beklemede'
);

alter table public.sponsorluk_basvurulari enable row level security;

drop policy if exists "Anon sponsorluk basvurusu ekleyebilir" on public.sponsorluk_basvurulari;
create policy "Anon sponsorluk basvurusu ekleyebilir"
on public.sponsorluk_basvurulari
for insert
to anon
with check (true);

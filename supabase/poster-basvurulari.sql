create extension if not exists pgcrypto;

create table if not exists public.poster_basvurulari (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ad_soyad text not null,
  kurum text not null,
  email text not null,
  telefon text,
  poster_basligi text not null,
  konu_basligi text not null,
  ozet text not null,
  pdf_url text not null,
  durum text not null default 'beklemede'
);

alter table public.poster_basvurulari enable row level security;

drop policy if exists "Anon poster basvurusu ekleyebilir" on public.poster_basvurulari;
create policy "Anon poster basvurusu ekleyebilir"
on public.poster_basvurulari
for insert
to anon
with check (true);

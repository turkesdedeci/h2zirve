create extension if not exists pgcrypto;

create table if not exists public.katilimci_kayitlari (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ad_soyad text not null,
  email text not null,
  telefon text,
  kurum text not null,
  unvan text,
  katilimci_tipi text not null,
  katilim_gunu text not null,
  ilgi_alanlari text[] not null default '{}',
  kvkk_onayi boolean not null,
  notlar text,
  durum text not null default 'kayit_alindi'
);

alter table public.katilimci_kayitlari enable row level security;

drop policy if exists "Anon katilimci kaydi ekleyebilir" on public.katilimci_kayitlari;
create policy "Anon katilimci kaydi ekleyebilir"
on public.katilimci_kayitlari
for insert
to anon
with check (kvkk_onayi = true);

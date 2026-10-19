-- Karekodla panel/keynote soru-sorma sistemi. Supabase SQL Editor'de bir kez çalıştırın.
create extension if not exists pgcrypto;

create table if not exists public.panel_sorulari (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  oturum text not null,
  ad_soyad text,
  soru text not null check (char_length(soru) between 3 and 400),
  durum text not null default 'bekliyor' check (durum in ('bekliyor', 'soruldu', 'gizli'))
);

create index if not exists panel_sorulari_oturum_idx on public.panel_sorulari (oturum, created_at);

alter table public.panel_sorulari enable row level security;
-- Bilerek policy yok: yalnızca service role (sunucu API'leri) erişir.

create extension if not exists pgcrypto;

create table if not exists public.juri_uyeleri (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ad_soyad text not null,
  email text,
  token uuid not null default gen_random_uuid() unique,
  aktif boolean not null default true
);

alter table public.juri_uyeleri enable row level security;
-- Bilerek hiçbir anon/authenticated policy tanımlanmadı: bu tabloya yalnızca
-- service role (sunucu tarafı API/sayfa) erişebilir.

create table if not exists public.poster_degerlendirmeleri (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  poster_id uuid not null references public.poster_basvurulari(id) on delete cascade,
  juri_id uuid not null references public.juri_uyeleri(id) on delete cascade,
  bilimsel_icerik smallint not null check (bilimsel_icerik between 1 and 5),
  metodoloji smallint not null check (metodoloji between 1 and 5),
  gorsel_tasarim smallint not null check (gorsel_tasarim between 1 and 5),
  sunum_netligi smallint not null check (sunum_netligi between 1 and 5),
  soru_cevap smallint not null check (soru_cevap between 1 and 5),
  genel_puan smallint not null check (genel_puan between 1 and 10),
  yorum text,
  unique (poster_id, juri_id)
);

alter table public.poster_degerlendirmeleri enable row level security;
-- Bu tabloya da yalnızca service role erişir (anon/authenticated policy yok).

-- Yeni bir jüri üyesi eklemek ve kişiye özel değerlendirme linkini almak için:
--   insert into public.juri_uyeleri (ad_soyad, email)
--   values ('Ad Soyad', 'eposta@ornek.com')
--   returning token;
-- Link: https://<site>/juri/<token>

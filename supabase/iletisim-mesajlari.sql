create extension if not exists pgcrypto;

create table if not exists public.iletisim_mesajlari (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ad_soyad text not null,
  email text not null,
  konu text,
  mesaj text not null,
  -- Bildirim e-postası gönderilebildi mi. false ise mesaj yalnızca bu tabloda
  -- duruyordur; posta kutusuna düşmemiştir, buradan takip edilmesi gerekir.
  mail_gonderildi boolean not null default false,
  durum text not null default 'yeni'
);

alter table public.iletisim_mesajlari enable row level security;

-- Diğer formlarla aynı desen: anon yalnızca ekleyebilir, okuyamaz.
drop policy if exists "Anon iletisim mesaji ekleyebilir" on public.iletisim_mesajlari;
create policy "Anon iletisim mesaji ekleyebilir"
on public.iletisim_mesajlari
for insert
to anon
with check (true);

create index if not exists iletisim_mesajlari_created_at_idx
  on public.iletisim_mesajlari (created_at desc);

-- Gönderilemeyen mesajları listelemek için:
--   select created_at, ad_soyad, email, konu, mesaj
--   from public.iletisim_mesajlari
--   where mail_gonderildi = false
--   order by created_at desc;

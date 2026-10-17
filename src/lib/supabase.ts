import { createClient } from "@supabase/supabase-js";

// Ortam değişkenleri yoksa (ör. env tanımlanmamış bir Vercel Preview derlemesi) derleme düşmesin.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

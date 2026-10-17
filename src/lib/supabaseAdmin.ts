import { createClient } from "@supabase/supabase-js";

// Ortam değişkenleri yoksa (ör. env tanımlanmamış bir Vercel Preview derlemesi) modül yüklenirken
// hata atmasın; gerçek istekler yine de yapılandırılmamış anahtarla çalışmaz.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder-service-role-key";

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

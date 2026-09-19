/**
 * Kayıt tamamlandıktan sonra katılımcıya onay maili gönderir.
 * Mail gönderilemese bile kayıt akışı etkilenmez; hata yalnızca loglanır.
 */
export async function kayitOnayGonder(email: string) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch("/api/kayit-onay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn("Kayıt onay maili gönderilemedi.", response.status);
    }
  } catch (error) {
    console.warn("Kayıt onay maili gönderilemedi.", error);
  } finally {
    window.clearTimeout(timeout);
  }
}

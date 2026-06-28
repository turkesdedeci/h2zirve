type BackupType = "poster" | "stand" | "sponsorluk";

export async function backupSubmission(type: BackupType, payload: Record<string, unknown>) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch("/api/backup-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, payload }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn("Başvuru Google Sheets yedeğine aktarılamadı.", response.status);
    }
  } catch (error) {
    console.warn("Başvuru Google Sheets yedeğine aktarılamadı.", error);
  } finally {
    window.clearTimeout(timeout);
  }
}

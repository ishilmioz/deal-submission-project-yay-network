import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const { GOOGLE_SA_EMAIL, GOOGLE_SA_KEY, SHEET_ID } = process.env;

// DEBUG
const pkRawLen = (GOOGLE_SA_KEY || "").length;
const pk = (GOOGLE_SA_KEY || "").replace(/\\n/g, "\n");
const pkStarts = pk.trim().startsWith("-----BEGIN PRIVATE KEY-----");
console.log("DEBUG:", { email_ok: !!GOOGLE_SA_EMAIL, pkRawLen, pkStarts, sheet_ok: !!SHEET_ID });

if (!GOOGLE_SA_EMAIL || !SHEET_ID || !pk) {
  console.error("❌ Env eksik veya anahtar boş.");
  process.exit(1);
}

try {
  // 🔧 ÖNEMLİ: Positional yerine options nesnesi kullan
  const auth = new google.auth.JWT({
    email: GOOGLE_SA_EMAIL,
    key: pk,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  await auth.authorize();

  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "A:Z",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[new Date().toISOString(), "TEST", "connection", "ok"]],
    },
  });

  console.log("✅ Append OK:", res.status);
} catch (err) {
  console.error("❌ Hata:", err.message);
  if (err.response?.data) console.error("↳ Detay:", JSON.stringify(err.response.data));
  process.exit(1);
}

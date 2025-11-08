// lib/sheets.js
import { google } from "googleapis";

const EMAIL = process.env.GOOGLE_SA_EMAIL;
const KEY = (process.env.GOOGLE_SA_KEY || "").replace(/\\n/g, "\n");
if (!EMAIL || !KEY) throw new Error("Missing GOOGLE_SA_EMAIL or GOOGLE_SA_KEY");

let _sheets = global._sheetsClient;
export async function getSheetsClient() {
  if (_sheets) return _sheets;
  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: EMAIL, private_key: KEY },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const authClient = await auth.getClient();
  _sheets = google.sheets({ version: "v4", auth: authClient });
  global._sheetsClient = _sheets;
  return _sheets;
}

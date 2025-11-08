// pages/api/submit.js
import { getSheetsClient } from "../../lib/sheets";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const {
      dealName,
      telegramUsername,
      email,
      walletAddress,
      desiredAllocation,
    } = req.body || {};

    if (!dealName || !telegramUsername || !email || !walletAddress || String(desiredAllocation).trim() === '') {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.SHEET_ID;

    const read = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Submissions!A:F",
    });
    const rows = read.data.values || [];
    const isDup = rows.some((r) => (r[1] || "") === dealName && (r[4] || "") === walletAddress);
    if (isDup) {
      return res.status(400).json({ ok: false, error: "You have already submitted for this deal." });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Submissions!A:F",        
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[
          new Date().toISOString(),
          dealName,
          telegramUsername,
          email,
          walletAddress,
          desiredAllocation ?? "",       
        ]],
      },
    });

    return res.status(201).json({ ok: true, message: "Application submitted successfully!" });
  } catch (err) {
    console.error("/api/submit error:", err);
    return res.status(500).json({ ok: false, error: err.message || "Internal Server Error" });
  }
}

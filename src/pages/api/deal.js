// pages/api/deal.js
import { getSheetsClient } from "../../lib/sheets";

export default async function handler(req, res) {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.SHEET_ID;

    const read = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Deals!A:B", // name | isActive
    });

    const rows = read.data.values || [];
    // header'ı atla, isActive = TRUE/true/1 olan ilk satırı bul
    const active = rows.slice(1).find((r) => {
      const flag = (r[1] || "").toString().trim().toLowerCase();
      return flag === "true" || flag === "1" || flag === "yes";
    });

    if (!active) {
      return res.status(404).json({ error: "No active deal found" });
    }

    return res.status(200).json({ dealName: active[0] || "" });
  } catch (error) {
    console.error("Error fetching the deal:", error);
    return res.status(500).json({ error: "Failed to fetch the deal" });
  }
}

export default async function handler(req, res) {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Pesan kosong" });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }]
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ AI tidak merespon";

    res.status(200).json({ reply });

  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
}

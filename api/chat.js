export default async function handler(req, res) {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      return res.status(200).json({ reply: "❌ API KEY tidak terbaca" });
    }

    const body = req.body;

    if (!body || !body.text) {
      return res.status(200).json({ reply: "❌ Tidak ada input" });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: body.text }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("HASIL GEMINI:", data);

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ AI tidak merespon (kemungkinan API key / quota)";

    res.status(200).json({ reply });

  } catch (err) {
    res.status(200).json({ reply: "❌ Server crash: " + err.message });
  }
}

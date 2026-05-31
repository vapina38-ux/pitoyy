export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ jawaban: "Gunakan POST" });
  }

  try {
    const { pesan } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: pesan }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({
        jawaban: "Error Gemini: " + data.error.message
      });
    }

    const jawaban = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({
      jawaban: jawaban || "AI tidak menjawab. Cek API key Gemini atau model."
    });

  } catch (err) {
    return res.status(500).json({
      jawaban: "Server error: " + err.message
    });
  }
}

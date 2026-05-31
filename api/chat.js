export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Gunakan POST" });
  }

  const { pesan } = req.body;

  try {
    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: pesan
      })
    });

    const data = await r.json();

    res.status(200).json({
      jawaban: data.output_text || data.error?.message || "AI tidak menjawab."
    });

  } catch (err) {
    res.status(500).json({
      jawaban: "Error server: " + err.message
    });
  }
}

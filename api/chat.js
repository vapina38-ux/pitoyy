export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Gunakan POST" });
  }

  try {
    const { pesan } = req.body;

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Kamu adalah Pitoyy AI, asisten ramah berbahasa Indonesia."
          },
          {
            role: "user",
            content: pesan
          }
        ]
      })
    });

    const data = await r.json();

    res.status(200).json({
      jawaban: data.choices?.[0]?.message?.content || "AI tidak menjawab."
    });

  } catch (err) {
    res.status(500).json({
      error: "Gagal menghubungi AI"
    });
  }
}

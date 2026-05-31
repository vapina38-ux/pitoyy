export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Gunakan method POST" });
  }

  const { pesan } = req.body;

  if (!pesan) {
    return res.status(400).json({ error: "Pesan kosong" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.5-mini",
        input: pesan
      })
    });

    const data = await response.json();

    return res.status(200).json({
      jawaban: data.output_text || "AI tidak memberi jawaban."
    });

  } catch (error) {
    return res.status(500).json({
      error: "Gagal menghubungi AI"
    });
  }
}

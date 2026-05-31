export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ jawaban: "Method tidak diizinkan" });
  }

  try {
    const { pesan } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: pesan
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const jawaban =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI tidak menjawab.";

    return res.status(200).json({ jawaban });

  } catch (err) {
    return res.status(500).json({
      jawaban: "Error: " + err.message
    });
  }
}

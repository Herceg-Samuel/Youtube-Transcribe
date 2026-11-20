import { Hono } from "hono";
import { transcribeYoutube } from "./lib/transcribe";

const app = new Hono();

app.get("/", async (c) => {
  const youtubeUrl = c.req.query("url");

  if (!youtubeUrl) {
    return c.text("Please provide a YouTube URL as a query parameter. Example: /?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }

  try {
    const transcription = await transcribeYoutube(youtubeUrl);
    if (!transcription) {
      return c.json({ error: "Transcription failed or returned empty." }, 500);
    }
    return c.text(transcription);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "An unknown error occurred" }, 500);
  }
});

export default app;

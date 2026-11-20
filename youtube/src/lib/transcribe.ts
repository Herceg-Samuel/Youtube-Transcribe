
import ytdl from 'ytdl-core';
import { AssemblyAI } from 'assemblyai';

const assemblyai = new AssemblyAI({
  apiKey: "YOUR_ASSEMBLYAI_API_KEY",
});

export async function transcribeYoutube(url: string) {
  if (!ytdl.validateURL(url)) {
    throw new Error("Invalid YouTube URL");
  }

  const audioStream = ytdl(url, {
    filter: 'audioonly',
    quality: 'lowestaudio',
  });

  const transcript = await assemblyai.transcripts.transcribe({
    audio: audioStream,
  });

  if (transcript.status === 'error') {
    throw new Error(transcript.error);
  }

  return transcript.text;
}

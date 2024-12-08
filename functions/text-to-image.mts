import { Context } from '@netlify/functions'
import { fail } from 'assert'

const API_KEY = Netlify.env.get('DREAMSTUDIO_API_KEY') ?? fail('Environment variable DREAMSTUDIO_API_KEY is required');
const ENDPOINT_URL = Netlify.env.get('DREAMSTUDIO_ENDPOINT') ?? fail('Environment variable DREAMSTUDIO_ENDPOINT is required');

export default async (request: Request, context: Context) => {
  const searchParams = new URL(request.url).searchParams;
  const description = searchParams.get('description');
  const prompt = `Photograph of ${description}`;

  const response = await fetch(ENDPOINT_URL, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json; charset=utf-8',
      "Accept": 'application/json',
      "Authorization": API_KEY,
    },
    body: JSON.stringify({
      cfg_scale: 6,
      clip_guidance_preset: 'FAST_BLUE',
      height: 512,
      width: 512,
      samples: 1,
      steps: 60,
      text_prompts: [
        {
          text: prompt,
          weight: 1
        }
      ],
    })
  });

  const data = await response.json();
  const image = data.artifacts[0].base64;
  return new Response(
    image,
    {
      headers: {
        'Content-Type': 'image/jpeg'
      }
    }
  );
}



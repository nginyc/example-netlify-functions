import { Context } from '@netlify/functions'
import { fail } from 'assert'

const API_KEY = Netlify.env.get('STABILITY_API_KEY') ?? fail('Environment variable STABILITY_API_KEY is required');
const ENDPOINT_URL = Netlify.env.get('STABILITY_TEXT_TO_IMAGE_ENDPOINT') ?? fail('Environment variable STABILITY_TEXT_TO_IMAGE_ENDPOINT is required');

export default async (request: Request, context: Context) => {
  const { description } = await request.json();

  const response = await fetch(ENDPOINT_URL, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json; charset=utf-8',
      "Accept": 'image/png',
      "Authorization": API_KEY,
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: description,
          weight: 1
        }
      ],
    })
  });

  return new Response(response.body);
}



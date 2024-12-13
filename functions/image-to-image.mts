import { Context } from '@netlify/functions'
import { fail } from 'assert'

const API_KEY = Netlify.env.get('STABILITY_API_KEY') ?? fail('Environment variable STABILITY_API_KEY is required');
const ENDPOINT_URL = Netlify.env.get('STABILITY_IMAGE_TO_IMAGE_ENDPOINT') ?? fail('Environment variable STABILITY_IMAGE_TO_IMAGE_ENDPOINT is required');

export default async (request: Request, context: Context) => {
  const { description, image } = await request.json();
  const imageBlob = await convertBase64ToBlob(image, 'image/png');

  const formData = new FormData();
  formData.append("init_image", imageBlob)
  formData.append("text_prompts[0][text]", description);

  const resp = await fetch(ENDPOINT_URL, {
    method: 'POST',
    headers: {
      "Accept": 'image/png',
      "Authorization": API_KEY,
    },
    body: formData
  });
  console.error(resp);

  return new Response(resp.body);
}

async function convertBase64ToBlob(base64: string, type: string) {
  const res = await fetch(`data:${type};base64,${base64}`);
  return res.blob();
}
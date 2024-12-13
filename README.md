# Example - Netlify Functions

This is [@nginyc](git@github.com:nginyc/example-netlify-functions.git)'s example of how to create a Netlify function.

The example function hits [Stability AI's "text-to-image" API](https://platform.stability.ai/docs/api-reference#tag/SDXL-1.0-and-SD1.6/operation/textToImage) to generate an image given a description.

## Setup

1. Use Visual Studio Code as your IDE.

2. Create a (free) Netlify account

3. [Install the Netlify CLI](https://docs.netlify.com/cli/get-started/#installation) and [authenticate with Netlify](https://docs.netlify.com/cli/get-started/#authentication):

```sh
npm install netlify-cli -g
netlify login
```

4. Install this project's dependencies:

```sh

npm ci
```

5. Duplicate `.env.template` to a new file `.env` and fill in your API keys


## Development

Run:

```sh
netlify functions:serve
```

To test the functions, hit the locally-deployed function endpoint by running:

```sh
curl -H "Content-Type: application/json" -d "{\"description\": \"wabi sabi bedroom\"}" -X POST "http://localhost:9999/.netlify/functions/text-to-image" > images/room-wabi-sabi.png
```

```sh
echo "{\"description\": \"wabi sabi bedroom\", \"image\": \"$(cat images/room.png | base64)\"}" | curl -H "Content-Type: application/json" -d @- -X POST "http://localhost:9999/.netlify/functions/image-to-image" > images/room-wabi-sabi-reimagined.png
```

Then check out the generated images in the `images/` folder.


## Deployment

Deploy this project on your Netlify account. 

While deploying, you will need to provide all the environment variables that correspond that in `.env.template`.
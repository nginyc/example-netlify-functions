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

To test the function, hit the locally-deployed function endpoint by running:

```sh
curl "http://localhost:9999/.netlify/functions/text-to-image?description=donald+biden" | base64 -d > donald.jpeg
```

Then check out the generated image `donald.jpeg`.


## Deployment

Deploy this project on your Netlify account. 

While deploying, you will need to provide all the environment variables that correspond that in `.env.template`.

After deploying, you can hit the function endpoint deployed on Netlify by running:


```sh
curl "https://<your Netlify project site URL>/.netlify/functions/text-to-image?description=joe+trump" | base64 -d > joe.jpeg
```

Then check out the generated image `joe.jpeg`.
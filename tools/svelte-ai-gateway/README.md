# overview

This app tries to serve as a llm proxy that allows you to have one API key and multiple Proxy Keys generated for it.Only because as of now i haven't found the think i was looking for.

## TODO

- AuthZ
    - Auth0 maybe?
    - we need one admin
    - and want to use the company IAM (AAD)
    - maybe thats overhead and we store the admin pw somewhere in the k8s
- persistence
    - add prisma for db
    - persist Proxy Key in db (or maybe superbase?)
- request API key 
    - the easiest would be link with email
- payload logic of api keys
    - have at least the 3 openai models available 
    - <del>have a list that shows an overview of the configured models</del>
    - rate limit the endpoints if user has exceeded the token limit of their key
- configure at least one extra LLM 
    - e.g. localai in a separate container


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

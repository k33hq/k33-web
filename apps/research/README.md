# Research

## Build

```shell
pnpm install
pnpm --dir packages/ui build
pnpm --dir apps/research export
```

## Run locally

```shell
pnpm --dir apps/research dev
```

URL: https://localhost:3000/research

## Deploy

```shell
# dev
firebase deploy --only hosting:k33-research-dev

# prod
firebase deploy --only hosting:k33-research
```

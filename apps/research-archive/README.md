# Research Archive

## Build

```shell
pnpm install
pnpm --dir packages/ui build
pnpm --dir apps/research-archive export
```

## Run locally

```shell
pnpm --dir apps/research-archive dev
```

URL: https://localhost:3000/research/archive/articles/{{slug}}

## Deploy

```shell
# dev
firebase deploy --only hosting:k33-research-archive-dev

# prod
firebase deploy --only hosting:k33-research-archive
```

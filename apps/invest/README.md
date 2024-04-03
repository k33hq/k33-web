# Invest

## Build

```shell
pnpm install
pnpm --dir packages/ui build
pnpm --dir apps/invest export
```

## Run locally

```shell
pnpm --dir apps/invest dev
```

URL: https://localhost:3000/apps/invest

## Deploy

```shell
# dev
firebase deploy --only hosting:k33-invest-dev

# prod
firebase deploy --only hosting:k33-invest
```

# Auth

## Build

```shell
pnpm install
pnpm --dir packages/ui build
```

## Run locally

```shell
pnpm --dir apps/auth dev
```

URL: https://localhost:3000/services/auth

## Deploy

```shell
# dev
firebase deploy --only hosting:k33-auth-dev

# prod
firebase deploy --only hosting:k33-auth
```

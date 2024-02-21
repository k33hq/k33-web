# Vault

## Build

```shell
pnpm install
pnpm --dir packages/ui build
```

## Run locally

```shell
pnpm --dir apps/vault dev
```

URL: https://localhost:3000/apps/vault

## Deploy

```shell
# dev
firebase deploy --only hosting:k33-vault-dev

# prod
firebase deploy --only hosting:k33-vault
```

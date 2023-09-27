# Deploy to Firebase Hosting

## Build

```shell
pnpm install
pnpm --dir packages/ui build
```

```shell
pnpm --dir apps/research export
pnpm --dir apps/research-archive export
pnpm --dir apps/invest export
pnpm --dir apps/auth export
```
## k33-dev

```shell
firebase deploy --only hosting:k33-platform-dev
firebase deploy --only hosting:k33-research-dev
firebase deploy --only hosting:k33-research-archive-dev
firebase deploy --only hosting:k33-invest-dev
firebase deploy --only hosting:k33-auth-dev
firebase deploy --only hosting:k33-dev
```

## k33-prod

```shell
firebase deploy --only hosting:k33-platform
firebase deploy --only hosting:k33-research
firebase deploy --only hosting:k33-research-archive
firebase deploy --only hosting:k33-invest
firebase deploy --only hosting:k33-auth
firebase deploy --only hosting:k33-prod
```

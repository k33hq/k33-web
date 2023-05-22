# Deploy to Firebase Hosting

## Build

```shell
pnpm install
pnpm --dir apps/platform export
pnpm --dir apps/research export
pnpm --dir apps/invest export
pnpm --dir apps/market export
pnpm --dir apps/auth export
```
## k33-dev

```shell
firebase deploy --only hosting:k33-platform-dev
firebase deploy --only hosting:k33-research-dev
firebase deploy --only hosting:k33-invest-dev
firebase deploy --only hosting:k33-markets-dev
firebase deploy --only hosting:k33-auth-dev
```

## k33-prod

```shell
firebase deploy --only hosting:k33-platform
firebase deploy --only hosting:k33-research
firebase deploy --only hosting:k33-invest
firebase deploy --only hosting:k33-markets
firebase deploy --only hosting:k33-auth
```

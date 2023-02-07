# Deploy to Firebase Hosting

## k33-dev

```shell
firebase deploy --only hosting:k33-platform-dev
firebase deploy --only hosting:k33-research-dev
firebase deploy --only hosting:k33-invest-dev
firebase deploy --only hosting:k33-markets-dev
```

## k33-prod

```shell
firebase deploy --only hosting:k33-platform
firebase deploy --only hosting:k33-research
firebase deploy --only hosting:k33-invest
firebase deploy --only hosting:k33-markets
```

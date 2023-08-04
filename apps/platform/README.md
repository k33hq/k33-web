# Platform

```shell
unzip k33-web.webflow.zip -d apps/platform/out/
cp apps/platform/public/* apps/platform/out/
```

## Deploy

```shell
# dev
firebase deploy --only hosting:k33-platform-dev

# prod
firebase deploy --only hosting:k33-platform
```

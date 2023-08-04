# Infra

## Load secrets from 1Password to .env files

```shell
# dev
APP_ENV=dev op inject -i .env.template -o .env.development.local --account k33.1password.com
cp .env.development.local .env

# prod
APP_ENV=prod op inject -i .env.template -o .env.production.local --account k33.1password.com
cp .env.production.local .env
```


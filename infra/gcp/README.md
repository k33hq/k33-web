# Infra

## Load secrets from 1Password to .env

```shell
APP_ENV=dev op inject -i .env.template -o .env --account k33.1password.com

APP_ENV=prod op inject -i .env.template -o .env --account k33.1password.com
```


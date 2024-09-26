# Run production build

> ⚠️ You must have an `.env.production.local` in order to build a production build.

First generate the dependency injection files:
```shell
just ioc-generate
```

Next run a production build:

```shell
just build
```

Finally execute the remix server

```shell
just start
```
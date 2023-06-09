## Install prisma

## Set up prisma
## Init prisma client with postgresql database

```bash
$ pnpx prisma init --datasource-provider postgresql

```
## Migrate schema all databases 

```bash
$ npx prisma migrate dev --name init
```
## Sync new schema (Regenerate model type in node_modules/@prisma/client) 

```bash
$ npx prisma generate
```
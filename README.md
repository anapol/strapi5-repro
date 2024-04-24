# Issue Reproduction Repository - Strapi with PostgreSQL

This repository contains a simple setup to reproduce the issues described at

- https://github.com/strapi/strapi/issues/19977
- https://github.com/strapi/strapi/issues/20187

## Prerequisites

Ensure you have Docker installed and running on your machine. The instructions provided are intended for Unix-like operating systems and may have performance considerations on Windows due to filesystem interactions with Docker.

## Issue Reproduction Steps

### Branch main

This branch is set up for reproduction and testing with a clean environment with the Strapi 5 beta. Follow these commands in a single terminal session:

```bash
docker compose up -d
docker compose exec strapi bash

cd strapi/
yarn global add create-strapi-app@5.0.0-beta.5
export PATH="$(yarn global bin):$PATH"
create-strapi-app project --no-run --quickstart
cd project/
yarn add pg
yarn develop
```

After setup, access the Strapi admin at `http://localhost:1337/admin/` and perform the following:

- Add a new admin user.
- Create new collection types:
  - **collection1**: with a field `name` of type string.
  - **collection2**: with a field `name` of type string and a relation to **collection1**.
- Use the content manager to:
  - Create and publish **collection1/item1**.
  - Create and publish **collection2/item2** with a relation set to **item1**.
  - Remove and re-add the relation from **collection2/item2** to **item1** and publish. This will fail with an error: "Maximum call stack size exceeded" or cause the development server to exit when run with a larger stack size like `node --stack-size=64000 ./node_modules/.bin/strapi develop`.

### Branch intracollection #19977

This branch is preconfigured with content-types and strapi project to reproduce the issue between collection1 and collection2 as described above (which is https://github.com/strapi/strapi/issues/19977). Execute these commands:

```bash
docker compose up -d
docker compose exec strapi bash

cd strapi/project
yarn
yarn develop
```

- after that, http://localhost:1337/admin/, add some admin
- In content manager
    - create and publish collection1/item1
    - create and publish collection2/item2 with relation set to item1
    - remove the relation from collection2/item2 and publish
    - again add the relation to collection2/item2 to item1 and publish -> fails
    - fails with Maximum call stack size exceeded or just exits the dev server when run with larger stack like node --stack-size=64000 ./node_modules/.bin/strapi develop

### Branch selfreferencing #20187

This branch is preconfigured with content-types and strapi project to reproduce the issue with self-referecing relation https://github.com/strapi/strapi/issues/20187. Execute these commands:

```bash
docker compose up -d
docker compose exec strapi bash

cd strapi/project
yarn
yarn develop
```

- after that, http://localhost:1337/admin/, add some admin
- In content manager
    - create and save SelfReferencing/item1 (no relations set)
    - add parent relation to self on item1 and save ->
    - fails with Maximum call stack size exceeded or just exits the dev server when run with larger stack like node --stack-size=64000 ./node_modules/.bin/strapi develop


## Notes

- This repository is set up for a one-time reproduction of the issue.
- It's worth noting that there may be performance impacts on Windows environments.
- The `./postgres/data` directory can be removed to reset the database for fresh testing when the containers are down.
```
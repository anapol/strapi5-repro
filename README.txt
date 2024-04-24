Repro (Docker):


docker compose up -d
docker compose exec strapi bash
cd strapi/
yarn global add create-strapi-app@5.0.0-beta.5
export PATH="$(yarn global bin):$PATH"
create-strapi-app project --no-run --quickstart
cd project/
yarn add pg
yarn develop

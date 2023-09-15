# bankrupt-officer-search-web
Web application for searching for bankrupt officers

## Technologies

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/) 
- [NunJucks](https://mozilla.github.io/nunjucks)
- [GulpJS](https://gulpjs.com/)
- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Docker](https://www.docker.com/)
- [Tilt](https://tilt.dev/)

## Recommendations

We recommend the use of [Visual Studio Code](https://code.visualstudio.com/) for development as it allows the installation of the [ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint) and the [Nunjucks](https://marketplace.visualstudio.com/items?itemName=ronnidc.nunjucks) plugins. These plugins will make linting of TS and Nunjuck much better than most code editors.

IntelliJ does not have a Nunjuck plugin but you can configure IntelliJ to provide syntax highlighting using Twig plugin

## Running locally

1. Clone [Docker CHS Development](https://github.com/companieshouse/docker-chs-development) and follow the steps in the README.

2. Enable the `bankrupt` module

3. Navigate to `http://chs.local/admin/officer-search/scottish-bankrupt-officer` to see the landing page

## To make local changes

Development mode is available for this service in [Docker CHS Development](https://github.com/companieshouse/docker-chs-development).

    ./bin/chs-dev modules enable bankrupt

## To build the Docker container

1. `export SSH_PRIVATE_KEY_PASSPHRASE='[your SSH key passhprase goes here]'` (optional, set only if SSH key is passphrase protected)
2. `DOCKER_BUILDKIT=0 docker build --build-arg SSH_PRIVATE_KEY="$(cat ~/.ssh/id_rsa)" --build-arg SSH_PRIVATE_KEY_PASSPHRASE -t 169942020521.dkr.ecr.eu-west-1.amazonaws.com/local/bankrupt-officer-search-web:latest .`

### Endpoints

Method | Path | Description
--- | --- | ---
GET | `/admin/officer-search/scottish-bankrupt-officer` | Returns result(s) for a Scottish bankrupt officer(s) based on search parameters inserted
GET | `/admin/officer-search/scottish-bankrupt-officer/{id}` | Returns the result for a Scottish bankrupt officer based on the {id}.

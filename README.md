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

### Requirements

1. node v24 (Concourse pipeline builds using Node 24 and live runs on Node 24)
2. npm 10.8+
3. Docker

### Build and Test changes

1. To compile the project use `make build`
2. To test the project use `make test`
3. or `make clean build test`

### To build the Docker container

Ensure that you are logged into the AWS eu-west-2 region:

`aws sso login` or `aws configure sso`

and then run:

`aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 416670754337.dkr.ecr.eu-west-2.amazonaws.com`

and then run:

`DOCKER_BUILDKIT=0 docker build --build-arg SSH_PRIVATE_KEY="$(cat ~/.ssh/id_rsa)" --build-arg SSH_PRIVATE_KEY_PASSPHRASE -t 416670754337.dkr.ecr.eu-west-2.amazonaws.com/bankrupt-officer-search-web .`

### Endpoints

Method | Path | Description
--- | --- | ---
GET | `/admin/officer-search/scottish-bankrupt-officer` | Returns result(s) for a Scottish bankrupt officer(s) based on search parameters inserted
GET | `/admin/officer-search/scottish-bankrupt-officer/{id}` | Returns the result for a Scottish bankrupt officer based on the {id}.

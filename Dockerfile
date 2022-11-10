 FROM 169942020521.dkr.ecr.eu-west-1.amazonaws.com/base/node:14-alpine-builder
 FROM 169942020521.dkr.ecr.eu-west-1.amazonaws.com/base/node:14-alpine-runtime

 COPY start-ecs /usr/local/bin/

 RUN chmod 555 /usr/local/bin/start-ecs

 CMD ["start-ecs"]
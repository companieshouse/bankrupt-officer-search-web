#!/bin/bash
#
# Start script for bankrupt-officer-search-web-service

PORT=3000
export NODE_PORT=${PORT}
exec node /opt/server.js -- ${PORT}
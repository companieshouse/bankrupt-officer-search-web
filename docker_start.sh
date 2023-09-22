#!/bin/bash
# Start script for bankrupt-officer-search-web
npm i
PORT=3000
export NODE_PORT=${PORT}
PORT="${PORT}" node /opt/server.js
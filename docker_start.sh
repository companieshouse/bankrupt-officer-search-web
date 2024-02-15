#!/bin/bash
# Start script for bankrupt-officer-search-web
PORT=3000
export NODE_PORT=${PORT}
PORT="${PORT}" node /opt/dist/server.js

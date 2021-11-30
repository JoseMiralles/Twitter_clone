#!/bin/bash
sudo systemctl start mongod
redis-6.2.6/src/redis-server --daemonize yes
sudo systemctl status mongod

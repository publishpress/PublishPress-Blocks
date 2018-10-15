#!/bin/bash

#
# Run codeception tests under bitbucket pipelines
#

# cd to main plugin directory
cd $BITBUCKET_CLONE_DIR

set -e

WWW_IP="127.0.0.1"
MYSQL_IP="127.0.0.1"

# Copy plugin to web server
sshpass -p 'password' ssh -q -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@127.0.0.1 "mkdir -p /var/www/html/wp-content/plugins/advanced-gutenberg/"
sshpass -p 'password' scp -r -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P 2222 $BITBUCKET_CLONE_DIR/* root@127.0.0.1:/var/www/html/wp-content/plugins/advanced-gutenberg

source ./tests/scripts/codeception.sh
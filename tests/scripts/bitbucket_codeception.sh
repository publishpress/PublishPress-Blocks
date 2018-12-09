#!/bin/bash

#
# Run codeception tests under bitbucket pipelines
#

# cd to main plugin directory
cd $BITBUCKET_CLONE_DIR

PLUGIN_DIR=$BITBUCKET_CLONE_DIR

set -e

WWW_IP="127.0.0.1"
MYSQL_IP="127.0.0.1"

DOCKER_ENV="bitbucket"

# Copy plugin to web server
sshpass -p 'password' ssh -q -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@127.0.0.1 "mkdir -p /var/www/html/wp-content/plugins/advanced-gutenberg/framework"
sshpass -p 'password' scp -q -r -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P 2222 $BITBUCKET_CLONE_DIR/* root@127.0.0.1:/var/www/html/wp-content/plugins/advanced-gutenberg

cd "$BITBUCKET_CLONE_DIR"
source "$BITBUCKET_CLONE_DIR/tests/scripts/codeception.sh"
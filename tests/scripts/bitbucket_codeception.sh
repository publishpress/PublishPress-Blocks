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

cd "$BITBUCKET_CLONE_DIR"
source "$BITBUCKET_CLONE_DIR/tests/scripts/codeception.sh"
#!/bin/bash

#
# Run codeception tests under bitbucket pipelines
#

# cd to main plugin directory
cd $BITBUCKET_CLONE_DIR

PLUGIN_DIR=$BITBUCKET_CLONE_DIR

if [[ -z "$PHP_VERSIONS" ]]; then
    PHP_VERSIONS=('5.2' '5.3' '5.4' '5.5' '5.6' '7.0' '7.1' '7.2' '7.3')
fi

set -e

WWW_IP="127.0.0.1"
MYSQL_IP="127.0.0.1"

DOCKER_ENV="bitbucket"

cd "$BITBUCKET_CLONE_DIR"
source "$BITBUCKET_CLONE_DIR/tests/scripts/codeception.sh"
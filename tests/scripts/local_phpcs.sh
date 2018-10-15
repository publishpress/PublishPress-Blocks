#!/bin/bash

#
# Run phpcs tests under local docker images
#

# Change directory to main plugin directory
cd "$(dirname "$0")/../../"

#Clean previous run
echo -e '\e[34m\e[1m##### Remove docker containers #####\e[0m\n'
docker network rm phpcs
docker rm -f phpcs

PHPCS_IP=172.21.0.2

# Start containers
echo -e '\n\e[34m\e[1m##### Start docker containers #####\e[0m\n'
docker network create --subnet=172.21.0.0/16 phpcs
docker run --name phpcs --network phpcs --ip $PHPCS_IP -d joomunited/phpcs:latest

set -e

echo -e '\n\e[34m\e[1m##### Run PHPCS #####\e[0m\n'
sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2223 root@$PHPCS_IP "mkdir -p /root/advanced-gutenberg"
sshpass -p 'password' scp -q -r -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P 2223 "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"/* root@$PHPCS_IP:/root/advanced-gutenberg
sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2223 root@$PHPCS_IP "cd /root/advanced-gutenberg; rm -rf vendor; ln -s /root/.composer/vendor vendor;  phpcs -s -p ."
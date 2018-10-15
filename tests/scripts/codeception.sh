#!/bin/bash

#
# Do not run directly
# Should only be included through local_codeception.sh or bitbucket_codeception.sh
#

# Install gutenberg
sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "cd /var/www/html/; wp plugin install gutenberg --activate --allow-root"

# Copy test block plugin
sshpass -p 'password' scp -q -r -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P 2222 "$( pwd )"/tests/_data/block root@$WWW_IP:/var/www/html/wp-content/plugins/

echo -e '\n\e[34m\e[1m##### Run tests on php 5.2 #####\e[0m\n'
codecept run functional -g php5.2 --env local --fail-fast

function do_tests () {
    echo -e "\n\e[34m\e[1m##### Run tests on php $1 #####\e[0m\n"
    mysql -uroot -h $MYSQL_IP -e "DELETE FROM wp_options WHERE option_value LIKE 'advgb_%';" wordpress
    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "/root/set_php_version.sh $1; cd /var/www/html/; wp plugin deactivate --allow-root advanced-gutenberg; wp post delete --allow-root \$(wp post list --allow-root --post_type='advgb_profiles' --format=ids) || true; wp post delete --allow-root \$(wp post list --allow-root --post_type='post' --format=ids) || true"
    codecept run functional --skip-group php5.2 --env local --fail-fast
    codecept run acceptance --skip-group php5.2 --env local --fail-fast
}

for PHP_VERSION in '5.3' '5.4' '5.5' '5.6' '7.0' '7.1' '7.2'
do
	do_tests $PHP_VERSION
done
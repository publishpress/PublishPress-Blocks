#!/bin/bash

#
# Do not run directly
# Should only be included through local_codeception.sh or bitbucket_codeception.sh
#

function prepare_install () {
    mysql -uroot -h $MYSQL_IP -e "DELETE FROM wp_options WHERE option_value LIKE 'advgb_%';" wordpress
    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP << EOF
    cd /var/www/html/;
    wp plugin deactivate --allow-root advanced-gutenberg;
    wp post delete --allow-root \$(wp post list --allow-root --post_type='advgb_profiles' --format=ids)  2>&1 || true;
    wp post delete --allow-root \$(wp post list --allow-root --post_type='post' --format=ids)  2>&1 || true;
    echo > /var/www/html/wp-content/debug.log;

    # Remove content used for Recent post
    wp post delete --allow-root \$(wp post list --category=recent_posts --format=ids --allow-root) 2>&1 || true;
    wp term delete category recent_posts --by=slug --allow-root 2>&1 || true;

    #Create dummy posts and affect them the Recent post category
    wp term create category "Recent posts" --description="Test category for Recent Post blocks" --porcelain --slug="recent_posts" --allow-root  2>&1;
    wp post generate --count=10 --format=ids --allow-root | xargs -d " " -I {} wp post term set {} category recent_posts --by=slug --allow-root 2>&1;
EOF
}

function do_tests () {
    echo -e "\n\e[34m\e[1m##### Run tests on php $1 #####\e[0m\n"

    prepare_install

    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "/root/set_php_version.sh $1;"
    codecept run functional --skip-group php5.2 --env=$DOCKER_ENV --fail-fast -o "php-version: $1"
    codecept run acceptance --skip-group php5.2 --env=$DOCKER_ENV --fail-fast -o "php-version: $1"

    # Check for php errors
    sshpass -p 'password' scp -q -r -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P 2222 root@$WWW_IP:/var/www/html/wp-content/debug.log "$PLUGIN_DIR/tests/_output/wp_debug.log" 2>/dev/null || true
    echo -e "\n\e[1mChecking errors in debug.log file\e[0m"
    PHP_PLUGIN_ERRORS=$(grep "/var/www/html/wp-content/plugins/advanced-gutenberg" "$PLUGIN_DIR/tests/_output/wp_debug.log" 2>/dev/null || true)
    if [[ "$PHP_PLUGIN_ERRORS" != "" ]]; then
        echo -e "\n\e[31m\e[1m\xe2\x9c\x95 Php errors related to the plugin found in the debug log file\e[0m\n"
        echo "$PHP_PLUGIN_ERRORS"
        exit 1
    else
        echo -e "\n\e[32m\e[1m\xe2\x9c\x93 No php errors related to the plugin found in the debug log file\e[0m\n"
    fi

    PHP_ERRORS=$(grep -v "/var/www/html/wp-content/plugins/advanced-gutenberg" "$PLUGIN_DIR/tests/_output/wp_debug.log" 2>/dev/null || true)
    if [[ "$PHP_ERRORS" != "" ]]; then
        echo -e "\n\e[31m\e[! Php errors not related to the plugin found in the debug log file\e[0m\n"
        echo "$PHP_ERRORS"
    else
        echo -e "\n\e[32m\e[1m\xe2\x9c\x93 No php errors not related to the plugin found in the debug log file\e[0m\n"
    fi
}

# Copy test block plugin
sshpass -p 'password' scp -q -r -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P 2222 "$( pwd )"/tests/_data/block root@$WWW_IP:/var/www/html/wp-content/plugins/

# Test the core gutenberg version and plugin version
for TYPE in "core" "plugin"; do
    prepare_install

    # Set php version to 5.2
    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "/root/set_php_version.sh 5.2;"

    if [[ $TYPE = "plugin" ]]; then
        # Install gutenberg
        echo -e '\n\e[34m\e[1m####### Run tests with Gutenberg plugin #######\e[0m\n'
        sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "cd /var/www/html/; wp plugin install gutenberg --activate --allow-root"
    else
        if [[ $WP_VERSION != "latest" ]]; then
            continue
        fi
        echo -e '\n\e[34m\e[1m####### Run test with core Gutenberg version #######\e[0m\n'
    fi

    echo -e '\n\e[34m\e[1m##### Run tests on php 5.2 #####\e[0m\n'
    codecept run functional -g php5.2 --env=$DOCKER_ENV --fail-fast


    for PHP_VERSION in '5.3' '5.4' '5.5' '5.6' '7.0' '7.1' '7.2' '7.3'
    do
        # Don't run 7.3 tests under php 4.9
        if [[ $WP_VERSION != "latest" && $PHP_VERSION = "7.3" ]]; then
            continue
        fi
        do_tests $PHP_VERSION
    done
done

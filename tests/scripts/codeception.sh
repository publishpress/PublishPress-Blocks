#!/bin/bash

#
# Do not run directly
# Should only be included through local_codeception.sh or bitbucket_codeception.sh
#

# Prepare container for all the tests, this function will only be run once at first
function prepare_tests () {
    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP << EOF
        # Set php cli to 7.2 to prevent wp-cli errors
        update-alternatives --set php /usr/bin/php7.2

        cd /var/www/html/;

        #Create dummy posts and affect them the Recent post category
        wp term create category "Recent posts" --description="Test category for Recent Post blocks" --porcelain --slug="recent_posts" --allow-root  2>/dev/null;
        wp post generate --count=10 --format=ids --allow-root 2>/dev/null | xargs -d " " -I {} wp post term set {} category recent_posts --by=slug --allow-root 2>/dev/null;

        # Create woocommerce products
        wp plugin install --allow-root woocommerce --activate --force 2>/dev/null ;
        wp wc product create --name="Test Product 1" --type=simple --sku=WCCLITESTP1 --regular_price=20 --user=admin --allow-root
        wp wc product create --name="Test Product 2" --type=simple --sku=WCCLITESTP2 --regular_price=30 --user=admin --allow-root

        # Remove woocommerce admin notices
        mysql --host ${MYSQL_IP} -e "UPDATE wp_options SET option_value=\"a:0:{}\" WHERE option_name=\"woocommerce_admin_notices\"" wordpress
EOF

    sshpass -p 'password' scp -q -r -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P 2222 tests/_data/block root@$WWW_IP:/var/www/html/wp-content/plugins/
}
function check_php_errors () {
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
        echo -e "\n\e[31m\e[1m\xc7\x83 Php errors not related to the plugin found in the debug log file\e[0m\n"
        echo "$PHP_ERRORS"
    else
        echo -e "\n\e[32m\e[1m\xe2\x9c\x93 No php errors not related to the plugin found in the debug log file\e[0m\n"
    fi
}

function clean_install () {
    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP << EOF
        cd /var/www/html/;

        #Deactivate ADVG
        wp plugin deactivate --allow-root advanced-gutenberg 2>/dev/null ;

        # Remove ADVG profiles
        wp post delete --force --allow-root \$(wp post list --allow-root --post_type='advgb_profiles' --format=ids 2>/dev/null)  2>/dev/null || true;

        # Reset error file
        echo > /var/www/html/wp-content/debug.log;

        wp plugin deactivate --allow-root woocommerce 2>/dev/null || true;
EOF
}

function do_install_tests () {
    codecept run functional --skip-group php5.2 --env=$DOCKER_ENV --fail-fast
}

function prepare_update_tests() {
    # Send images needed for tests
    sshpass -p 'password' scp -q -r -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P 2222 tests/_data/wp_cli_images root@$WWW_IP:/tmp/

    # Install Advanced Gutenberg plugin from WP Repository
    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP << EOF
            cd /var/www/html/;
            wp plugin install --allow-root advanced-gutenberg --activate --force 2>/dev/null ;

            # Import medias
            wp media import --allow-root /tmp/wp_cli_images/*

            # Activate Woocomerce and remove notices
            wp plugin activate --allow-root woocommerce 2>/dev/null || true;
            mysql --host ${MYSQL_IP} -e "UPDATE wp_options SET option_value=\"a:0:{}\" WHERE option_name=\"woocommerce_admin_notices\"" wordpress
EOF

    # It's not actual tests but preparation for upcoming tests
    codecept run acceptance -g pre_update --env=$DOCKER_ENV --fail-fast
}

function do_update_tests () {
    codecept run acceptance -g update --env=$DOCKER_ENV --fail-fast
}

function do_general_tests () {
    codecept run acceptance --skip-group php5.2 --skip-group pre_update --skip-group update --env=$DOCKER_ENV --fail-fast

    check_php_errors
}

function copy_plugin_to_www () {
    # Copy plugin to web server
    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "rm -rf /var/www/html/wp-content/plugins/advanced-gutenberg; mkdir -p /var/www/html/wp-content/plugins/advanced-gutenberg"
    sshpass -p 'password' scp -q -r -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P 2222 "$PLUGIN_DIR"/* root@$WWW_IP:/var/www/html/wp-content/plugins/advanced-gutenberg
    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "chown -Rh www-data:www-data /var/www/html/wp-content/plugins/advanced-gutenberg"
}

prepare_tests

for PHP_VERSION in "${PHP_VERSIONS[@]}"; do
    # Export php version so codeception can get it through env variables
    export PHP_VERSION=$PHP_VERSION

    if [[ $GUTENBERG_TYPE = "plugin" ]]; then
        # Install gutenberg plugin
        echo -e "\n\e[34m\e[1m##### Run $INSTALL_TYPE tests under WP $WP_VERSION, PHP $PHP_VERSION, Gutenberg plugin #####\e[0m\n"
        sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "cd /var/www/html/; wp plugin install gutenberg --activate --allow-root 2>/dev/null "
    elif [[ $GUTENBERG_TYPE = "core" ]]; then
        echo -e "\n\e[34m\e[1m##### Run $INSTALL_TYPE tests under WP $WP_VERSION, PHP $PHP_VERSION, Gutenberg core #####\e[0m\n"
    fi

    # Set php version
    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "/root/set_php_version.sh $PHP_VERSION;"

    clean_install

    if [[ "$PHP_VERSION" = "5.2" ]]; then
        # Run PHP 5.2 tests
        copy_plugin_to_www
        codecept run functional -g php5.2 --env=$DOCKER_ENV --fail-fast
    elif [[ "$INSTALL_TYPE" = "install" ]]; then
        copy_plugin_to_www
        do_install_tests
        do_general_tests
    elif [[ "$INSTALL_TYPE" = "update" ]]; then
        prepare_update_tests
        copy_plugin_to_www
        do_update_tests
        do_general_tests
    fi

done

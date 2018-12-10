#!/bin/bash

# Change directory to main plugin directory
cd "$(dirname "$0")/../../"
PLUGIN_DIR=$(pwd)

MYSQL_IP=172.20.0.2
WWW_IP=172.20.0.3
CHROMEDRIVER_IP=172.20.0.4

# Start chrome driver locally if docker env variable passed as first argument
if [ -z "$1" ]; then
    DOCKER_ENV="local"
elif [ "$1" = "local_chrome" ]; then
    DOCKER_ENV="$1"
    killall chromedriver
    chromedriver --url-base=/wd/hub --port=4444 &
else
    DOCKER_ENV="$1"
fi

for WP_VERSION in "4.9.8" "latest"; do
    # Clean previous run
    echo -e '\e[34m\e[1m##### Remove docker containers #####\e[0m\n'
    # Disconnect before remove it
    for CONTAINER in "wordpress_cgi" "mysql" "chromedriver"
    do
        docker network disconnect -f pipelines $CONTAINER
    done;
    docker rm -f wordpress_cgi mysql chromedriver
    docker network rm pipelines

    echo -e "\n\e[34m\e[1m##### Run tests under WP $WP_VERSION #####\e[0m\n"

    # Start containers
    echo -e '\n\e[34m\e[1m##### Start docker containers #####\e[0m\n'
    docker network create --subnet=172.20.0.0/24 pipelines
    docker run --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -d --network pipelines --ip $MYSQL_IP mysql:5.7.22
    docker run --name wordpress_cgi --link mysql -d -e MYSQL_HOST=mysql -e WWW_HOST=$WWW_IP --network=pipelines --ip $WWW_IP joomunited/wordpress_cgi:$WP_VERSION
    docker run --name chromedriver --network=pipelines --ip $CHROMEDRIVER_IP -d joomunited/chromedriver:latest

    max_steps=20
    time_to_wait=5

    # Wait for mysql to be ready
    for i in `seq 1 $max_steps`; do
            if  ! mysql -uroot -h $MYSQL_IP -e "SHOW DATABASES;" 2>&1 >/dev/null | grep -q 'ERROR 2003'; then
                            break;
            fi
            echo "Waiting mysql server to be ready"
            sleep $time_to_wait
    done

    if [[ $i == $max_steps ]]; then
      echo "Mysql server is not available stopping"
      exit 1
    fi

    echo "Mysql server ready"

    # Wait for apache to be ready
    for i in `seq 1 $max_steps`; do
            if ! curl -I http://$WWW_IP 2>&1 >/dev/null | grep -q 'curl: (7)'; then
                    break;
            fi
            echo "Waiting web server to be ready"
            sleep $time_to_wait
    done

    if [[ $i == $max_steps ]]; then
      echo "Web server is not available stopping"
      exit 1
    fi

    echo "Web server ready"

    set -e

    # Clean plugin folder to made sure tests script is updated
    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "rm -fr /var/www/html/wp-content/plugins/advanced-gutenberg; mkdir -p /var/www/html/wp-content/plugins/advanced-gutenberg"
    # Copy plugin to web server
    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "mkdir -p /var/www/html/wp-content/plugins/advanced-gutenberg"
    sshpass -p 'password' scp -q -r -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P 2222 "$PLUGIN_DIR"/* root@$WWW_IP:/var/www/html/wp-content/plugins/advanced-gutenberg

    # Fix chown
    sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "chown -Rh www-data:www-data /var/www/html/wp-content/plugins/advanced-gutenberg"

    cd "$PLUGIN_DIR"
    source "$PLUGIN_DIR/tests/scripts/codeception.sh"
done


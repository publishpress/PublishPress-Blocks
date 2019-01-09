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

if [[ -z "$INSTALL_TYPES" ]]; then
    INSTALL_TYPES=("update" "install")
fi

if [[ -z "$PHP_VERSIONS" ]]; then
    PHP_VERSIONS=('5.2' '5.3' '5.4' '5.5' '5.6' '7.0' '7.1' '7.2' '7.3')
fi

if [[ -z "$WP_VERSIONS" ]]; then
    WP_VERSIONS=("4.9" "latest")
fi

if [[ -z "$GUTENBERG_TYPES" ]]; then
    GUTENBERG_TYPES=("core" "plugin")
fi

# Start docker containers
function start_containers () {
    # Clean previous run
    echo -e '\e[34m\e[1m##### Remove docker containers #####\e[0m\n'

    # Disconnect before remove it
    for CONTAINER in "wordpress_cgi" "mysql" "chromedriver"
    do
        docker network disconnect -f pipelines $CONTAINER 2>/dev/null
    done;
    docker rm -f wordpress_cgi mysql chromedriver 2>/dev/null
    docker network rm pipelines

    # Start containers
    echo -e '\n\e[34m\e[1m##### Start docker containers #####\e[0m\n'
    docker network create --subnet=172.20.0.0/24 pipelines
    docker run --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -d --network pipelines --ip $MYSQL_IP mysql:5.7.22
    docker run --name wordpress_cgi --link mysql -d -e MYSQL_HOST=mysql -e WWW_HOST=$WWW_IP --network=pipelines --ip $WWW_IP joomunited/wordpress_cgi:$WP_VERSION
    docker run --name chromedriver --network=pipelines --ip $CHROMEDRIVER_IP -d --shm-size=1024m joomunited/chromedriver:latest

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
}

for WP_VERSION in "${WP_VERSIONS[@]}"; do
    for INSTALL_TYPE in "${INSTALL_TYPES[@]}"; do
        # Test the core gutenberg version and plugin version
        for GUTENBERG_TYPE in "${GUTENBERG_TYPES[@]}"; do
            set +e

            # Remove previous codeception fail outputs
            codecept clean

            start_containers

            set -e

            cd "$PLUGIN_DIR"
            source "$PLUGIN_DIR/tests/scripts/codeception.sh"
        done
    done
done
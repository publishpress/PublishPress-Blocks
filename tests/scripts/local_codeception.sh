#!/bin/bash

#
# Run codeception tests under local docker images
#

# cd to main plugin directory
cd "$(dirname "$0")/../../"

#Clean previous run
echo -e '\e[34m\e[1m##### Remove docker containers #####\e[0m\n'
docker rm -f wordpress_cgi mysql chromedriver
docker network rm pipelines

MYSQL_IP=172.20.0.2
WWW_IP=172.20.0.3
CHROMEDRIVER_IP=172.20.0.4

# Start containers
echo -e '\n\e[34m\e[1m##### Start docker containers #####\e[0m\n'
docker network create --subnet=172.20.0.0/16 pipelines
docker run --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -d --network pipelines --ip $MYSQL_IP mysql:5.7.22
docker run --name wordpress_cgi --link mysql -d -e MYSQL_HOST=mysql -e WWW_HOST=$WWW_IP --network=pipelines --ip $WWW_IP joomunited/wordpress_cgi:latest
docker run --name chromedriver --network=pipelines --ip $CHROMEDRIVER_IP -d blueimp/chromedriver

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

if [[ $i == 30 ]]; then
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

if [[ $i == 30 ]]; then
  echo "Web server is not available stopping"
  exit 1
fi

echo "Web server ready"

set -e

# Copy plugin to web server
sshpass -p 'password' ssh -q -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -a -p 2222 root@$WWW_IP "mkdir -p /var/www/html/wp-content/plugins/advanced-gutenberg/"
sshpass -p 'password' scp -q -r -o PreferredAuthentications=password -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P 2222 "$( pwd )" root@$WWW_IP:/var/www/html/wp-content/plugins/

source ./tests/scripts/codeception.sh
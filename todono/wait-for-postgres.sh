#!/bin/sh

set -e

cmd="$@"

# service/container name in the docker-compose file
host="$1"

until PGPASSWORD="dante123456" psql -h "$host" -d "drf" -U "dante" -c '\q';>
   >&2 echo "Postgres is unavailable - sleeping"
   sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd

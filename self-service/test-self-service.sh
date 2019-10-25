#!/bin/bash

set -e
if [ "$#" -lt 1 ]
then
echo  "Please insert at least one argument"
exit
else
echo -e "\c"
fi


while true;
do
  for service in "$@"
    do
      echo "Looking for service: $service"
      status_code=$(curl -s -k -L "$service" -w "%{http_code}" -o /dev/null)
      echo "Service returned: $status_code"
      echo "Response Body:"
      curl -s -k -L "$service"
      echo
      echo "------------------------------------------------"
      sleep 2
    done
done

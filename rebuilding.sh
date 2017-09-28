#!/bin/bash
imageName=opetstudio/erevna-google-spreadsheet-loader:version1.0.0
# containerName=rayasem-vultr-web_web.1.lapjcwrnwqmw5s5mhpey94vvr

docker build -t $imageName -f Dockerfile  .

# echo Delete old container...
# docker rm -f $containerName

docker push $imageName

docker stack deploy -c docker-compose.yml rayasem-vultr-web

Erevna Elasticsearch Interface

Nodejs application as an inteterface to elasticsearch

####Install

  git clone https://github.com/opetstudio/erevna-es-interface-js.git

  npm Install

  rename config-example.js to config.js


####Docker run

  docker build -t  opetstudio/erevna-es-interface-js:1.0.0 .

####Docker pull command

  docker pull opetstudio/erevna-es-interface-js

####Docker compose build and run
  docker-compose up --build

####Docker compose build

  docker-compose build

####Docker compose run/stop

  docker-compose up

  docker-compose stop

####Docker start/stop

  docker run -d -p 4001:8081 opetstudio/erevna-es-interface-js:version1.0.0

  docker container stop <hash>           # Gracefully stop the specified container

  docker container kill <hash>         # Force shutdown of the specified container

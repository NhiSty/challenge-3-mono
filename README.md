# start the project
``docker compose up -d``

# if your php container is not running
- delete your migrations
- delete your vendor folder
- rebuild your container

# if you have a problem with database sync
``docker compose exec php php bin/console doctrine:schema:update --force``

# create key pair for JWT
``docker compose exec php php bin/console lexik:jwt:generate-keypair``


# Jouer les fixtures
``docker compose exec php php bin/console d:f:l``

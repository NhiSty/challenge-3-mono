## Challenge 3 : API Platform/ReactJS/Ci&CD

### Description
Application permettant un prestataire d'offfrir ses services aux entreprises.

### Prérequis
- Docker

### Instructions  
- Dans le front :
    -   `cp .env.example .env`
    -  `docker-compose up -d`

- Dans le back :
    -   `cp .env.example .env`
    -  `docker-compose up -d`

    - Si le container php ne se lance pas
        - Supprimer les migrations
        - Supprimer le dossier vendor
        - Rebuild le container
    
    - Si vous avez un problème de synchronisation de la base de données
        - ``docker compose exec php php bin/console doctrine:schema:update --force``

    - Génération de la clé pour JWT
        - ``docker compose exec php php bin/console lexik:jwt:generate-keypair``

    - Jouer les fixtures 
        - ``docker compose exec php php bin/console d:f:l``


### Feature 

- Recherche avec filtres de prestation ou prestataire avec carte de géolocalisation (style AirBnB) - Deveci Serkan - Le Gloannec Erwan - Kanoute Hamidou

- Landing page du prestataire avec les prestations disponible (ou celle sélectionnée) - Deveci Serkan - Kanoute Hamidou

- Choix des créneaux disponibles avec possibilité de choisir parmi les emploi du temps de plusieurs salariés - Le Gloannec Erwan - Jallu Thomas

- Espace de visualisation de ses réservations avec possibilité - Le Gloannec Erwan

- Ajouter un feedback (plusieurs notes en fonction du thème de prestataire avec moyenne par catégorie) sur une prestation déjà réalisée - Le Gloannec Erwan

- Demander à devenir prestataire (avec validation du Kbis par un admin) - Deveci Serkan - Jallu Thomas

- Dashboard Admin avec statistiques - Deveci Serkan - Kanoute Hamidou

- Ajouter un ou plusieurs établissement avec plusieurs prestations possibles - Jallu Thomas

- Gérer son équipe de salariés par établissement ou globalement - Jallu Thomas

- Gérer les planning d’équipe créneau des jours de travail (trouver un système simple et flexible de planification) - Le Gloannec Erwan

- Dashboard Manager avec statistiques - Deveci Serkan - Kanoute Hamidou

- CRUD complet pour l’ensemble des entités utilitaires - Tous

- Notification des demandes de prestataire (email) - Jallu Thomas - Kanoute Hamidou

- Validation des prestataires - Jallu Thomas



### Auteur
👤 **DEVECI Serkan**
* Github: [@sDev67](https://github.com/sDev67)

👤 **Jallu Thomas**
* Github: [@ThomasDev6](https://github.com/ThomasDev6)

👤 **Hamidou Kanoute**
* Github: [@hkanoute](https://github.com/hkanoute)

👤 **LE GLOANNEC Erwan**
* Github: [@Quozul](https://github.com/Quozul)
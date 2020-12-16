# Superprof Technical Test - Front-End

Bonjour et bienvenue sur le test technique de superprof.
Le but de ce test n'est pas de vous poussez dans vos dernier retranchement ni de poser des question pièges.
Il s'agit plutôt d'évaluer votre approche du developpement et la logique derrière vos choix.

Le but : Développer une application de reproduction de licorne.

# Pour commencer

Nous mettons a disposition la structure initial du projet : 
- Vue.js avec un router configuré uniquement sur la home
- Une api simplifier de developpement (`src/server.js`) qui permet 2 calls :
  - Un **GET** `/api/unicorns` qui renvoie toutes les licornes *( deja implementer via `axios` dans `Home.vue` )*
  - Un **POST** `/api/unicorn` qui permet d'ajouter une licorne
  - Cette api permet est semi persistante. Les données survivront tant que vous resterez sur la page, mais au rechargement de celle ci elle reviendront au données de base
  - 4 licornes sont crée a l'initalisation

# Les details

- Chaque licorne possede 4 caracteristique de couleur : Criniere ( mane ), Queue ( tail ), Fourrure ( fur ) et Corne ( horn )
- Chaque caracteristique possede 4 couleur possible definie dans `/src/config.js` ( Si vous souhaitez modifier ces couleurs, enjoy ^^ )
- Les noms des licorne sont généré aléatoirement au moment du `POST` mais libre a vous de modifier le fonctionnement pour pouvoir généré le nom en amont.
- Les licornes n'ont pas de sexe ni de periodes "d'incubation". Chaque licorne peut donc procréer avec n'importe qu'elle autre licorne ( aprés tout les licornes sont magique, donc rien d'illogique ici ^^ )

# L'exercice :

Une première étape **MVP** dans laquel ces fonctionnalités devront être presentes obligatoirement :
- Liste des licornes disponibles et maintient a jour de cet liste.
- Selection de deux licornes pour généré la nouvelle licorne. Chaque caracteristique de la licorne pourra être celle de l'un ou l'autre de ses parents.
- Génération d'une nouvelle licorne et ajout a la liste des licorn disponible.
- Une ux simple et efficace
- Un light/dark mode ( variables css possible )

Puis une étape de features avancés :
- Visualisation des chances de chaque caractéritiques d'etre exprimé dans une licorne. Par example si les deux parent ont une fourrure blanche, les chance de fourrure : blanche sont de 100%. Et si les parent on pour l'un une fourrure blanche et pour l'autre une fourrure rose, alors la caracteritique fourrure a 50% de chance d'etre blanche, et 50% de chance d'etre rose.
- Création d'un formulaire permettant de selectionner les valeur voulu pour chaque caracteristique dans le but de proposer une liste des couple de licorne les plus a même de généré la licorne possédant les caractéristiques décritent ( avec le pourcentage de chance que ce couple donne effectivement cet licorne )
- Au moment de la selection des parents, affiché une liste de toute les licorne que ces deux parents peuvent procrée, sans doublons.

# Les attentes : 

Toute les feature doivent aussi tenir dans une seule page ( pas de navigation via un menu ).

Seul une version desktop est demandé, mais elle doit être responsive.

Dans l'exercice il est attendu au minimum le MVP soigné. ( mieux vaut un **joli MVP** bien fonctionnel, qu'un full featured buggy )

L'Ux a une plus grande importance que l'Ui dans cet exercice.

Prenais le temps de faire quelque chose qui vous plaise.

Vous avez une semaine maximum pour réalisé le projet *( Il ne faut pas une semaine pour le réalisé ^^, mais ca permet d'étaler le dev, par rapport au emploi du temps de chacun )*

# Le mot de la fin :

J'espere que l'exercice vous inspirera et vous revois pour en parler a la fin :)

Bon Dev

Rivy33
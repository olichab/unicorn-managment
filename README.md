Le but : Développer une application de reproduction de licorne.

# Pour commencer

Nous mettons à disposition la structure initiale du projet :

- Vue.js avec un router configuré uniquement sur la home
- Une api simplifiée de développement (`src/server.js`) qui permet 2 calls :
  - Un **GET** `/api/unicorns` qui renvoie toutes les licornes _( deja implementé via `axios` dans `Home.vue` )_
  - Un **POST** `/api/unicorn` qui permet d'ajouter une licorne
  - Cette api est semi persistante. Les données survivront tant que vous resterez sur la page, mais au rechargement de celle-ci elles reviendront aux données de base
  - 4 licornes sont créées à l'initialisation

# Les détails

- Chaque licorne possède 4 caractéristiques de couleur : Crinière ( mane ), Queue ( tail ), Fourrure ( fur ) et Corne ( horn )
- Chacune des caractéristiques possède 4 couleurs possibles définies dans `/src/config.js` _( si vous souhaitez modifier ces couleurs, enjoy ^^ )_
- Les noms des licornes sont générés aléatoirement au moment du `POST` mais libre à vous de modifier le fonctionnement pour pouvoir générer le nom en amont.
- Les licornes n'ont pas de sexe ni de période "d'incubation". Chaque licorne peut donc procréer avec n'importe quelle autre licorne ( après tous les licornes sont magiques, donc rien d'illogique ici ^^ )

# L'exercice :

Une première étape **MVP** dans laquelle les fonctionnalités suivantes devront être présentes obligatoirement :

- Liste des licornes disponibles et maintient à jour de cette liste.
- Sélection de deux licornes pour générer la nouvelle licorne. Chacune des caractéristiques de la licorne pourra être celle de l'un ou l'autre de ses parents.
- Génération d'une nouvelle licorne et ajout à la liste des licornes disponibles.
- Une ux simple et efficace
- Un light/dark mode ( variables css possible )

Puis une étape de features avancées :

- Visualisation des chances de chaque caractéristique d'être exprimée dans une licorne. Par exemple si les deux parents ont une fourrure blanche, les chances de fourrure : blanche sont de 100%. Et si les parent ont pour l'un une fourrure blanche et pour l'autre une fourrure rose, alors la caractéristique fourrure a 50% de chance d'être blanche, et 50% de chance d'être rose.
- Création d'un formulaire permettant de sélectionner les valeurs voulues pour chacune des caractéristiques dans le but de proposer une liste des couples de licornes les plus à même de générer la licorne possédant les caractéristiques décrites ( avec le pourcentage de chance que ce couple donne effectivement cette licorne )
- Au moment de la sélection des parents, afficher une liste de toutes les licornes que ces deux parents peuvent procréer, sans doublons.

# Les attentes :

Dans l'exercice il est attendu au minimum le MVP soigné. ( mieux vaut un **joli MVP** bien fonctionnel, qu'un full featured buggy )

Toutes les features doivent tenir dans une seule page ( pas de navigation via un menu ).

Seul une version desktop est demandée, mais elle doit être responsive.

L'UX a une plus grande importance que l'UI dans cet exercice.

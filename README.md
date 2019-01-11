## tactical_rpg

 Jeu se basant sur les jeux de rôle de type tactiques, tels que les Fire Emblem ou Final Fantasy Tactics.

 Le but du projet et de fournir un combat jouable de bout en bout (déplacements, phases d'actions, prise d'XP) entre
des personnages joueurs contrôlables et si possible une IA basique régissant les PNJ.

 La vue serait en 2D vue de dessus, dans le style de Fire Emblem.

 Idées d'extensions: ajouter de la musique et pourquoi pas des sons/bruitages; améliorer l'aspect visuel;
ajouter un autre combat pour vérifier que les diverses parties du code ne dépendent pas d'une carte spécifique

## Caractéristiques
- Déplacement via les flèches
- Valider le déplacement avec (Q)
- Terminer son tour avec (S) (ou (F) si combat)
- Combat avec (F) si à portée
- 2 canvas: terrain de jeu & fiche personnage actif
- Tableau de 10x10 cases, eau inaccessible

## Points forts
- Code à même d'évoluer sans avoir à tout casser
- Classes pour représenter certains objets (personnages, ennemis, armes, armures etc...)
- Fonctionnalités essentielles présentes (déplacement, fin de tour, combat, prise en compte des différentes caractéristiques)

## Points faibles

- Ajout de nouveaux tableaux demande un travail en profondeur
- Pas de sauvegarde de l'état des personnages et des ennemis (pas de localStorage)
- Améliorer déplacements en utilisant la fonction de calcul de distance

## Code pris ailleurs

- https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe Pour ralentir la vitesse d'animation

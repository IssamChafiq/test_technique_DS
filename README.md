
# Connect 4 - Test Technique DotScreen

Jeu de Connect 4 développé en **HTML5, CSS et JavaScript**, sans aucun framework ni bibliothèque externe.

## Fonctionnalités

- **Grille de jeu** : Format standard de 7 colonnes par 6 lignes.
- **2 joueurs au tour par tour** :
  - **Player 1** : Pions rouges avec symbole **X**.
  - **Player 2** : Pions bleus avec symbole **O**.
- **Indicateur de tour** : Une flèche verte indique en temps réel le joueur actif.
- **Gravité automatique** : Cliquer sur une colonne place le pion sur la case vide la plus basse.
- **Détection des conditions de fin** :
  - Alignement de 4 pions (horizontal, vertical, diagonale descendante `\`, diagonale montante `/`).
  - Détection automatique du match nul (grille remplie sans vainqueur).
  - Affichage du message de victoire ou de match nul.
- **Bouton « Rejouer »** : Réinitialise le plateau et relance une nouvelle partie.
- **Responsive design** : Adapté aux écrans d'ordinateur et mobiles/smartphones.

## Lancement

Aucune installation ni commande de build requise :
- Ouvrez simplement `index.html` dans votre navigateur.
- Ou lancez un serveur local léger si souhaité :
  ```bash
  python3 -m http.server 8000
  ```
  puis accédez à `http://localhost:8000`.

## Structure du projet

- `index.html` : Structure sémantique du jeu.
- `style.css` : Styles responsive et mise en page du plateau.
- `script.js` : Logique du jeu (grille, gravité, conditions de victoire, tour par tour).

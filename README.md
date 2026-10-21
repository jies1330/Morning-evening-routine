# Les routines de Pépin — version installable

Minuteur de routines pour enfants : Pépin montre chaque étape en animation, l’enfant gagne des étoiles.
Cette version s’installe sur Android et iPhone comme une app, avec un compte pour synchroniser
les données entre tous les appareils de la famille.

- **Hébergement** : GitHub Pages (gratuit)
- **Comptes et synchronisation** : Firebase, formule Spark (gratuite, sans carte bancaire)
- **Hors ligne** : l’app s’ouvre et fonctionne sans réseau, puis se resynchronise

Compte environ 30 minutes la première fois, sur un ordinateur.

---

## Étape 1 — Firebase (comptes et données)

1. Va sur <https://console.firebase.google.com> (compte Google) → **Créer un projet** → nom : `pepin-famille`
   (ou autre) → Google Analytics : **désactivé** (inutile ici) → **Créer le projet**.
2. **Connexion par e-mail** : menu de gauche → **Authentication** → **Commencer** → onglet **Méthode de connexion** →
   **Adresse e-mail/Mot de passe** → active le premier interrupteur seulement → **Enregistrer**.
3. **Base de données** : menu de gauche → **Firestore Database** → **Créer une base de données**
   → édition **Standard** si on te le demande → emplacement **europe-west1 (Belgique)** (définitif)
   → **mode production** → **Créer**.
4. **Règles de sécurité** : toujours dans Firestore, onglet **Règles** → efface tout → colle le contenu
   du fichier `firestore.rules` → **Publier**.
5. **Déclarer l’app Web** : roue dentée ⚙️ → **Paramètres du projet** → onglet **Général** → en bas,
   **Vos applications** → icône **Web `</>`** → surnom : `Pépin` → ne coche pas « Firebase Hosting »
   → **Enregistrer l’application**.
   Firebase affiche un bloc qui commence par `const firebaseConfig = {`. Garde cette page ouverte :
   tu vas copier ce bloc à l’étape 2.4.
   (Tu le retrouves plus tard au même endroit : Vos applications → Configuration du SDK → **Config**.)

## Étape 2 — GitHub (le site de l’app)

1. Crée un compte gratuit sur <https://github.com>. Ton pseudo fera partie de l’adresse de l’app.
2. En haut à droite : **+** → **New repository** → nom : `pepin` → **Public** → **Create repository**.
3. Sur la page du dépôt vide, clique **uploading an existing file**. Glisse **le contenu** du dossier
   décompressé (tous les fichiers et les dossiers `icons` et `fonts`, pas le dossier lui-même)
   → **Commit changes**.
4. Ouvre le fichier **`firebase-config.js`** dans le dépôt → icône crayon ✏️ (**Edit this file**)
   → remplace le bloc `const firebaseConfig = { … };` par celui copié à l’étape 1.5
   (tu peux coller tout ce que Firebase affiche, même les lignes `import`) → **Commit changes**.
5. **Settings** → **Pages** → *Build and deployment* → Source : **Deploy from a branch**
   → Branch : **main** et **/(root)** → **Save**. Attends 1 à 2 minutes et recharge la page :
   l’adresse de l’app s’affiche, du type `https://ton-pseudo.github.io/pepin/`.

## Étape 3 — Premier lancement

1. Ouvre l’adresse de l’app sur l’ordinateur.
2. **Créer un compte** (e-mail + mot de passe d’au moins 6 caractères).
3. **Créer ma famille**.
4. Pour reprendre tes routines, Héloïse et ses étoiles : sur l’écran d’accueil, touche
   « Tu as un fichier de sauvegarde ? Importer » et choisis `pepin-sauvegarde-claude.json`.
   (Ou plus tard : cadenas → Réglages → Fichier de sauvegarde → Importer.)

## Étape 4 — Installer sur les téléphones et tablettes

| Appareil | Comment faire |
|---|---|
| Android (Chrome) | Ouvre l’adresse → menu ⋮ → **Installer l’application** (ou « Ajouter à l’écran d’accueil ») |
| iPhone / iPad (Safari) | Ouvre l’adresse dans **Safari** → bouton **Partager** → **Sur l’écran d’accueil** |

Sur iPhone, l’app installée a sa propre mémoire : ouvre-la depuis son icône et connecte-toi **dedans**.

## Étape 5 — Ajouter l’autre parent

1. Chez toi : cadenas → **Réglages** → carte **Compte et famille** → **Copier le code** (12 caractères)
   et envoie-le à l’autre parent.
2. L’autre parent ouvre l’app → **Créer un compte** avec **son** e-mail → **Rejoindre une famille**
   → tape le code → **Rejoindre**.

Vous voyez alors les mêmes enfants, routines, récompenses et étoiles, en direct.
Garde ce code pour toi : il permet de rejoindre ta famille.

---

## Mettre à jour l’app

Quand tu reçois une nouvelle version : dans le dépôt GitHub → **Add file** → **Upload files**
→ glisse les nouveaux fichiers **sauf `firebase-config.js`** (sinon, recolle ta configuration)
→ **Commit changes**. Les appareils prennent la nouvelle version à la prochaine ouverture.

## En cas de souci

| Message ou symptôme | Solution |
|---|---|
| « Presque prêt ! » | `firebase-config.js` n’est pas rempli. Vérifie l’étape 2.4, attends 2 minutes, recharge. |
| « La connexion par e-mail n’est pas activée » / « Authentication n’est pas encore activé » | Étape 1.2. |
| « La base Firestore n’existe pas encore » | Étape 1.3. |
| « Accès refusé par Firestore » | Règles pas publiées : étape 1.4. |
| « La clé apiKey … est incorrecte » | Recopie le bloc firebaseConfig (étape 2.4). |
| « Ce site n’est pas autorisé dans Firebase » | Authentication → **Paramètres** → **Domaines autorisés** → ajoute `ton-pseudo.github.io`. |
| « Code famille inconnu » | Recopie le code depuis les Réglages de l’autre parent (les tirets sont facultatifs). |
| Mot de passe oublié | Écran de connexion → « Mot de passe oublié ? » (regarde aussi les spams). |
| Page GitHub « 404 » | Attends quelques minutes après l’étape 2.5 ; vérifie que `index.html` est à la racine du dépôt. |

## Bon à savoir

- **Sécurité** : le contenu de `firebase-config.js` n’est pas secret (c’est normal qu’il soit public).
  Ce sont les règles de `firestore.rules` qui protègent les données : seuls les parents de la famille y ont accès.
- **Ne mets jamais** le fichier de sauvegarde (`pepin-sauvegarde-….json`) sur GitHub : il contient
  le prénom et l’historique de ton enfant, et le dépôt est public.
- **Gratuit** : la formule Spark de Firebase permet des dizaines de milliers de lectures et
  d’écritures par jour, bien plus qu’une famille n’en utilise.
- **Sauvegarde** : cadenas → Réglages → Fichier de sauvegarde → **Exporter**, de temps en temps.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L’app (personnage, animations, minuteur, étoiles) |
| `firebase-config.js` | Ta configuration Firebase (à remplir une fois) |
| `firebase.js` | Bibliothèque Firebase JS SDK 12.19.0 (Apache 2.0) |
| `sw.js` | Fonctionnement hors ligne |
| `manifest.webmanifest`, `icons/` | Installation comme une app |
| `fonts/` | Polices Grandstander et Nunito (SIL Open Font License, textes inclus) |
| `firestore.rules` | Règles de sécurité à coller dans Firebase |

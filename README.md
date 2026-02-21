# Incidence (Patrimoine Photos) — site GitHub Pages + Jekyll + Decap CMS

Ce site est maintenant pilotable **sans coder** via `/admin`.

- Articles : gérés dans `/_posts` (Markdown)
- Vidéos YouTube : gérées dans `/_data/youtube.yml`
- Sitemap : généré automatiquement par Jekyll

## Structure

- `articles/index.html` : listing automatique des articles (hors archivés)
- `_layouts/post.html` : gabarit premium des articles
- `_posts/*.md` : articles éditables depuis l’admin
- `youtube.html` : page YouTube alimentée automatiquement par `_data/youtube.yml`
- `admin/index.html` + `admin/config.yml` : interface Decap CMS
- `robots.txt` : bloque l’indexation de `/admin/`

---

## /admin — Publier sans code

URL du site public : `https://patrimoine-photos.github.io/Incidence/`

URL : `https://patrimoine-photos.github.io/Incidence/admin/`

### Créer un article
1. Ouvrir `/admin` et se connecter avec GitHub.
2. Collection **Articles** → **New Article**.
3. Remplir : titre, description, date, contenu.
4. Laisser **Archiver** décoché pour publier normalement.
5. Enregistrer et publier.

### Modifier un article
1. Ouvrir **Articles**.
2. Sélectionner l’article.
3. Modifier le contenu puis publier.

### Archiver un article (recommandé)
1. Ouvrir l’article.
2. Cocher **Archiver** (`archived: true`).
3. Publier.

**Effet :**
- l’article disparaît de `/articles/`
- son URL reste accessible (pas de 404)

👉 C’est le mode recommandé pour “retirer” un contenu sans casser le SEO.

### Supprimer un article (à éviter sauf nécessité)
- Utiliser **Delete** dans l’éditeur.
- Le fichier est supprimé dans `/_posts`.
- L’URL de l’article renverra ensuite **404**.

**Impact SEO après suppression :**
- retirer/mettre à jour les liens internes vers l’ancienne URL
- demander une désindexation dans Google Search Console (si besoin)
- envisager une redirection (si vous mettez en place une logique de redirections)

---

## Gérer les vidéos YouTube dans /admin

1. Ouvrir collection **YouTube**.
2. Modifier la liste **Vidéos**.
3. Pour chaque entrée :
   - `title` : titre affiché
   - `id` : ID YouTube (ex: `dQw4w9WgXcQ`)
   - `description` : texte sous la vidéo
4. Publier.

La page `/youtube.html` se met à jour automatiquement depuis `_data/youtube.yml`.

---

## Installer l’auth OAuth (Cloudflare Workers + sveltia-cms-auth)

Decap CMS avec backend GitHub nécessite un proxy OAuth externe.

### 1) Déployer le worker `sveltia-cms-auth`
- Repo : `sveltia/sveltia-cms-auth`
- Déployer sur Cloudflare Workers
- URL obtenue (exemple) :
  `https://sveltia-cms-auth.bernardmauco.workers.dev`

### 2) Créer une OAuth App GitHub
Dans GitHub > Settings > Developer settings > OAuth Apps :
- Homepage URL : URL publique de votre site
- Authorization callback URL :
  `https://sveltia-cms-auth.bernardmauco.workers.dev/callback`

### 3) Configurer les variables du Worker
Ajouter :
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `ALLOWED_DOMAINS` (liste des domaines autorisés, séparés par virgules)

Exemple :
`patrimoine-photos.github.io`

### 4) Configurer le repo dans `admin/config.yml`
Remplacer :
- `backend.repo: patrimoine-photos/Incidence`
- `backend.base_url: https://sveltia-cms-auth.bernardmauco.workers.dev`

Puis commit + deploy.

---

## SEO simplifié

- Base URL centralisée dans `_config.yml` :
  - `url`
  - `baseurl`
- Canonical automatisé sur les articles et pages migrées Liquid
- Sitemap généré automatiquement (`jekyll-sitemap`)
- `robots.txt` inclut :
  - `Disallow: /admin/`
  - `Sitemap: {{ site.url }}{{ site.baseurl }}/sitemap.xml`

### Changement de domaine = 1 modif principale
Modifier `url` et éventuellement `baseurl` dans `_config.yml`.

---

## Dépannage

### Login /admin impossible
- Vérifier `backend.base_url` dans `admin/config.yml`
- Vérifier le callback OAuth GitHub (`<WORKER_URL>/callback`)
- Vérifier que le domaine du site est présent dans `ALLOWED_DOMAINS`

### Domain mismatch
- Domaine courant absent de `ALLOWED_DOMAINS`
- Ajouter aussi le domaine GitHub Pages (`*.github.io`) si utilisé

### Pas de droits d’écriture
- Le compte GitHub connecté n’a pas les droits sur le repo
- Vérifier accès collaborateur / organisation

### Blocage lié à la sécurité GitHub
- Vérifier la 2FA activée
- Refaire l’auth si token expiré

### Dépannage YouTube – Erreur 153
- **Cause** : la configuration `iframe.referrerPolicy = "no-referrer"` dans le lazy embed peut bloquer la lecture et déclencher l’Erreur 153 côté player YouTube.
- **Fix** : utiliser `iframe.referrerPolicy = "strict-origin-when-cross-origin"` (en conservant l’URL `youtube-nocookie`) pour laisser un referrer compatible.

---

## Sécurité (indispensable)

- Activer la **2FA** sur les comptes GitHub ayant accès au repo
- Limiter l’accès repo au strict nécessaire
- Conserver `/admin` public mais protégé par authentification GitHub
- Ne jamais exposer `GITHUB_CLIENT_SECRET` hors des secrets Worker

---

## Déploiement GitHub Pages

- Branche : `main`
- Dossier : `/ (root)`
- **Ne pas** créer `.nojekyll`

Après merge sur `main`, GitHub Pages reconstruit le site.

## Test final

- Ouvrir `https://patrimoine-photos.github.io/Incidence/admin/` → **Login GitHub** → retour sur `/admin`.
- Créer un article depuis `/admin`, publier, puis vérifier son apparition sur `https://patrimoine-photos.github.io/Incidence/articles/`.
- Éditer la collection **YouTube** depuis `/admin`, publier, puis vérifier `https://patrimoine-photos.github.io/Incidence/youtube.html`.

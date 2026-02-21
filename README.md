# Incidence (Patrimoine Photos) — mini-site statique GitHub Pages

Objectif : mini-site vitrine **100% gratuit**, **100% statique**, optimisé **SEO + conversion** (CTA principal : *Demander un devis / Envoyer une photo*).  
Galerie principale : https://patrimoine-photos.myportfolio.com/

## Pages
- `index.html` : accueil
- `prestations.html` : supports & services
- `avant-apres.html` : comparateur avant/après (slider)
- `methode.html` : process
- `articles/` : blog SEO
- `youtube.html` : chaîne + embeds vidéo
- `contact.html` : formulaire + email + RGPD
- `mentions-legales.html`, `confidentialite.html`, `404.html`, `sitemap.xml`, `robots.txt`

## Configuration rapide

### 1) URLs de contact (YouTube / email)
Éditez l’objet `SITE` dans `assets/js/main.js` :
- `youtubeChannelUrl` : URL de la chaîne
- `email` : email de contact

### 2) Formulaire de contact
Le formulaire est chargé depuis l’attribut `data-tally-src` dans `contact.html` :

```html
data-tally-src="https://tally.so/embed/..."
```

### 3) Logo
Logo principal : `assets/img/logo-incidence-premium.svg` (header + footer).

### 4) Accents colorés des séparateurs
Les accents (or, vert, bleu, rouge) sont appliqués automatiquement par `applyAccentCycle()` dans `assets/js/main.js`.
- Sur la homepage : comportement existant conservé.
- Sur les autres pages : les séparateurs de section alternent automatiquement.

## Images à maintenir
- `assets/img/avant-apres/` : visuels de comparaison
- `assets/img/services/` : visuels prestations
- `assets/img/logo-incidence-premium.svg`, `assets/img/og-image.svg`, `assets/img/favicon.svg`

Bonnes pratiques :
- idéalement < 300–500 Ko/image
- noms explicites
- pas de texte intégré aux images

## Ajouter un article
1. Dupliquer un article existant dans `articles/`
2. Renommer : `articles/mon-article.html`
3. Ajouter le lien dans `articles/index.html`
4. Ajouter l’URL dans `sitemap.xml`

## Déploiement
GitHub Pages : branche `main`, dossier `/ (root)`.

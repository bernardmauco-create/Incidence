# Incidence (Patrimoine Photos) — mini-site statique GitHub Pages

Objectif : mini-site vitrine **100% gratuit**, **100% statique**, optimisé **SEO + conversion** (CTA unique : *Demander un devis / Envoyer une photo pour avis*).  
La **galerie principale** reste sur MyPortfolio : https://patrimoine-photos.myportfolio.com/

## Pages
- `index.html` : accueil (premium + aéré)
- `prestations.html` : supports & services
- `avant-apres.html` : comparateur avant/après (slider)
- `methode.html` : process
- `articles/` : structure blog (SEO)
- `youtube.html` : page chaîne + embeds légers
- `contact.html` : formulaire Tally + email + RGPD
- `mentions-legales.html`, `confidentialite.html`
- `robots.txt`, `sitemap.xml`, `404.html`

---

## Configuration rapide (2 minutes)

### 1) Modifier les URLs (YouTube / email / Tally)
Ouvrez `assets/js/main.js` et modifiez l’objet `SITE` :
- `youtubeChannelUrl` : URL de votre chaîne
- `email` : votre email
- `tallyEmbedUrl` : URL Tally (ex: `https://tally.so/r/abc123`)
- `myPortfolioUrl` : galerie MyPortfolio (si besoin)

> Note : l’iframe Tally est aussi présente dans `contact.html`.

### 2) Logo
Le logo Incidence est placé ici :
- `assets/img/logo-incidence.jpg`

Si vous remplacez le fichier, gardez le même nom pour éviter de modifier toutes les pages.

### 3) Images Avant / Après
Les images réelles sont attendues ici :
- `assets/img/avant-apres/machine-avant.jpg`
- `assets/img/avant-apres/machine-apres.jpg`
- `assets/img/avant-apres/champ-avant.jpg`
- `assets/img/avant-apres/champ-apres.jpg`

Bonnes pratiques :
- poids cible : < 300–500 Ko/image si possible
- gardez des noms sobres et descriptifs
- n’ajoutez pas de texte dans les images

---

## Ajouter un article (blog SEO)
1. Dupliquez un template existant dans `articles/`.
2. Renommez-le avec un slug : `articles/mon-nouvel-article.html`
3. Ajoutez-le à la liste dans `articles/index.html`.
4. Ajoutez l’URL dans `sitemap.xml`.

Conseils :
- 1 seul `H1` par page
- `H2/H3` structurés
- texte utile, pas de gros pavés
- maillage : liens vers `contact.html`, `prestations.html`, `avant-apres.html`

---

## Remplacer Tally
Dans `contact.html`, remplacez :
```html
src="https://tally.so/r/XXXXXX"
```
par votre URL.

---

## Déploiement (100% en ligne)
- Tout se fait depuis l’éditeur web GitHub.
- GitHub Pages : branche `main` / dossier `/ (root)`.

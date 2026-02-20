# Patrimoine Photos (Incidence) — mini-site statique GitHub Pages

Objectif : mini-site vitrine **100% gratuit**, **100% statique**, optimisé **SEO + conversion** (CTA unique : *Demander un devis gratuit / Envoyer une photo pour avis*).  
La **galerie principale** reste sur MyPortfolio : https://patrimoine-photos.myportfolio.com/

## Pages
- `index.html` : landing (promesse → preuves → offre → méthode → FAQ → CTA)
- `prestations.html` : supports & services
- `avant-apres.html` : comparateur avant/après (slider)
- `methode.html` : process
- `articles/` : structure blog (SEO)
- `youtube.html` : page chaîne + embeds légers
- `contact.html` : formulaire Tally + email + RGPD
- `mentions-legales.html`, `confidentialite.html`
- `robots.txt`, `sitemap.xml`, `404.html`

---

## Configuration rapide (à faire en 2 minutes)

### 1) Modifier les URLs (YouTube / email / Tally)
Ouvrez `assets/js/main.js` et modifiez l’objet `SITE` :

- `youtubeChannelUrl` : URL de votre chaîne
- `email` : votre email
- `tallyEmbedUrl` : URL Tally (ex: `https://tally.so/r/abc123`)
- `myPortfolioUrl` : galerie MyPortfolio (si besoin)

> Note : l’iframe Tally est aussi présente dans `contact.html`.  
> Vous pouvez soit :
> - remplacer le `src` directement dans `contact.html`
> - ou garder la cohérence avec `SITE.tallyEmbedUrl` (si vous voulez gérer par JS plus tard)

### 2) Ajouter / modifier le bouton “Voir la galerie”
Dans les pages, cherchez `Galerie MyPortfolio`.  
Bonnes pratiques :
- `target="_blank"` + `rel="noopener"`

---

## Ajouter un article (blog SEO)
1. Dupliquez un template existant dans `articles/` :
   - `articles/restauration-photo-ancienne-guide.html` (template article)
2. Renommez-le avec un slug :
   - `articles/mon-nouvel-article.html`
3. Ajoutez-le à la liste dans `articles/index.html` (une carte).
4. Ajoutez l’URL dans `sitemap.xml` :
   - `<loc>https://bernardmauco-create.github.io/Incidence/articles/mon-nouvel-article.html</loc>`

Conseils :
- 1 seul `H1` par page
- `H2/H3` structurés
- texte clair, utile, pas de gros pavés
- maillage : lien vers `contact.html`, `prestations.html`, `avant-apres.html`

---

## Remplacer le placeholder Tally
Dans `contact.html`, remplacez :
```html
src="https://tally.so/r/XXXXXX"

# 🚀 Guide de Déploiement - alphaSpace

## ✅ Build Réussi !

Votre projet est maintenant prêt pour le déploiement. Le build a généré les fichiers dans le dossier `dist/`.

---

## 📦 Options de Déploiement

### 1. Vercel (Recommandé - Gratuit)

**Avantages :**
- Déploiement automatique depuis GitHub
- HTTPS automatique
- CDN global
- Prévisualisation des pull requests

**Étapes :**

1. **Pousser votre code sur GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Aller sur [vercel.com](https://vercel.com)**
   - Créer un compte (gratuit avec GitHub)
   - Cliquer sur "New Project"
   - Importer votre repository GitHub

3. **Configuration**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Variables d'environnement (optionnel)**
   - Si vous utilisez des clés API, ajoutez-les dans "Environment Variables"
   - Exemple: `VITE_NASA_KEY=votre_cle_api`

5. **Déployer**
   - Cliquer sur "Deploy"
   - Votre site sera en ligne en quelques secondes !

**URL générée :** `https://votre-projet.vercel.app`

---

### 2. Netlify (Gratuit)

**Étapes :**

1. **Pousser sur GitHub** (même chose que Vercel)

2. **Aller sur [netlify.com](https://netlify.com)**
   - Créer un compte
   - "Add new site" → "Import an existing project"
   - Connecter GitHub

3. **Configuration**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: (laisser vide)

4. **Déployer**
   - Cliquer sur "Deploy site"

**URL générée :** `https://votre-projet.netlify.app`

---

### 3. GitHub Pages (Gratuit)

**Étapes :**

1. **Installer gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Ajouter dans package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://votre-username.github.io/react-learn"
   }
   ```

3. **Déployer**
   ```bash
   npm run deploy
   ```

4. **Activer GitHub Pages**
   - Aller dans Settings → Pages
   - Source: `gh-pages` branch
   - Folder: `/ (root)`

**URL générée :** `https://votre-username.github.io/react-learn`

---

### 4. Surge.sh (Gratuit)

**Étapes :**

1. **Installer Surge**
   ```bash
   npm install -g surge
   ```

2. **Build le projet**
   ```bash
   npm run build
   ```

3. **Déployer**
   ```bash
   cd dist
   surge
   ```
   - Créer un compte si nécessaire
   - Choisir un domaine (ex: `votre-projet.surge.sh`)

**URL générée :** `https://votre-projet.surge.sh`

---

## 🔧 Configuration Avant Déploiement

### 1. Vérifier les Variables d'Environnement

Créez un fichier `.env.production` si nécessaire :

```env
VITE_NASA_KEY=votre_cle_api_nasa
VITE_API_URL=https://api.example.com
```

**Important :** Les variables doivent commencer par `VITE_` pour être accessibles dans le code.

### 2. Optimiser les Images

Assurez-vous que les images sont optimisées :
- Utilisez des formats modernes (WebP, AVIF)
- Compressez les images
- Utilisez des tailles appropriées

### 3. Vérifier les Chemins Relatifs

Si vous utilisez React Router, assurez-vous que votre router est configuré pour le mode `browser` (déjà fait avec `createBrowserRouter`).

Pour GitHub Pages, vous devrez peut-être utiliser un `base` path :

```typescript
const router = createBrowserRouter([
  // routes
], {
  basename: '/react-learn' // Si déployé sur GitHub Pages avec un sous-dossier
});
```

---

## 🐛 Résolution de Problèmes

### Problème : 404 sur les routes après déploiement

**Solution pour Vercel/Netlify :**

Créez un fichier `vercel.json` (Vercel) ou `_redirects` (Netlify) :

**Vercel (`vercel.json`):**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Netlify (`public/_redirects`):**
```
/*    /index.html   200
```

### Problème : Les assets ne se chargent pas

**Solution :**
- Vérifiez que tous les chemins sont relatifs
- Vérifiez la configuration `base` dans `vite.config.ts`

### Problème : Erreurs CORS

**Solution :**
- Les APIs doivent autoriser votre domaine
- Pour le développement, utilisez un proxy si nécessaire

---

## 📊 Vérification Post-Déploiement

### Checklist

- [ ] Le site se charge correctement
- [ ] Toutes les routes fonctionnent
- [ ] Les images se chargent
- [ ] Les APIs fonctionnent
- [ ] Le responsive fonctionne
- [ ] Les animations fonctionnent
- [ ] Pas d'erreurs dans la console

### Test des Routes

Testez toutes les pages :
- `/` (Home)
- `/news`
- `/spacex`
- `/webb`
- `/hubble`
- `/apod`

---

## 🚀 Déploiement Automatique (CI/CD)

### Avec GitHub Actions (Vercel/Netlify)

Si vous utilisez Vercel ou Netlify, le déploiement automatique est déjà configuré :
- Chaque push sur `main` = déploiement en production
- Chaque pull request = prévisualisation

### Avec GitHub Actions (Manuel)

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 📈 Optimisations Post-Déploiement

### 1. Analytics

Ajoutez Google Analytics ou Plausible :

```typescript
// Dans main.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Track page views
```

### 2. Performance

- Vérifiez le score Lighthouse
- Optimisez les images
- Utilisez le lazy loading (déjà fait !)
- Minifiez le CSS/JS (fait automatiquement)

### 3. SEO

Ajoutez des meta tags dans `index.html` :

```html
<meta name="description" content="Explorez l'univers avec alphaSpace">
<meta property="og:title" content="alphaSpace - Explore the Cosmos">
<meta property="og:image" content="url-de-votre-image">
```

---

## 🎉 Félicitations !

Votre projet est maintenant en ligne ! Partagez-le avec le monde 🌍

**Ressources utiles :**
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

*Bon déploiement ! 🚀*


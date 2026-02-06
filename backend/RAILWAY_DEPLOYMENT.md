# ISDR-GL Railway Deployment Guide

## 🚀 Déployer le Backend sur Railway.app

### Prérequis

1. **Compte GitHub** - Votre repo doit être sur GitHub
2. **Compte Railway.app** - Créez un compte gratuit
3. **Supabase configuré** - Tables et policies déjà créées

### Étape 1 : Préparer GitHub

```bash
# 1. Initialisez Git (si pas encore fait)
cd c:\Users\Admin\OneDrive\Desktop\isdr-gl
git init
git add .
git commit -m "Initial commit: ISDR-GL backend avec Supabase"

# 2. Créez un repo sur GitHub
# Allez sur https://github.com/new
# Nommez-le "isdr-gl" (ou votre choix)
# Ne cochtz PAS "Initialize with README" (vous en avez déjà un)

# 3. Poussez votre code
git remote add origin https://github.com/votre-username/isdr-gl.git
git branch -M main
git push -u origin main
```

### Étape 2 : Créer un compte Railway

1. Allez sur **https://railway.app**
2. Cliquez **"Sign up"** (ou **"Sign in"** si vous avez déjà un compte)
3. Authentifiez-vous avec GitHub (plus facile)
4. Autorisez Railway à accéder à GitHub

### Étape 3 : Créer un nouveau projet

1. Cliquez **"New Project"** sur le dashboard Railway
2. Sélectionnez **"Deploy from GitHub"**
3. Autorisez Railway si nécessaire
4. Sélectionnez votre repo **"isdr-gl"**
5. Sélectionnez la branche **"main"**
6. Cliquez **"Deploy"**

Railway va détecter automatiquement:
- ✅ Node.js (via package.json)
- ✅ Le script de démarrage (via Procfile)

### Étape 4 : Configurer les variables d'environnement

1. Dans le dashboard Railway, cliquez votre projet
2. Allez dans l'onglet **"Variables"**
3. Ajoutez les **3 variables requises** :

```
SUPABASE_URL=https://svhgrahztipjpghxfliz.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aGdyYWh6dGlwanBnaHhmbGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTEwNDEsImV4cCI6MjA4NTk2NzA0MX0.BJQxHNB068TrPcdPglqt4qo2CZZiY5jlrhVL4XXNkxM
PORT=3000
```

**Ou optionnellement** :
```
NODE_ENV=production
JWT_SECRET=your-secret-key-for-production
API_URL=https://votre-app-railway.up.railway.app
FRONTEND_URL=https://votre-frontend-vercel.vercel.app
```

4. Cliquez **"Add"** pour chaque variable
5. Le déploiement relancera automatiquement ✅

### Étape 5 : Vérifier le déploiement

1. Attendez que le déploiement se termine (status vert ✅)
2. Cliquez l'onglet **"Deployments"**
3. Copiez votre **URL publique** (ex: `https://isdr-gl-production.up.railway.app`)
4. Testez le health check:

```bash
curl https://isdr-gl-production.up.railway.app/api/health
```

Vous devriez voir:
```json
{"status":"OK","timestamp":"2026-02-06T..."}
```

### Étape 6 : Utiliser l'URL dans le Frontend

Mettez à jour votre frontend React avec cette URL:

```javascript
// frontend/src/services/api.js
const API_URL = 'https://isdr-gl-production.up.railway.app';

export const api = axios.create({
  baseURL: API_URL
});
```

---

## 📊 Dashboard Railway

Après déploiement, vous pouvez:
- **Voir les logs** : Onglet "Logs"
- **Redéployer** : Cliquez "Redeploy"
- **Modifier variables** : Onglet "Variables"
- **Vérifier l'uptime** : Onglet "Metrics"

---

## 🔄 Mises à jour futures

Quand vous poussez sur GitHub:
```bash
git add .
git commit -m "Nouvelle feature"
git push origin main
```

Railway redéploiera **automatiquement** ! 🚀

---

## ⚠️ Dépannage

### Erreur : "Procfile not found"
- Assurez-vous que `Procfile` est à la racine de `/backend`
- Pas d'extension `.txt`

### Erreur : "Cannot find module 'supabase'"
- Railway installera les dépendances automatiquement
- Si ça échoue: Vérifiez que `package.json` est correct

### API répond 502 Bad Gateway
- Vérifiez les logs dans Railway
- Vérifiez que `SUPABASE_URL` et `SUPABASE_ANON_KEY` sont corrects
- Attendez 1-2 minutes pour de complet démarrage

### Erreur de connexion Supabase
- Vérifiez les credentials dans `.env`
- Vérifient que Supabase est actif
- Testez localement d'abord avec `npm run dev`

---

## ✅ Checklist avant production

- [ ] Tables créées en Supabase
- [ ] RLS Policies appliquées
- [ ] Code poussé sur GitHub
- [ ] Repo public ou accès Railway autorisé
- [ ] Variables d'environnement configurées
- [ ] Tests de déploiement réussis
- [ ] Health check répond (200 OK)
- [ ] Frontend configuré avec la bonne URL

---

## 💰 Pricing Railway

- **Gratuit** : $5 de crédit gratuit/mois
- **Dépassement** : $0.50 par GB d'utilisation
- **Suffisant** pour une petite app comme ISDR-GL

---

## 🎯 Prochaine étape

Une fois le backend sur Railway, deploirez le frontend sur **Vercel**!

Besoin d'aide? Dites-moi!

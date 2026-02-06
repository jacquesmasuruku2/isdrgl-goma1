# 🚀 Configuration Git & GitHub

Pour déployer sur Railway, votre code doit être sur **GitHub**

## ✅ Étape 1 : Initialiser Git

Ouvrez **PowerShell** dans le dossier du projet:

```powershell
cd c:\Users\Admin\OneDrive\Desktop\isdr-gl
git init
git add .
git commit -m "Initial commit: ISDR-GL application with Supabase backend"
```

## ✅ Étape 2 : Créer un repo GitHub

1. Allez sur https://github.com/new
2. Remplissez:
   - **Repository name** : `isdr-gl`
   - **Description** : `Institution management system with React and Node.js`
   - **Public** ✓ (pour que Railway le voit)
3. **NE COCHEZ PAS** "Initialize this repository with"
4. Cliquez **"Create repository"**

## ✅ Étape 3 : Connecter GitHub à votre machine

```powershell
# Connectez votre repo local à GitHub
git remote add origin https://github.com/VOTRE_USERNAME/isdr-gl.git
git branch -M main
git push -u origin main
```

**Remplacez `VOTRE_USERNAME`** par votre nom d'utilisateur GitHub (ex: `jean-dupont`)

## ✅ Étape 4 : Garder .env secret

Vérifiez que `.env` est dans le `.gitignore`:

```bash
# ✅ IMPORTANT: Ne jamais commiter le .env!
# .env contient vos credentials Supabase
# Vérifiez qu'il est dans .gitignore ✓
```

## 🔐 .env sera fourni sur Railway comme variables d'environnement

Ne pas commiter `.env` = **Sécurité renforcée** ✅

---

## 📝 Après cela

Votre repo GitHub aura la structure:
```
isdr-gl/
├── frontend/
├── backend/
│   ├── Procfile          ← Railway utilise ça
│   ├── package.json
│   ├── .env              ← PAS sur GitHub (.gitignored)
│   └── src/
└── README.md
```

## ✅ Vérifier sur GitHub

Allez sur votre repo GitHub:
- https://github.com/VOTRE_USERNAME/isdr-gl

Vous devez voir tous les fichiers SAUF `.env` ✅

---

## 🚀 Prochaine étape

Une fois votre repo sur GitHub, vous pourrez:
1. Aller sur Railway.app
2. Connecter votre GitHub
3. Sélectionner le repo
4. Configureer les variables
5. Déployer automatiquement!

**Dites-moi quand votre code est sur GitHub!** 🎯

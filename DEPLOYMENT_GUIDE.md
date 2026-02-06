# 🚀 GUIDE DÉPLOIEMENT - FRONTEND + BACKEND

## ✅ Changements Effectués

### Frontend - Migration Strapi → Backend Node.js

**Créé:** `frontend/src/services/apiService.js`
- Remplace les appels Strapi par des appels au backend Node.js
- Utilise l'URL de base: `process.env.REACT_APP_API_URL`

**Adapté tous les fichiers:**
- ✅ `Frontend/src/pages/Home.js` - getDepartments(), getBlogs()
- ✅ `frontend/src/pages/Blog.js` - getBlogs()
- ✅ `frontend/src/pages/BlogPost.js` - getBlogBySlug()
- ✅ `frontend/src/pages/Departments.js` - getDepartments()
- ✅ `frontend/src/pages/DepartmentDetail.js` - getDepartmentBySlug()
- ✅ `frontend/src/pages/Teachers.js` - getTeachers()

---

## 📋 ARCHITECTURE COMPLÈTE

```
┌─────────────────────────────────────────────────────┐
│                   VERCEL - Frontend React           │
│  URL: https://votre-frontend.vercel.app             │
│  ├── Home (appelle /api/departments)                │
│  ├── Blog (appelle /api/blog)                       │
│  ├── Teachers (appelle /api/teachers)               │
│  └── Admission (utilise Supabase directement)       │
└────────────────┬────────────────────────────────────┘
                 │ REACT_APP_API_URL
                 │ https://votre-backend.com
                 ▼
        ┌─────────────────────────────────┐
        │   Backend Node.js/Express       │
        │   URL: https://votre-backend    │
        │   ├── GET /api/departments      │
        │   ├── GET /api/blog             │
        │   ├── GET /api/teachers         │
        │   ├── POST /api/admissions      │
        │   └── POST /api/contact         │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │      SUPABASE Database          │
        │  - departments table            │
        │  - blog_posts table             │
        │  - teachers table               │
        │  - admissions table             │
        │  - contacts table               │
        │  - blog_comments table          │
        └─────────────────────────────────┘
```

---

## 🛠️ ÉTAPE 1 : DÉPLOYER LE BACKEND

### Option A: Railway.app (Recommandé)

1. Allez sur https://railway.app
2. Connectez votre GitHub
3. Créez un nouveau projet
4. Sélectionnez le repo `isdrgl-goma1`
5. Configurez le **root path** vers `/backend`
6. Ajoutez les variables d'environnement:

```bash
NODE_ENV=production
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

7. Déployez !
8. Copie l'URL de votre backend (ex: `https://isdrgl-backend-prod.up.railway.app`)

### Option B: Heroku/Render/Fly.io

Configuration similaire, juste changer le fournisseur.

---

## 🎨 ÉTAPE 2 : DÉPLOYER LE FRONTEND

### Sur Vercel

1. Allez sur https://vercel.com
2. Connectez votre GitHub
3. Importez le repo `isdrgl-goma1`
4. Configuration:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

5. Cliquez **Environment Variables** et ajoutez:

```bash
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

**IMPORTANT:** Remplacez les URLs par vos vraies URLs!

6. Cliquez **Deploy**
7. Attendez que le build se termine

---

## ✅ VÉRIFICATION DU DÉPLOIEMENT

### Tester le Frontend

1. Allez sur votre URL Vercel
2. Vérifiez chaque page:
   - ✅ Home - Doit voir les départements et blogs
   - ✅ Blogs - Doit voir la liste des articles
   - ✅ Departments - Doit voir la liste des filières
   - ✅ Teachers - Doit voir la liste des enseignants
   - ✅ Admission - Formulaire fonctionnel
   - ✅ Contact - Formulaire fonctionnel

### Tester le Backend

```bash
curl https://your-backend-url.com/api/departments
curl https://your-backend-url.com/api/blog
curl https://your-backend-url.com/api/teachers
curl https://your-backend-url.com/api/health
```

Chaque endpoint doit retourner des données JSON ou un tableau vide `[]`.

---

## 🔧 STRUCTURE DES ENDPOINTS

### GET /api/departments
```json
[
  {
    "id": "uuid",
    "name": "String",
    "description": "String",
    "image": "String (URL)",
    "head_of_department": "String",
    "is_active": "Boolean"
  }
]
```

### GET /api/blog
```json
[
  {
    "id": "uuid",
    "title": "String",
    "excerpt": "String",
    "content": "String",
    "author": "String",
    "category": "String",
    "created_at": "Timestamp"
  }
]
```

### GET /api/teachers
```json
[
  {
    "id": "uuid",
    "first_name": "String",
    "last_name": "String",
    "email": "String",
    "phone": "String",
    "specialization": "String",
    "bio": "String",
    "photo": "String (URL)"
  }
]
```

---

## ⚠️ TROUBLESHOOTING

### "REACT_APP_API_URL is undefined"
- ❌ Les variables d'environnement ne sont pas configurées sur Vercel
- ✅ Allez sur Vercel → Project Settings → Environment Variables

### "Cannot GET /api/departments"
- ❌ Le backend n'est pas déployé ou l'URL est mauvaise
- ✅ Testez avec `curl` pour vérifier que le backend répond

### "CORS error in console"
- ❌ Le backend n'autorise pas les appels cross-origin
- ✅ Vérifiez que `cors` est bien configuré dans `app.js`

### "Supabase connection error"
- ❌ Les variables Supabase ne sont pas correctes
- ✅ Vérifiez dans backend/.env que `SUPABASE_URL` et `SUPABASE_ANON_KEY` sont corrects

---

## 📝 CHECKLIST FINAL

- [ ] Backend déployé sur Railway/Heroku/Fly.io
- [ ] Backend répond à `/api/health` (test avec curl)
- [ ] Frontend variables d'env configurées sur Vercel
- [ ] `REACT_APP_API_URL` pointe vers le backend
- [ ] Frontend build réussi
- [ ] Home page affiche les départements
- [ ] Blog affiche les articles
- [ ] Teachers page affiche les enseignants
- [ ] Formulaires Admission/Contact fonctionnels

---

## 🚀 URL DE PRODUCTION

```
Frontend:  https://isdr-gl.vercel.app
Backend:   https://isdr-gl-backend.up.railway.app
Supabase:  https://your-project.supabase.co (privé)
```

---

**Besoin d'aide?** Consultez [AUDIT_COMPLET.md](AUDIT_COMPLET.md) ou [DEPLOYMENT_AUDIT.md](DEPLOYMENT_AUDIT.md)

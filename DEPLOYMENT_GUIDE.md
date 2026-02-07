# 🚀 GUIDE DÉPLOIEMENT - FRONTEND (SUPABASE DIRECT)

## ✅ Changements Effectués

### Frontend - Migration Strapi → Supabase Direct

**Utilise:** `frontend/src/services/supabaseService.js`
- Appels Supabase directs (pas de backend)
- Variables d'env Supabase uniquement

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
│  ├── Home (lit Supabase)                            │
│  ├── Blog (lit Supabase)                            │
│  ├── Teachers (lit Supabase)                        │
│  ├── Admission (écrit Supabase)                     │
│  └── Contact (écrit Supabase)                       │
└─────────────────────────────────────────────────────┘
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

## 🎨 ÉTAPE UNIQUE : DÉPLOYER LE FRONTEND

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
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
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

## 🔧 STRUCTURE DES DONNÉES SUPABASE

### Table: departments
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

### Table: blog_posts
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

### Table: teachers
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

### "Supabase connection error"
- ❌ Les variables Supabase ne sont pas correctes
- ✅ Vérifiez dans backend/.env que `SUPABASE_URL` et `SUPABASE_ANON_KEY` sont corrects

---

## 📝 CHECKLIST FINAL

- [ ] Frontend variables d'env configurées sur Vercel
- [ ] Frontend build réussi
- [ ] Home page affiche les départements
- [ ] Blog affiche les articles
- [ ] Teachers page affiche les enseignants
- [ ] Formulaires Admission/Contact fonctionnels

---

## 🚀 URL DE PRODUCTION

```
Frontend:  https://isdr-gl.vercel.app
Backend:   (supprimé - Supabase direct)
Supabase:  https://your-project.supabase.co (privé)
```

---

**Besoin d'aide?** Consultez [AUDIT_COMPLET.md](AUDIT_COMPLET.md) ou [DEPLOYMENT_AUDIT.md](DEPLOYMENT_AUDIT.md)

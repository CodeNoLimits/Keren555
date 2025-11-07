# 🚨 FIX URGENT RENDER - Variables d'Environnement

## ❌ Erreur Actuelle
```
Error: DATABASE_URL must be set. Did you forget to provision a database?
```

## ✅ SOLUTION IMMÉDIATE (2 minutes)

### Sur Render.com Dashboard :

1. **Aller dans votre service web** (celui qui affiche l'erreur)

2. **Cliquer sur "Environment" dans le menu gauche**

3. **Ajouter ces variables MINIMUM** :

```bash
# BASE DE DONNÉES (OBLIGATOIRE - le site ne démarre pas sans ça)
DATABASE_URL=postgresql://user:password@host:5432/database
# OU si vous utilisez Supabase:
DATABASE_URL=postgresql://postgres:[VOTRE-PASSWORD]@db.[VOTRE-PROJET].supabase.co:5432/postgres

# Ou utilisez cette format Supabase direct:
SUPABASE_URL=https://[VOTRE-PROJET].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[VOTRE-SERVICE-ROLE-KEY]

# SESSION (OBLIGATOIRE)
SESSION_SECRET=votre-random-string-tres-long-et-secure-ici-minimum-32-caracteres

# NODE ENV
NODE_ENV=production
```

4. **Cliquer "Save Changes"**

5. **Render va redéployer automatiquement**

---

## 📋 VARIABLES OPTIONNELLES (mais recommandées)

Ajoutez-les progressivement pour activer plus de fonctionnalités :

```bash
# LOTERIE ADMIN
LOTTERY_ADMIN_USER=admin
LOTTERY_ADMIN_PASS=VotreMotDePasseSecure2024!

# AI CHATBOT (pour activer le chat)
GEMINI_API_KEY=votre-clé-gemini
OPENROUTER_API_KEY=votre-clé-openrouter

# PAIEMENTS STRIPE (pour le magasin)
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# PAYPAL (pour les donations)
VITE_PAYPAL_CLIENT_ID=votre-paypal-client-id

# EMAILS
SENDGRID_API_KEY=votre-sendgrid-key
FROM_EMAIL=noreply@votredomaine.com
```

---

## 🔧 Comment obtenir DATABASE_URL ?

### Option A : Utiliser Supabase (GRATUIT - RECOMMANDÉ)

1. Aller sur https://supabase.com
2. Créer un compte / Se connecter
3. Créer un nouveau projet
4. Une fois créé, aller dans **Settings > Database**
5. Copier la "Connection string" sous "URI"
6. Remplacer `[YOUR-PASSWORD]` par votre mot de passe
7. C'est votre `DATABASE_URL` !

**Exemple** :
```
postgresql://postgres:VotrePassword123@db.abcdefghijklm.supabase.co:5432/postgres
```

### Option B : Créer une base Render PostgreSQL

1. Dans Render Dashboard, cliquer "New +"
2. Choisir "PostgreSQL"
3. Créer la base (gratuite jusqu'à 90 jours)
4. Copier l'"Internal Database URL"
5. C'est votre `DATABASE_URL` !

---

## 📊 Setup Complet de la Base de Données

Une fois DATABASE_URL configuré, vous devez exécuter les schemas SQL :

1. **Connectez-vous à votre base** (Supabase SQL Editor ou psql)
2. **Exécutez dans cet ordre** :

```sql
-- 1. Schema principal (27 tables)
-- Contenu du fichier: supabase-setup.sql

-- 2. Schema loterie (4 tables)
-- Contenu du fichier: supabase-lottery-schema.sql
```

Les fichiers sont dans votre repo :
- `/supabase-setup.sql`
- `/supabase-lottery-schema.sql`

---

## ✅ CHECKLIST DE VÉRIFICATION

Après avoir ajouté les variables :

- [ ] Variables ajoutées sur Render
- [ ] Render a redéployé automatiquement
- [ ] Les logs ne montrent plus "DATABASE_URL must be set"
- [ ] Le site démarre (vérifier les logs)
- [ ] Ouvrir l'URL du site dans le navigateur
- [ ] Vérifier que la homepage s'affiche

---

## 🐛 Fix Warning Build (magazine.tsx)

Les warnings de clés dupliquées n'empêchent PAS le déploiement, mais pour les fixer :

1. Ouvrir `client/src/pages/magazine.tsx`
2. Chercher les lignes 940-1100 (section anglaise)
3. Supprimer les clés dupliquées :
   - `dailyQuotesTitle`, `dailyQuotesSubtitle`, `dailyQuotes` (lignes 941-974)
   - `testimonialsTitle`, `testimonialsSubtitle`, `testimonials` (lignes 977-1012)
   - `eventsTitle`, `eventsSubtitle`, `events` (lignes 1015-1050)
   - `videosTitle`, `videosSubtitle`, `videos` (lignes 1053-1080)
   - `worldNewsTitle`, `worldNewsSubtitle`, `worldNews` (lignes 1083-1100)

Ces sections sont DÉJÀ définies aux lignes 720-890, donc les duplicatas aux lignes 940+ peuvent être supprimés.

---

## 🆘 SI ÇA NE MARCHE TOUJOURS PAS

### Vérifier les logs Render :

1. Render Dashboard > Votre service
2. Cliquer sur "Logs" (onglet du haut)
3. Regarder les dernières lignes
4. Chercher les erreurs

### Erreurs communes :

| Erreur | Solution |
|--------|----------|
| `DATABASE_URL must be set` | Ajouter DATABASE_URL dans Environment |
| `Connection refused` | Vérifier format DATABASE_URL |
| `Port 5000 is already in use` | Render gère ça automatiquement, ignorer |
| `Module not found` | Effacer le cache Render et rebuilder |

---

## 📞 CONTACT RAPIDE

Si problème persiste :
1. Copier les logs d'erreur complets
2. Vérifier que DATABASE_URL est bien ajouté
3. Essayer de "Clear build cache & deploy" dans Render

---

**⚡ ALLEZ-Y ! Ajoutez DATABASE_URL maintenant et le site démarrera ! ⚡**

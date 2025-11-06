# 🔑 GUIDE PAYPAL - OBTENIR VOS CLÉS

## 🎯 POURQUOI PAYPAL?

PayPal permet à vos utilisateurs de faire des donations sécurisées pour la loterie.

**Mais attention**: Le site fonctionne **SANS PayPal** en mode démo pour ce soir!

---

## 📋 ÉTAPE PAR ÉTAPE - 10 MINUTES

### 1️⃣ Créer un Compte PayPal Developer

**A. Allez sur**: https://developer.paypal.com/

**B. Cliquez sur**: "Log In" (en haut à droite)

**C. Connectez-vous** avec votre compte PayPal personnel
   - Si vous n'en avez pas: cliquez "Sign Up" et créez-en un
   - C'est **gratuit**!

---

### 2️⃣ Accéder au Dashboard

**D. Une fois connecté**, vous verrez le Dashboard

**E. Cliquez sur**: "Apps & Credentials" dans le menu

**F. Vous verrez deux onglets**:
   - **Sandbox**: Pour tester (environnement de test)
   - **Live**: Pour production (vrais paiements)

---

### 3️⃣ Créer une App (SANDBOX - pour tester)

**G. Sélectionnez l'onglet**: **"Sandbox"**

**H. Cliquez sur**: **"Create App"** (bouton bleu)

**I. Remplissez le formulaire**:
   ```
   App Name: Keren Rabbi Israel Lottery
   Choose an app type: Merchant
   ```

**J. Cliquez**: **"Create App"**

---

### 4️⃣ Récupérer les Clés SANDBOX

**K. Vous verrez maintenant votre app** avec deux informations importantes:

```
┌─────────────────────────────────────────────┐
│ Sandbox API Credentials                      │
├─────────────────────────────────────────────┤
│ Client ID:                                   │
│ AXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx       │
│                                              │
│ Secret: [Show]  ← Cliquez ici              │
│ ELxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx       │
└─────────────────────────────────────────────┘
```

**L. COPIEZ ces deux clés**:
   - **Client ID**: Commence par "A" (visible directement)
   - **Secret**: Cliquez sur "Show" pour le voir, commence par "E"

**M. Sauvegardez-les** dans un fichier texte temporaire:
   ```
   SANDBOX Client ID: AXxxx...
   SANDBOX Secret: ELxxx...
   ```

---

### 5️⃣ Créer une App (LIVE - pour production)

**N. Maintenant, sélectionnez l'onglet**: **"Live"**

**O. Cliquez sur**: **"Create App"**

**P. Remplissez**:
   ```
   App Name: Keren Rabbi Israel Lottery LIVE
   Choose an app type: Merchant
   ```

**Q. Cliquez**: **"Create App"**

**R. Récupérez les clés LIVE** (même procédure):
   ```
   LIVE Client ID: AYxxx...
   LIVE Secret: EMxxx...
   ```

**S. Sauvegardez-les**:
   ```
   LIVE Client ID: AYxxx...
   LIVE Secret: EMxxx...
   ```

---

### 6️⃣ Comprendre la Différence

| Type | Usage | Argent Réel? |
|------|-------|-------------|
| **SANDBOX** | Tests, développement | ❌ Non - Argent fictif |
| **LIVE** | Production, vrais clients | ✅ Oui - Vrais paiements |

**Pour ce soir**: Utilisez **SANDBOX** pour montrer comment ça marche!
**Plus tard**: Passez à **LIVE** quand vous êtes prêt pour de vrais paiements.

---

## 🚀 AJOUTER LES CLÉS À RENDER

### Pour SANDBOX (Tests):

1. **Render Dashboard** → Votre service
2. **Environment** (menu gauche)
3. **Add Environment Variable**
4. Ajoutez:
   ```
   PAYPAL_CLIENT_ID = [votre SANDBOX Client ID]
   PAYPAL_CLIENT_SECRET = [votre SANDBOX Secret]
   BASE_URL = https://keren-rabbi-israel.onrender.com
   ```
5. **Save Changes**

### Pour LIVE (Production):

Même chose, mais utilisez les clés **LIVE** au lieu des clés **SANDBOX**!

---

## 🧪 TESTER AVEC SANDBOX

PayPal crée automatiquement des comptes de test pour vous!

### Voir vos comptes de test:

1. **Dashboard** → **Testing Tools** → **Sandbox Accounts**
2. Vous verrez:
   - Un compte "Business" (vendeur - vous)
   - Un compte "Personal" (acheteur - client test)

### Tester un paiement:

1. Allez sur: `https://keren-rabbi-israel.onrender.com/raffle`
2. Remplissez le formulaire (montant ≥ 35₪)
3. Cliquez "Donate"
4. Vous serez redirigé vers PayPal
5. **Connectez-vous avec le compte Personal** (acheteur test)
   - Email: Visible dans "Sandbox Accounts"
   - Password: Cliquez sur "..." → "View/Edit" pour voir le mot de passe
6. Confirmez le paiement
7. Vous serez redirigé vers la page de confirmation!

---

## 🎯 CHECKLIST DE CONFIGURATION

### Pour MODE DÉMO (sans PayPal):
- ✅ Rien à faire! Ça marche déjà!

### Pour MODE TEST (PayPal Sandbox):
- [ ] Créer compte PayPal Developer
- [ ] Créer app Sandbox
- [ ] Récupérer Client ID Sandbox
- [ ] Récupérer Secret Sandbox
- [ ] Ajouter dans Render Environment Variables
- [ ] Tester avec compte Sandbox

### Pour MODE PRODUCTION (PayPal Live):
- [ ] Créer app Live
- [ ] Récupérer Client ID Live
- [ ] Récupérer Secret Live
- [ ] Remplacer les clés Sandbox par les clés Live dans Render
- [ ] Tester avec un vrai paiement (petit montant)

---

## 💡 CONSEILS

### ⚠️ IMPORTANT

1. **Ne partagez JAMAIS vos clés Secret publiquement!**
2. Les clés Sandbox et Live sont différentes
3. Testez TOUJOURS en Sandbox avant d'aller en Live
4. Gardez vos clés en sécurité (password manager)

### 🎭 Pour la Présentation Ce Soir

**Option 1**: Utilisez le **MODE DÉMO** (pas de PayPal)
- ✅ Plus simple
- ✅ Fonctionne immédiatement
- ✅ Aucune configuration

**Option 2**: Utilisez **SANDBOX** (PayPal test)
- ✅ Montre comment PayPal fonctionne
- ✅ Pas de vrais paiements
- ⚠️ Nécessite configuration (10 min)

**Option 3**: Utilisez **LIVE** (vrais paiements)
- ⚠️ Seulement si vous êtes 100% prêt
- ⚠️ Les gens paieront vraiment
- ⚠️ Responsabilité légale

**Je recommande**: **Option 1 (Mode Démo)** pour ce soir!

---

## 📞 BESOIN D'AIDE?

### Problèmes courants:

**"Je ne vois pas 'Create App'"**
- Assurez-vous d'être sur "Apps & Credentials"
- Vérifiez que vous êtes connecté

**"Secret ne s'affiche pas"**
- Cliquez sur "Show" à côté de "Secret"
- Si ça ne marche pas, rafraîchissez la page

**"Paiement refuse en Sandbox"**
- Vérifiez que vous utilisez les comptes de test Sandbox
- Le compte Personal doit avoir des fonds (PayPal les ajoute automatiquement)

**"Erreur 'PayPal not configured'"**
- Vérifiez que les variables d'environnement sont bien ajoutées
- Vérifiez qu'il n'y a pas d'espaces avant/après les clés
- Attendez que Render redéploie (2-3 minutes)

---

## 🎊 VOUS ÊTES PRÊT!

Maintenant vous savez:
- ✅ Comment obtenir vos clés PayPal
- ✅ La différence entre Sandbox et Live
- ✅ Comment tester les paiements
- ✅ Comment ajouter les clés à Render

**Mais rappelez-vous**: Le site fonctionne **SANS PayPal** pour ce soir!

PayPal est **optionnel** - vous pouvez l'activer plus tard quand vous voulez.

**Bonne présentation! 🚀**

# Créer une propriété GA4 et récupérer l’ID de mesure (G-XXXXXXXXXX)

## 1. Accéder à Google Analytics

1. Allez sur [analytics.google.com](https://analytics.google.com).
2. Connectez-vous avec le compte Google qui gère déjà votre site (celui qui a la propriété UA-129907636-1 si vous en avez une).

---

## 2. Créer une propriété GA4

1. En bas à gauche, cliquez sur **Administration** (icône engrenage).
2. Dans la colonne du milieu (**Propriété**), cliquez sur **Créer une propriété**.
3. **Nom de la propriété** : par exemple `Site BFM` ou `Banky Foibe - Production`.
4. Choisissez le **fuseau horaire** et la **devise** de rapport, puis cliquez sur **Suivant**.
5. **Informations sur votre entreprise** : sélectionnez le secteur et la taille, puis **Créer**.
6. Acceptez les conditions si demandé. La propriété GA4 est créée.

---

## 3. Créer un flux de données (Web)

Une fois la propriété créée, Google propose souvent de configurer un flux de données :

1. Choisissez **Web** comme plateforme.
2. **URL du site** : par ex. `https://www.banky-foibe.mg`
3. **Nom du flux** : par ex. `Site principal` ou `Production`.
4. Cliquez sur **Créer le flux**.

Si vous n’avez pas encore de flux Web :

1. **Administration** → colonne **Propriété** → **Flux de données**.
2. Cliquez sur **Ajouter un flux** → **Web**.
3. Renseignez l’URL et le nom du flux, puis **Créer le flux**.

---

## 4. Récupérer l’ID de mesure (G-XXXXXXXXXX)

L’**ID de mesure** a la forme **G-XXXXXXXXXX** (remplace l’ancien UA-XXXXX).

1. **Administration** (engrenage en bas à gauche).
2. Dans la colonne **Propriété**, cliquez sur **Flux de données**.
3. Cliquez sur le flux **Web** que vous venez de créer (ou celui déjà utilisé pour le site).
4. En haut à droite de la page de détails du flux, vous voyez **ID de mesure** : **G-XXXXXXXXXX**.

Copiez cet ID (ex. `G-ABC123XYZ`).

---

## 5. L’ajouter dans votre site (index.html)

Dans le fichier `src/index.html`, le script gtag est déjà présent. Pour envoyer les données aussi vers GA4 :

1. Ouvrez `src/index.html`.
2. Repérez le bloc avec `gtag('config', 'UA-129907636-1');`.
3. Juste en dessous, **décommentez** et **remplacez** par votre ID GA4 :

```html
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-129907636-1');
    gtag('config', 'G-VOTRE_ID_ICI');   /* ex. G-ABC123XYZ */
</script>
```

4. Remplacez `G-VOTRE_ID_ICI` par votre vrai ID (ex. `G-ABC123XYZ`).
5. Enregistrez et redéployez le site.

Les événements **eariary_page_view** et **eariary_section_view** seront alors visibles dans la propriété GA4 sous **Rapports** → **Engagement** → **Événements**.

---

## Résumé

| Étape | Où | Action |
|-------|-----|--------|
| 1 | analytics.google.com | Se connecter |
| 2 | Administration → Créer une propriété | Créer la propriété GA4 |
| 3 | Flux de données → Ajouter un flux → Web | Créer le flux Web du site |
| 4 | Flux de données → clic sur le flux Web | Copier l’**ID de mesure** (G-…) |
| 5 | `src/index.html` | Ajouter `gtag('config', 'G-XXXXXXXXXX');` avec votre ID |

**Lien d’aide Google :** [Trouver votre ID de balise Google (GA4)](https://support.google.com/analytics/answer/9539598)

# Discord Selfbot - Envoi de messages à tous les amis

Ce selfbot Discord permet d'envoyer un message personnalisé à tous vos amis avec un délai de 0,5 seconde entre chaque message.

## ⚠️ Avertissement

**L'utilisation de selfbots est contre les Conditions d'Utilisation de Discord et peut entraîner la fermeture de votre compte. Utilisez ce code à vos propres risques.**

## Configuration

1. Assurez-vous d'avoir Node.js installé sur votre ordinateur
2. Clonez ou téléchargez ce dépôt
3. Ouvrez un terminal dans le dossier du projet
4. Installez les dépendances avec `npm install`
5. Configurez le selfbot de l'une des manières suivantes :
   
   **Option 1 : Utiliser un fichier de configuration**
   - Copiez `config.example.json` vers `config.json`
   - Modifiez `config.json` avec :
     - `token` : Votre token Discord
     - `message` : Le message que vous souhaitez envoyer à tous vos amis
     - `delayBetweenMessages` : Le délai entre chaque message (en millisecondes)
   
   **Option 2 : Modifier directement le fichier index.js**
   - Ouvrez `index.js` et modifiez les valeurs dans l'objet `config` au début du fichier

## Comment obtenir votre token Discord

**Attention** : Ne partagez jamais votre token Discord avec qui que ce soit !

1. Ouvrez Discord dans votre navigateur
2. Appuyez sur F12 pour ouvrir les outils de développement
3. Allez dans l'onglet "Application" (ou "Stockage")
4. Dans la section "Stockage local", cliquez sur "https://discord.com"
5. Recherchez la clé "token" 
6. Copiez la valeur du token (sans les guillemets)

## Utilisation

Pour lancer le selfbot, exécutez l'une des commandes suivantes dans le terminal :

```
npm start
```

ou 

```
node index.js
```

Le selfbot va :
1. Se connecter à votre compte Discord
2. Afficher le nombre total d'amis
3. Envoyer le message configuré à chaque ami avec un délai de 0,5 seconde
4. Afficher un rapport des messages envoyés une fois terminé

## Personnalisation

Vous pouvez ajuster les paramètres suivants dans le fichier `config.json` :

- `message` : Le message personnalisé à envoyer
- `delayBetweenMessages` : Le délai entre chaque message (en millisecondes) 

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
   
   **Au lancement du script :**
   - Entrez le Token d'utilisateur
   - Entrez le message a envoyer
   - Entrez le delay entre chaque message (500 ms par default)
   - Entrez des ID d'utilisateur blacklist

## Comment obtenir votre token Discord

**Attention** : Ne partagez jamais votre token Discord avec qui que ce soit !

1. Ouvrez Discord dans votre navigateur
2. Appuyez sur F12 pour ouvrir les outils de développement
3. Allez dans l'onglet "Network" et faites Ctrl + R (refresh la page)
4. Dans le fichier "science", Copiez La valeur notee apres Autorization
6. Utilisez la dans la configuration du script 

## Utilisation

Pour lancer le selfbot, Ouvrez le dossier dans le terminal, exécutez la commandes suivante :

node index.js

Le selfbot va :
1. Se connecter à votre compte Discord
2. Afficher le nombre total d'amis
3. Envoyer le message configuré à chaque ami avec un délai de 0,5 seconde (ou la valeur choisi)
4. Afficher un rapport des messages envoyés une fois terminé


const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Création d'une interface pour lire les entrées utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour afficher le logo ASCII art
function displayLogo() {
    console.clear();
    console.log(`
    ██████╗ ███╗   ███╗     █████╗ ██╗     ██╗         ███╗   ███╗██████╗ 
    ██╔══██╗████╗ ████║    ██╔══██╗██║     ██║         ████╗ ████║██╔══██╗
    ██║  ██║██╔████╔██║    ███████║██║     ██║         ██╔████╔██║██████╔╝
    ██║  ██║██║╚██╔╝██║    ██╔══██║██║     ██║         ██║╚██╔╝██║██╔═══╝ 
    ██████╔╝██║ ╚═╝ ██║    ██║  ██║███████╗███████╗    ██║ ╚═╝ ██║██║     
    ╚═════╝ ╚═╝     ╚═╝    ╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝     ╚═╝╚═╝     
                                                                                                                   
    By: Selfbot Creator | discord.js-selfbot-v13
    `);
}

// Configuration du selfbot
let config = {
    token: '',
    message: '',
    delayBetweenMessages: 500, // 0.5 seconde en millisecondes par défaut
    excludedIds: [] // Tableau pour stocker les IDs à exclure
};

// Fonction qui demande le token et le message à l'utilisateur
function promptUserInput() {
    displayLogo();
    
    rl.question('\n\n[?] Entrez votre token Discord: ', (token) => {
        config.token = token;
        
        rl.question('\n[?] Entrez le message à envoyer à tous vos amis: ', (message) => {
            config.message = message;
            
            rl.question('\n[?] Délai entre les messages (en ms, 500 par défaut): ', (delay) => {
                if (delay && !isNaN(delay)) {
                    config.delayBetweenMessages = parseInt(delay);
                }
                
                // Demander les IDs à exclure
                rl.question('\n[?] Entrez les IDs à exclure (séparés par des virgules, ou appuyez sur Entrée pour aucun): ', (excludedIdsInput) => {
                    if (excludedIdsInput.trim()) {
                        config.excludedIds = excludedIdsInput.split(',').map(id => id.trim());
                    }
                    
                    console.log('\n[i] Configuration terminée. Connexion en cours...\n');
                    startBot();
                    rl.close();
                });
            });
        });
    });
}

// Fonction pour démarrer le bot
function startBot() {
    const client = new Client();
    
    client.on('ready', async () => {
        console.log(`\n[+] Connecté en tant que ${client.user.tag}`);
        
        // Récupérer la liste des amis
        const friendsList = client.relationships.friendCache;
        
        console.log(`[i] Nombre total d'amis: ${friendsList.size}`);
        console.log(`[i] Envoi du message: "${config.message}"`);
        console.log(`[i] Délai entre les messages: ${config.delayBetweenMessages}ms`);
        
        // Fonction pour envoyer un message avec un délai
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        
        // Parcourir tous les amis et leur envoyer un message
        let successCount = 0;
        let failCount = 0;
        
        console.log('\n[i] Début de l\'envoi des messages...\n');
        
        for (const [id, friend] of friendsList) {
            // Vérifier si l'ID est dans la liste des exclus
            if (config.excludedIds.includes(id)) {
                console.log(`[i] [${successCount + failCount}/${friendsList.size}] ID ${id} ignoré (exclu)`);
                continue;
            }

            try {
                const user = await client.users.fetch(id);
                const dmChannel = await user.createDM();
                
                await dmChannel.send(config.message);
                
                successCount++;
                console.log(`[✓] [${successCount + failCount}/${friendsList.size}] Message envoyé à ${user.tag}`);
                
                // Attendre avant d'envoyer le prochain message
                await sleep(config.delayBetweenMessages);
            } catch (error) {
                failCount++;
                console.error(`[✗] [${successCount + failCount}/${friendsList.size}] Erreur lors de l'envoi du message à l'ID ${id}: ${error.message}`);
            }
        }
        
        console.log(`\n[i] Résultat final:`);
        console.log(`[✓] Messages envoyés avec succès: ${successCount}`);
        console.log(`[✗] Échecs: ${failCount}`);
        console.log(`[i] Total: ${friendsList.size}`);
        
        // Déconnexion après avoir fini
        console.log("\n[i] Tâche terminée, déconnexion...");
        client.destroy();
        process.exit(0);
    });
    
    // Gestion des erreurs
    client.on('error', error => {
        console.error(`\n[!] Une erreur est survenue: ${error.message}`);
    });
    
    // Connexion au compte Discord
    client.login(config.token).catch(error => {
        console.error(`\n[!] Erreur de connexion: ${error.message}`);
        console.log('\n[i] Vérifiez votre token et réessayez.');
        process.exit(1);
    });
}

// Démarrer l'application
promptUserInput(); 
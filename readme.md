# API Posts avec Cache Redis

Une API RESTful moderne construite avec Fastify et TypeScript, utilisant PostgreSQL comme base de données principale et Redis pour la mise en cache des données.

## 🚀 Fonctionnalités

- **API REST** construite avec Fastify et TypeScript
- **Mise en cache Redis** avec expiration automatique (30 secondes)
- **Base de données PostgreSQL** pour le stockage persistant
- **Génération automatique** de posts toutes les 60 secondes
- **Mesures de performance** pour comparer les temps de réponse (cache vs base de données)

## 📋 Prérequis

- Node.js (version récente)
- PostgreSQL
- Redis
- npm ou yarn

## 🛠 Installation

1. Clonez le dépôt :

```bash
git clone [url-du-repo]
cd atelier-docker-2
```

2. Installez les dépendances :

```bash
npm install
```

3. Configurez votre base de données PostgreSQL :

- Base de données : `atelierdocker`
- Utilisateur : `postgres`
- Mot de passe : `postgres`
- Port : `5432`

4. Assurez-vous que Redis est en cours d'exécution sur :

- Host : `localhost`
- Port : `6379`

## 🚀 Démarrage

1. Démarrez l'application :

```bash
npm run dev
```

2. L'API sera accessible sur : `http://localhost:3000`

## 📌 Points d'API

### GET /posts

- Récupère tous les posts
- Utilise un cache Redis (TTL: 30 secondes)
- Affiche les métriques de performance pour chaque requête

#### Réponses possibles :

- Cache Hit : Données servies depuis Redis (très rapide)
- Cache Miss : Données récupérées depuis PostgreSQL (plus lent)

## 🔍 Fonctionnement du Cache

- Le cache expire automatiquement après 30 secondes
- Les temps de réponse sont mesurés et affichés dans les logs
- Format des logs :
  - Cache Hit : `Cache hit: Served posts from Redis in XX.XXms`
  - Cache Miss : `Cache miss: Served posts from database in XX.XXms`

## 🔄 Génération Automatique de Contenu

L'application génère automatiquement de nouveaux posts :

- Premier post généré au démarrage
- Nouveaux posts générés toutes les 60 secondes
- Contenu généré aléatoirement avec Faker.js

## 🛠 Stack Technique

- **Fastify** : Framework web rapide et léger
- **TypeScript** : Pour un code typé et plus sûr
- **PostgreSQL** : Base de données relationnelle
- **Redis** : Système de cache en mémoire
- **ioredis** : Client Redis pour Node.js
- **Faker.js** : Génération de données aléatoires

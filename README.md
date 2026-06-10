# DashboardNAS - Frontend

## Présentation

DashboardNAS est une application web de supervision développée en React permettant de surveiller un serveur TrueNAS SCALE.

L'application offre une interface moderne pour consulter l'état du système, des disques, des pools ZFS, du matériel IPMI et, à terme, des ressources GPU dédiées à l'intelligence artificielle.

Le projet est actuellement utilisé pour superviser l'infrastructure personnelle composée des serveurs :

- 🚀 EXODUS : serveur principal
- 🔨 HÉPHAÏSTOS : serveur de sauvegarde et réplication
- 🤖 HESTIA : future assistante IA locale

---

## Fonctionnalités

### Tableau de bord

- Vue d'ensemble du serveur
- Informations système
- Utilisation des ressources
- Statut global

### CPU

- Utilisation processeur en temps réel
- Informations matérielles
- Températures

### Disques

- Liste des disques
- État SMART
- Températures
- Capacité et utilisation

### Pools ZFS

- État des pools
- Capacité utilisée
- Santé des pools
- Informations ZFS

### IPMI

- Températures système
- Vitesse des ventilateurs
- Contrôle manuel et automatique
- Surveillance matérielle

### Fonctionnalités futures

- Surveillance GPU NVIDIA Tesla P40
- Gestion de la zone GPU
- Statistiques VRAM
- Intégration HESTIA
- Notifications intelligentes

---

## Technologies utilisées

- React
- Vite
- React Router
- Recharts
- Lucide React
- CSS

---

## Installation

### Cloner le projet

```bash
git clone https://github.com/BrunoStudi/nas_dashboard_frontend
cd frontend
```

### Installer les dépendances

```bash
npm install
```

### Lancer en mode développement

```bash
npm run dev
```

L'application sera disponible sur :

```text
http://localhost:5173
```

---

## Build de production

```bash
npm run build
```

Les fichiers générés seront disponibles dans :

```text
dist/
```

---

## Architecture

```text
src/
├── components/
├── pages/
├── layouts/
├── services/
├── styles/
└── assets/
```

---

## Roadmap

### Terminé

- [x] Dashboard principal
- [x] Monitoring CPU
- [x] Monitoring disques
- [x] Monitoring pools ZFS
- [x] Monitoring IPMI
- [x] Interface responsive
- [x] Sidebar moderne

### En cours

- [ ] Monitoring GPU NVIDIA
- [ ] Gestion zone GPU
- [ ] Historique des métriques

### Futur

- [ ] Intégration HESTIA
- [ ] Commandes vocales
- [ ] Notifications intelligentes
- [ ] Gestion multi-serveurs
- [ ] Intégration Home Assistant

---

## Infrastructure supervisée

```text
🚀 EXODUS
├── TrueNAS SCALE
├── DashboardNAS
├── Ollama
├── Open WebUI
└── Tesla P40

🔨 HÉPHAÏSTOS
├── Sauvegardes
├── Réplication
└── Snapshots

🏠 Home Assistant
└── Raspberry Pi

🤖 HESTIA
└── Assistante IA locale (à venir)
```

---

## Auteur

Projet développé dans le cadre de l'administration et de la supervision d'une infrastructure personnelle basée sur TrueNAS SCALE.
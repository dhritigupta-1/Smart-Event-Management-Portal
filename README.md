# Smart Event Management Portal (Version 2 - Completed)

**Author**: Dhriti Gupta  
**Project**: DevOps Capstone Project - ABC Solutions Pvt. Ltd.

---

## 📌 Project Status
- **Version 1 (`v1.0`)**: Core Foundation (Auth, Events, Booking, Admin, Animations, Docker, Minikube, Jenkins) - **Completed**
- **Version 2 (`v2.0`)**: Content & Feature Upgrades (About, Reviews, FAQ, Theme Toggle, Live Search, Category Filters, Rolling Deployment) - **Completed**

---

## 🚀 Summary of What Was Done in Version 2 (`v2.0`)

### 1. New Content Sections Added
- **ℹ️ About Us Section**: Company mission statement and animated statistics counters (50k+ Tickets Sold, 500+ Conferences Hosted, 99.9% System Uptime, 4.9 ★ Rating).
- **⭐ Customer Reviews & Testimonials**: User review card grid with star ratings, reviewer avatars, and an interactive *"Write a Review"* submission modal.
- **❓ FAQ Accordion Section**: Interactive expandable/collapsible questions & answers regarding ticket redemption, cancellation policies, organizer panel access, and Kubernetes infrastructure.

### 2. New Feature Upgrades
- **🌓 Light / Dark Theme Switcher**: Toggle button (`🌙 / ☀️`) in the navbar allowing users to switch seamlessly between crisp light and multi-color dark themes.
- **🔍 Real-Time Live Search Bar**: Input bar in the navbar that dynamically filters events by title as the user types.
- **Category Filter Pills**: Interactive filter buttons (`All`, `Tech`, `Security`, `Music`, `Design`, `Business`, `Crypto`) to filter event cards dynamically.
- **Navbar Links**: Direct navigation buttons to switch between **Events**, **About Us**, **Reviews**, and **FAQ** sections.

### 3. DevOps & Infrastructure Changes for Version 2
- **Node.js Express Server**: `server.js` updated to serve version indicator `v2.0` on `/api/version`.
- **Automated Tests**: `test/app.test.js` updated to validate Version 2 deployment assertions (`npm test`).
- **Jenkins Pipeline**: `Jenkinsfile` updated with environment variable `IMAGE_TAG = 'v2'`.
- **Docker Image Versioning**: Images built and tagged as `event:v2` and `dhritigupta/event:v2`.
- **Kubernetes Zero-Downtime Rolling Update**: Commands configured to perform zero-downtime rolling updates on Minikube via `kubectl set image deployment/event event=dhritigupta/event:v2`.

---

## 🛠️ Step-by-Step Execution Guide

### 1. Run Application Locally
```bash
npm install
npm test
npm start
```
Access the application at `http://localhost:3000`.

---

### 2. Docker Container Commands (Version 1 vs Version 2)

#### Build & Run Version 1:
```bash
docker build -t event:v1 -t dhritigupta/event:v1 .
docker run -d -p 3000:3000 --name event_v1 event:v1
```

#### Build & Run Version 2:
```bash
docker build -t event:v2 -t dhritigupta/event:v2 .
docker run -d -p 3000:3000 --name event_v2 event:v2
```

---

### 3. Minikube Kubernetes Zero-Downtime Rolling Update

#### Step 1: Deploy Version 1 initially
```bash
minikube start
kubectl create deployment event --image=dhritigupta/event:v1 --dry-run=client -o yaml | kubectl apply -f -
kubectl expose deployment event --type=NodePort --port=3000 --dry-run=client -o yaml | kubectl apply -f -
minikube service event
```

#### Step 2: Perform Zero-Downtime Rolling Update to Version 2
```bash
kubectl set image deployment/event event=dhritigupta/event:v2
```

#### Step 3: Verify Rolling Update Status
```bash
kubectl rollout status deployment/event
```

#### Step 4: Automated Rollback (if needed)
```bash
kubectl rollout undo deployment/event
```
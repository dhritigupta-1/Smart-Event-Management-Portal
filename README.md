# Smart Event Management Portal - DevOps CI/CD Deployment Project

**Author**: Dhriti Gupta  
**Project**: DevOps Capstone Project - ABC Solutions Pvt. Ltd.

---

## 📌 Project Architecture & Release Roadmap

The project follows an incremental release strategy with containerized builds (`v1`, `v2`, `v3`) deployed to Minikube using zero-downtime rolling updates and Jenkins automation.

---

## 🌟 Version Releases & Features Breakdown

### 🔹 Version 1 (`v1.0` - Core Foundation)
- **User Authentication**: Registration & Login modal workflows (Users must register before logging in).
- **Single System Admin Account**: `admin@event.com` / `admin123` with exclusive access to the Admin Panel.
- **Event Browsing & Ticket Booking**: Interactive seat selector, live price calculation, and ticket confirmation.
- **Admin Management Panel**: Full capabilities to **Add**, **Edit**, and **Delete** events in real time.
- **Interactive My Bookings Section**: Redesigned Ticket Stub grid view with unique ticket ID badges.
- **Animations & Aesthetics**:
  - Modal Shake error animation (`modalShake`) when unauthenticated users attempt to book tickets.
  - Celebration Success Burst overlay (`successPop` & `pulseCheck`) upon ticket confirmation.
  - Card entrance spring animations, shimmer light sweeps on hover, and logo pulsing.
  - 6 distinct category color badges (Tech, Security, Music, Design, Business, Crypto).
  - Merged Hero section purple gradient across Navbar and Footer.
  - Footer displaying strictly: `Made By Dhriti Gupta`.
- **Infrastructure**: Express production server (`server.js`), Docker containerization (`node:20`), Minikube Kubernetes CLI deployment, Jenkins pipeline (`Jenkinsfile`), and automated test suite (`test/app.test.js`).

---

### 🔹 Version 2 (`v2.0` - Content & Feature Upgrades)
- **ℹ️ About Us Section**: Company mission statement and animated statistics counters (50k+ Tickets Sold, 500+ Conferences Hosted, 99.9% System Uptime, 4.9 ★ Rating).
- **⭐ Customer Reviews & Testimonials**: User review card grid with star ratings, reviewer avatars, and an interactive *"Write a Review"* submission modal.
- **❓ FAQ Accordion Section**: Interactive expandable/collapsible questions & answers for ticket management and support.
- **🌓 Light / Dark Theme Switcher**: Toggle button (`🌙 / ☀️`) in the navbar allowing users to switch seamlessly between crisp light and multi-color dark themes.
- **🔍 Real-Time Live Search Bar**: Input bar in the navbar that dynamically filters events by title as the user types.
- **Category Filter Pills**: Interactive filter buttons (`All`, `Tech`, `Security`, `Music`, `Design`, `Business`, `Crypto`) to filter event cards dynamically.
- **Navbar Links**: Direct navigation buttons to switch between **Events**, **About Us**, **Reviews**, and **FAQ** sections.
- **DevOps Rolling Update**: Jenkinsfile updated to `IMAGE_TAG = 'v2'`, Docker images tagged as `event:v2` / `dhritigupta/event:v2`, and Minikube zero-downtime rolling update via `kubectl set image deployment/event event=dhritigupta/event:v2`.

---

## 🛠️ Step-by-Step Execution & Deployment Guide

### 1. Run Application Locally
```bash
npm install
npm test
npm start
```
Access the application at `http://localhost:3000`.

---

### 2. Docker Container Build Commands (v1 & v2)

#### Build Version 1 Image:
```bash
docker build -t event:v1 -t dhritigupta/event:v1 .
docker run -d -p 3000:3000 --name event_v1 event:v1
```

#### Build Version 2 Image:
```bash
docker build -t event:v2 -t dhritigupta/event:v2 .
docker run -d -p 3000:3000 --name event_v2 event:v2
```

---

### 3. Minikube Kubernetes Commands (Zero-Downtime Rolling Update)

#### Step 1: Deploy Version 1 initially
```bash
minikube start
kubectl create deployment event --image=dhritigupta/event:v1 --dry-run=client -o yaml | kubectl apply -f -
kubectl expose deployment event --type=NodePort --port=3000 --dry-run=client -o yaml | kubectl apply -f -
minikube service event
```

#### Step 2: Scale Replicas
```bash
kubectl scale deployment/event --replicas=3
kubectl get pods
```

#### Step 3: Perform Zero-Downtime Rolling Update to Version 2
```bash
kubectl set image deployment/event event=dhritigupta/event:v2
```

#### Step 4: Verify Rolling Update Status
```bash
kubectl rollout status deployment/event
```

#### Step 5: Automated Rollback (if needed)
```bash
kubectl rollout undo deployment/event
```
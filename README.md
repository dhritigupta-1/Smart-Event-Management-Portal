# Smart Event Management Portal (Version 1 - Completed)

**Author**: Dhriti Gupta  
**Project**: DevOps Capstone Project - ABC Solutions Pvt. Ltd.

---

## 📌 Project Status
**Completed Version**: **Version 1 (`v1.0`)**

---

## 🚀 Summary of What Was Built

### 1. Web Application (`v1.0`)
- **Interactive Event Management SPA**: Modern responsive Web Application built for ABC Solutions Pvt. Ltd.
- **User Authentication**: Registration & Login workflow (Users must register before logging in).
- **Single System Admin**: Dedicated System Admin account (`admin@event.com` / `admin123`) with exclusive access to the Admin Panel.
- **Event Management (Admin)**: Real-time Admin capabilities to **Add**, **Edit**, and **Delete** events.
- **Ticket Booking System**: Interactive seat selector, live price calculations, and instant ticket reservation.
- **Interactive My Bookings Section**: Ticket Stub grid view featuring unique ticket ID codes (`#badge`) and summary details.
- **Animations & UX**:
  - Modal Shake error animation (`modalShake`) when unauthenticated users attempt to book tickets.
  - Celebration Success Burst overlay (`successPop` & `pulseCheck`) upon ticket confirmation.
  - Card entrance spring animations, shimmer light sweeps on hover, and logo pulsing.
  - 6 distinct category color badges (Tech, Security, Music, Design, Business, Crypto).
  - Merged Hero section purple gradient across Navbar and Footer.
  - Footer displaying strictly: `Made By Dhriti Gupta`.

### 2. DevOps & Infrastructure Setup
- **Express Production Server**: `server.js` running on Node.js 20 with `/healthz` liveness probe and `/api/version` endpoints.
- **Docker Containerization**: Standardized `Dockerfile` built on `node:20` exposing port 3000.
- **Minikube Deployment**: Supported via CLI commands (`kubectl create deployment`, `kubectl expose`, `kubectl scale`, `kubectl rollout undo`).
- **Jenkins CI/CD Pipeline**: Declarative `Jenkinsfile` executing Checkout, `npm test`, Docker Build/Push using Jenkins Credentials ID `Docker_Login`, and automated Minikube deployment & rollback.
- **Automated Testing**: `test/app.test.js` sanity test suite verified via `npm test`.

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

### 2. Docker Container Commands
```bash
# Build Version 1 Image
docker build -t event:v1 .

# Run Container Locally
docker run -d -p 3000:3000 --name event_v1 event:v1
```

---

### 3. Minikube Kubernetes Commands (Imperative CLI Deployment)
```bash
# Start Minikube Cluster
minikube start

# Create Deployment on Minikube
kubectl create deployment event --image=dhritigupta/event:v1

# Expose Deployment on NodePort Service
kubectl expose deployment event --type=NodePort --port=3000

# Get Minikube Service URL
minikube service event

# Scale Replicas
kubectl scale deployment/event --replicas=3

<<<<<<< Updated upstream
### 4. Zero Downtime Rolling Update (Deploying v2 & v3)
```bash
# Perform rolling update to v2
kubectl set image deployment/eventportal eventportal=eventportal:v2
kubectl rollout status deployment/eventportal

# Perform rolling update to v3
kubectl set image deployment/eventportal eventportal=eventportal:v3
kubectl rollout status deployment/eventportal
```

### 5. Automated Rollback
```bash
# View rollout history
kubectl rollout history deployment/eventportal

# Undo rollout / Rollback to previous version
kubectl rollout undo deployment/eventportal
```

---

## 🔄 Phase 4 - Jenkins CI/CD Pipeline

The repository includes a declarative `Jenkinsfile` automating:
1. **Checkout**: Pulls latest repository code.
2. **Test**: Executes `npm test` sanity checks.
3. **Docker Build & Push**: Tags and pushes versioned images to Docker Hub.
4. **Deploy to Minikube**: Executes zero-downtime rolling update directly to the Minikube cluster via `kubectl set image`.
5. **Rollback Trigger**: Automatically issues `kubectl rollout undo` if readiness checks or verification steps fail.

---

## 💡 Innovation Challenge Report

1. **Dynamic Responsive Dark/Light Theme Token System**: Seamless user experience adjustment using CSS root custom variables.
2. **Real-time Live Analytics & Metric Charts**: Interactive visualization of event sales and ticket distribution built with lightweight pure CSS animations.
3. **Zero-Downtime Direct Minikube Rollout Automation**: Optimized pipeline executing direct rollout updates and rollback logic natively within Minikube environments.
=======
# Rollback Deployment (if needed)
kubectl rollout undo deployment/event
```
>>>>>>> Stashed changes

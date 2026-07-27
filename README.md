# Smart Event Management Portal (Version 1 - Completed)

**Author**: Dhriti Gupta  
**Project**: DevOps Capstone Project - ABC Solutions Pvt. Ltd.

---

## 📌 Project Status
**Completed Version**: **Version 1 (`v1.0`)**

---

## 🚀 Summary of What Was Built

### 1. Web Application (`v1.0`)
- **Interactive Event Management SPA**: Modern responsive Web Application.
- **User Authentication**: Registration & Login workflow (Strict rule: Users must register before logging in).
- **Single System Admin**: System Admin account (`admin@event.com`) with exclusive privileges to access the Admin Management Panel.
- **Event Management (Admin)**: Full capability for Admin to **Add**, **Edit**, and **Delete** events in real-time.
- **Ticket Booking System**: Interactive seat selection, live price calculation, and ticket booking confirmation.
- **Interactive My Bookings Section**: Redesigned Ticket Stub cards featuring ticket ID badges and summary breakdowns.
- **Animations & Aesthetics**:
  - Modal Shake animation (`modalShake`) when an unauthenticated user attempts to book tickets.
  - Celebration Success Burst overlay (`successPop` & `pulseCheck`) upon ticket confirmation.
  - Card entrance spring animations, shimmer light sweeps on hover, and logo pulsing.
  - 6 distinct non-green color category badges (Tech, Security, Music, Design, Business, Crypto).
  - Merged Hero section purple gradient across Navbar and Footer.
  - Footer strictly displaying: `Made By Dhriti Gupta`.

### 2. DevOps & Infrastructure Setup
- **Express Production Server**: `server.js` serving static files with `/healthz` and `/api/version` endpoints for Kubernetes probes.
- **Docker Containerization**: Standardized `Dockerfile` built on `node:20` exposing port 3000.
- **Minikube Deployment Support**: Automated commands for creating deployments, exposing NodePort services, scaling replicas, rolling updates, and rollbacks.
- **Jenkins CI/CD Pipeline**: Declarative `Jenkinsfile` automating Checkout, `npm test`, Docker Build/Push, and direct Minikube deployment/rollback.
- **Automated Testing**: `test/app.test.js` sanity suite verified via `npm test`.

---

## 🛠️ Step-by-Step Running Guide

### 1. Run Node.js Application Locally
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
docker build -t eventportal:v1 .

# Run Container Locally
docker run -d -p 3000:3000 --name eventportal_v1 eventportal:v1
```

---

### 3. Minikube Kubernetes Commands (Imperative CLI Deployment)
```bash
# Start Minikube Cluster
minikube start

# Create Deployment on Minikube
kubectl create deployment eventportal --image=eventportal:v1

# Expose Deployment on NodePort Service
kubectl expose deployment eventportal --type=NodePort --port=3000

# Get Service URL
minikube service eventportal

# Scale Replicas
kubectl scale deployment/eventportal --replicas=3

# Rollback Deployment (if needed)
kubectl rollout undo deployment/eventportal
```

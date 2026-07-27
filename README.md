# Smart Event Management Portal - DevOps CI/CD Deployment Project

![EventPortal Banner](https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80)

## Overview
**Smart Event Management Portal** is an end-to-end containerized web application built for **ABC Solutions Pvt. Ltd.** to modernize and automate event bookings, user management, analytics, and deployments using **Docker**, **Minikube (Kubernetes)**, and **Jenkins CI/CD Pipelines**.

---

## 🌟 Version Features Breakdown

### 🔹 Version 1 (`v1` - Core Foundation)
- User Authentication (Login & Registration modal workflow).
- Event Browsing & Ticket Booking system.
- User Booking History & Admin Management Panel (Add/Delete Events).
- Base Dockerfile (`eventportal:v1`), Minikube deployment, and automated test suite.

### 🌓 Version 2 (`v2` - Theme & Search Filtering)
- Dynamic **Light / Dark Mode Theme Switcher** with smooth CSS transitions.
- Real-time **Event Search** bar & **Category Filter Pills** (Tech, Music, Design, Business).
- Docker image tag `eventportal:v2` with zero-downtime rolling updates in Minikube.

### 📊 Version 3 (`v3` - Analytics & Innovation Features)
- **Live Analytics Dashboard**: Visual ticket revenue metrics & animated CSS distribution charts.
- **Interactive Toast Notification System**: Instant feedback for bookings and user actions.
- Docker image tag `eventportal:v3` & automated rollback pipeline integration.

---

## 🚀 Quickstart - Running Locally

### 1. Install & Run Node.js App
```bash
npm install
npm test
npm start
```
Access the application at `http://localhost:3000`.

---

## 🐳 Phase 2 - Docker Commands & Execution

### Task 1: Build Docker Image (v1, v2, v3)
```bash
# Build Version 1
docker build -t eventportal:v1 --build-arg APP_VERSION=v1 .

# Build Version 2
docker build -t eventportal:v2 --build-arg APP_VERSION=v2 .

# Build Version 3
docker build -t eventportal:v3 --build-arg APP_VERSION=v3 .
```

### Task 2: Run Container
```bash
docker run -d -p 3000:3000 --name eventportal eventportal:v1
```

### Task 3: Container Management Commands
```bash
docker ps                   # List running containers
docker logs eventportal     # View container logs
docker inspect eventportal  # Inspect container metadata
docker exec -it eventportal sh  # Execute interactive shell inside container
docker stop eventportal    # Stop container
docker rm eventportal      # Remove container
```

---

## ☸️ Phase 3 - Minikube Deployment (Direct Commands)

As requested, deployments are managed directly using **Minikube CLI / `kubectl` imperative commands** (without standalone static `.yaml` manifest files):

### 1. Start Minikube Cluster
```bash
minikube start
```

### 2. Create Deployment & Service in Minikube
```bash
# Create deployment using v1 image
kubectl create deployment eventportal --image=eventportal:v1

# Expose deployment on NodePort
kubectl expose deployment eventportal --type=NodePort --port=3000

# View service URL in Minikube
minikube service eventportal --url
```

### 3. Scaling Replicas (High Traffic Simulation)
```bash
kubectl scale deployment/eventportal --replicas=3
kubectl scale deployment/eventportal --replicas=5
kubectl get pods -w
```

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

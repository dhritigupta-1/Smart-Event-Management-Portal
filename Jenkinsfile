pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dhritigupta/eventportal'
        IMAGE_TAG = 'v1'
        DOCKER_HUB_CREDENTIALS_ID = 'docker-hub-credentials'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out source code from Git repository...'
                checkout scm
            }
        }

        stage('Install Dependencies & Test') {
            steps {
                echo 'Running automated tests...'
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${DOCKER_IMAGE}:${IMAGE_TAG}"
                sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} --build-arg APP_VERSION=${IMAGE_TAG} ."
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                echo "Pushing Docker image to registry..."
                withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${DOCKER_IMAGE}:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy to Minikube Kubernetes') {
            steps {
                echo "Deploying version ${IMAGE_TAG} directly using Minikube CLI..."
                // Step 1: Run image in Minikube deployment or update image tag
                sh "kubectl create deployment eventportal --image=${DOCKER_IMAGE}:${IMAGE_TAG} --dry-run=client -o yaml | kubectl apply -f -"
                
                // Step 2: Expose deployment via NodePort service if not already created
                sh "kubectl expose deployment eventportal --type=NodePort --port=3000 --dry-run=client -o yaml | kubectl apply -f -"
                
                // Step 3: Set image update for rolling updates
                sh "kubectl set image deployment/eventportal eventportal=${DOCKER_IMAGE}:${IMAGE_TAG}"
            }
        }

        stage('Verify Minikube Deployment') {
            steps {
                echo 'Verifying rollout status on Minikube...'
                sh 'kubectl rollout status deployment/eventportal --timeout=60s'
                sh 'kubectl get pods -l app=eventportal'
                sh 'kubectl get svc eventportal'
            }
        }
    }

    post {
        failure {
            echo '⚠️ Deployment failed! Triggering automated rollback on Minikube...'
            sh 'kubectl rollout undo deployment/eventportal'
        }
        success {
            echo '🎉 CI/CD Pipeline executed successfully! App is running on Minikube.'
        }
    }
}

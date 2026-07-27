pipeline {
    agent any

    environment {
        IMAGE_NAME = 'event'
        IMAGE_TAG = 'v1'
        DOCKER_HUB_REPO = 'dhritigupta/event'
        DOCKER_HUB_CREDENTIALS_ID = 'Docker_Login'
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
                echo "Building Docker image: ${DOCKER_HUB_REPO}:${IMAGE_TAG}"
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                echo "Pushing Docker image to registry: ${DOCKER_HUB_REPO}:${IMAGE_TAG}..."
                withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${DOCKER_HUB_REPO}:${IMAGE_TAG}"
                }
            }
        }

        stage('Check Kubernetes Connection') {
    steps {
        sh '''
        echo "===== USER ====="
        whoami

        echo "===== HOME ====="
        echo $HOME

        echo "===== KUBECONFIG ====="
        echo $KUBECONFIG

        echo "===== CONTEXT ====="
        kubectl config current-context || true

        echo "===== CONFIG ====="
        kubectl config view || true

        echo "===== NODES ====="
        kubectl get nodes || true

        echo "===== CLUSTER INFO ====="
        kubectl cluster-info || true
        '''
    }
}

       stage('Deploy to Minikube Kubernetes') {
    steps {
        script {
            sh """
            kubectl get deployment ${IMAGE_NAME} || \
            kubectl create deployment ${IMAGE_NAME} --image=${DOCKER_HUB_REPO}:${IMAGE_TAG}

            kubectl get service ${IMAGE_NAME} || \
            kubectl expose deployment ${IMAGE_NAME} --type=NodePort --port=3000

            kubectl set image deployment/${IMAGE_NAME} ${IMAGE_NAME}=${DOCKER_HUB_REPO}:${IMAGE_TAG}

            kubectl rollout status deployment/${IMAGE_NAME}
            """
        }
    }
}

        stage('Verify Minikube Deployment') {
            steps {
                echo 'Verifying rollout status on Minikube...'
                sh "kubectl rollout status deployment/${IMAGE_NAME} --timeout=60s"
                sh "kubectl get pods -l app=${IMAGE_NAME}"
                sh "kubectl get svc ${IMAGE_NAME}"
            }
        }
    }

    post {
        failure {
            echo '⚠️ Deployment failed! Triggering automated rollback on Minikube...'
            sh "kubectl rollout undo deployment/${IMAGE_NAME}"
        }
        success {
            echo '🎉 CI/CD Pipeline executed successfully! App is running on Minikube.'
        }
    }
}
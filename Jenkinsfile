pipeline {
  agent any
  environment {
    IMAGE_NAME = "medlab-sample:latest"
    DOCKER_REPO = "your-dockerhub-username/medlab-sample"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install') {
      steps {
        sh 'node -v || true'
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          sh "docker build -t ${IMAGE_NAME} ."
        }
      }
    }
    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh """
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker tag ${IMAGE_NAME} ${DOCKER_REPO}:latest
            docker push ${DOCKER_REPO}:latest
          """
        }
      }
    }
    stage('Archive') {
      steps {
        archiveArtifacts artifacts: '**/*', fingerprint: true
      }
    }
  }
  post {
    always {
      junit allowEmptyResults: true, testResults: 'reports/**/*.xml'
    }
  }
}

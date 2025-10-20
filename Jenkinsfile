pipeline {
  agent any
  environment {
    IMAGE_NAME = "medlab-sample:latest"
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
          sh "docker build -t ${IMAGE_NAME} . || true"
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

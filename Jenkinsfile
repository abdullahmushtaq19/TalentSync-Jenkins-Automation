// Jenkins Declarative Pipeline for TalentSync
// Requirements:
// - Create a Jenkins "Secret text" credential with ID: MONGO_URL (or change below)
// - Jenkins node must have Docker and docker-compose installed and the Jenkins user in the docker group
// - Keep this repository checked out by Jenkins (Checkout stage)

pipeline {
  agent any
  environment {
    COMPOSE_FILE = 'docker-compose.jenkins.yml'
  }
  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
    timeout(time: 30, unit: 'MINUTES')
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Prepare .env from Jenkins Credentials') {
      steps {
        // Store MONGO_URL securely in Jenkins and bind it here
        withCredentials([string(credentialsId: 'MONGO_URL', variable: 'MONGO_URL')]) {
          sh '''
            echo "MONGO_URL=$MONGO_URL" > .env
            chmod 600 .env || true
            echo ".env file created"
          '''
        }
      }
    }

    stage('Build frontend') {
      steps {
        dir('client') {
          sh '''
            npm ci --prefer-offline --no-audit --progress=false
            npm run build
          '''
        }
      }
    }

    stage('Install backend deps') {
      steps {
        dir('server') {
          sh 'npm ci --prefer-offline --no-audit --progress=false'
        }
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        sh '''
          docker-compose -f ${COMPOSE_FILE} down --remove-orphans || true
          docker-compose -f ${COMPOSE_FILE} pull || true
          docker-compose -f ${COMPOSE_FILE} up -d --build
        '''
      }
    }
  }
  post {
    always {
      echo 'Pipeline finished — fetching container statuses'
      sh 'docker ps --format "{{.Names}}\t{{.Status}}\t{{.Ports}}" || true'
      archiveArtifacts allowEmptyArchive: true, artifacts: 'client/build/**', fingerprint: true
    }
    success {
      echo 'Deployment successful.'
    }
    failure {
      echo 'Deployment failed — check logs.'
    }
  }
}
pipeline {
  agent any
  environment {
    COMPOSE = "docker compose -f docker-compose.jenkins.yml"
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Up (mount code)') {
      steps {
        sh "${COMPOSE} pull || true"
        sh "${COMPOSE} up -d --remove-orphans"
      }
    }
    stage('Smoke test') {
      steps {
        sh 'sleep 6'
        sh 'curl -f http://localhost:8080 || (echo "Frontend failed" && exit 1)'
        sh 'curl -f http://localhost:5100/api/health || true' // change endpoint as available
      }
    }
  }
  post {
    failure { sh "${COMPOSE} logs --no-color > jenkins_compose_logs.txt || true"; archiveArtifacts artifacts: 'jenkins_compose_logs.txt' }
  }
}

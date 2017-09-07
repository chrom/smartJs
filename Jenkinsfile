pipeline {
  agent {
    docker {
      image 'docker'
    }
    
  }
  stages {
    stage('init') {
      steps {
        sh '''pwd
ls -la
docker -v'''
      }
    }
    stage('nginx') {
      steps {
        sh '''docker run --name nginx -d nginx
'''
      }
    }
  }
}
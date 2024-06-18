pipeline {
    agent any

    environment {
        NODE_VERSION = '18.13.0'
    }
    stages {
        stage("Cleanup Workspace") {
            steps {
                cleanWs()
            }
        }

        stage("Checkout from SCM") {
            steps {
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/azizmahjoubi/FullStackPFE'
            }
        }
   stage("Verify Workspace") {
            steps {
                sh 'ls -l' // List the contents of the root directory
                sh 'ls -l angular' // List the contents of the angular directory
                sh 'ls -l express' // List the contents of the backend directory
            }
        }
        stage("Build Angular Application") {
            steps {
                dir('angular') {
                    sh 'npm install'
                    sh 'npm run build' // Ensure this script is defined in frontend/package.json
                }
            }
        }

        stage("Install Dependencies for Express") {
            steps {
                dir('express') {
                    sh 'npm install'
                }
            }
        }

        stage("Test Application") {
            steps {
                dir('express') {
                    sh 'npm test' // Ensure this script is defined in backend/package.json
                }
            }
        }

        stage("Start Express Server") {
            steps {
                dir('express') {
                    sh 'npm start' // Ensure this script is defined in backend/package.json
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
    }
}

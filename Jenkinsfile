pipeline {
    agent any

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

        stage("Build Angular Application") {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build' // Ensure this script is defined in frontend/package.json
                }
            }
        }

        stage("Install Dependencies for Express") {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage("Test Application") {
            steps {
                dir('backend') {
                    sh 'npm test' // Ensure this script is defined in backend/package.json
                }
            }
        }

        stage("Start Express Server") {
            steps {
                dir('backend') {
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

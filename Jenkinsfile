pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'http://192.168.33.10:9000'
        SONARQUBE_LOGIN = 'jenkins-sonarqube-token'
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
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/azizmahjoubi/FullStackPFE.git'
            }
        }

        stage("Verify Workspace") {
            steps {
                sh 'ls -l' // List the contents of the root directory
                sh 'ls -l angular' // List the contents of the angular directory
                sh 'ls -l express' // List the contents of the express directory
            }
        }

        stage("Setup Node.js") {
            steps {
                sh '''
                    # Install nvm if not already installed
                    if ! command -v nvm &> /dev/null
                    then
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    fi
                    # Use the specified Node.js version
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    node -v
                    npm -v
                '''
            }
        }

        stage("Build Angular Application") {
            steps {
                dir('angular') {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}
                        npm install
                        npm run build
                    '''
                }
            }
        }

        stage("Install Dependencies for Express") {
            steps {
                dir('express') {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}
                        npm install
                    '''
                }
            }
        }

        stage("Test Application") {
            steps {
                dir('express') {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}
                        npm test
                    '''
                }
            }
        }
stage("SonarQube Analysis") {
    steps {
        script {
            withSonarQubeEnv('sonarqube-server') {
                dir('express') {
                    sh 'npx sonar-scanner -X'
                }
            }
        }
    }
}

        stage("Start Express Server") {
            steps {
                dir('express') {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}
                        npm start
                    '''
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

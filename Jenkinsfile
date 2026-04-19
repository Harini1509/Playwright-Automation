pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    parameters {
        choice(
            name: 'PARALLEL_WORKERS',
            choices: ['1', '2', '4'],
            description: 'Number of parallel workers'
        )
        booleanParam(
            name: 'HEADLESS_MODE',
            defaultValue: true,
            description: 'Run tests in headless mode'
        )
    }

    environment {
        NODE_ENV         = 'test'
        PARALLEL_WORKERS = "${params.PARALLEL_WORKERS}"
        HEADLESS         = "${params.HEADLESS_MODE}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out repository...'
                deleteDir()
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    extensions: [[$class: 'CloneOption', noTags: false, reference: '', shallow: false]],
                    userRemoteConfigs: [[url: 'https://github.com/Harini1509/Playwright-Automation.git']]
                ])
                echo 'Checkout done'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat '''
                    node -v
                    npm -v
                    npm install
                    npx playwright install --with-deps
                '''
            }
        }

        stage('Update Cucumber Config') {
            steps {
                echo 'Updating cucumber.js parallel workers...'
                script {
                    def config = readFile('cucumber.js')
                    config = config.replaceAll(/parallel:\s*\d+/, "parallel: ${env.PARALLEL_WORKERS}")
                    writeFile file: 'cucumber.js', text: config
                    bat 'type cucumber.js'
                }
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                echo 'Running tests...'
                bat '''
                    echo Workers: %PARALLEL_WORKERS%
                    echo Headless: %HEADLESS%
                    npx cucumber-js || exit 0
                '''
            }
        }

        stage('Generate Report') {
            steps {
                echo 'Generating HTML report...'
                bat 'node generate-report.js'
            }
        }

        stage('Archive Results') {
            steps {
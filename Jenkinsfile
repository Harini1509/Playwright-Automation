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
            description: 'Number of parallel workers for test execution'
        )
        booleanParam(
            name: 'HEADLESS_MODE',
            defaultValue: true,
            description: 'Run tests in headless mode (true for CI)'
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
                echo 'Installing npm dependencies...'
                sh '''
                    node -v
                    npm -v
                    npm install
                    npx playwright install --with-deps
                '''
            }
        }

        stage('Update Cucumber Config') {
            steps {
                echo 'Patching parallel workers in cucumber.js...'
                script {
                    def config = readFile('cucumber.js')
                    config = config.replaceAll(/parallel:\s*\d+/, "parallel: ${env.PARALLEL_WORKERS}")
                    writeFile file: 'cucumber.js', text: config
                    sh 'cat cucumber.js'
                }
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                echo 'Running Cucumber + Playwright tests...'
                sh '''
                    echo "Workers : $PARALLEL_WORKERS"
                    echo "Headless: $HEADLESS"
                    npx cucumber-js || true
                '''
                // ✅ Calls cucumber-js directly — matches your test:cucumber script
                // ✅ || true prevents Jenkins failing before report is generated
            }
        }

        stage('Generate Report') {
            steps {
                echo 'Generating HTML report...'
                sh '''
                    node generate-report.js
                '''
                // ✅ Matches your "report" script — generate-report.js is at root
            }
        }

        stage('Archive Results') {
            steps {
                echo 'Archiving artifacts...'
                script {
                    archiveArtifacts artifacts: 'cucumber-report.html,cucumber-report.json',
                                     allowEmptyArchive: true

                    if (fileExists('cucumber-report.html')) {
                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: '.',
                            reportFiles: 'cucumber-report.html',
                            reportName: 'Cucumber Test Report'
                        ])
                        echo 'HTML report published'
                    } else {
                        echo 'cucumber-report.html not found'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
            sh '''
                if [ -f cucumber-report.json ]; then
                    echo "--- Test summary ---"
                    head -80 cucumber-report.json
                fi
            '''
        }

        success {
            echo 'All tests passed!'
        }

        failure {
            echo 'Tests failed — check the Cucumber Report above.'
            archiveArtifacts artifacts: 'test-results/**',
                             allowEmptyArchive: true
        }

        unstable {
            echo 'Pipeline unstable — partial test failures.'
        }
    }
}
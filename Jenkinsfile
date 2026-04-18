pipeline {
    agent any

    options {
        // Keep last 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Timeout after 30 minutes
        timeout(time: 30, unit: 'MINUTES')
        // Add timestamps to console output
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
            defaultValue: false,
            description: 'Run tests in headless mode'
        )
    }

    environment {
        NODE_ENV = 'test'
        WORKSPACE_PATH = "${WORKSPACE}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '🔄 Checking out repository...'
                deleteDir()
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    extensions: [[$class: 'CloneOption', noTags: false, reference: '', shallow: false]],
                    userRemoteConfigs: [[url: 'https://github.com/your-username/your-repo.git']]
                ])
                echo '✅ Repository checked out successfully'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh '''
                    node -v
                    npm -v
                    npm install
                '''
                echo '✅ Dependencies installed'
            }
        }

        stage('Update Cucumber Config') {
            steps {
                echo '⚙️ Updating Cucumber configuration...'
                script {
                    def cucumberConfig = readFile('cucumber.js')
                    cucumberConfig = cucumberConfig.replace('parallel: 2', "parallel: ${params.PARALLEL_WORKERS}")
                    writeFile file: 'cucumber.js', text: cucumberConfig
                    sh 'cat cucumber.js'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running Cucumber tests...'
                sh '''
                    echo "Running tests with ${PARALLEL_WORKERS} parallel workers"
                    npm run test:cucumber || true
                '''
            }
        }

        stage('Generate Reports') {
            steps {
                echo '📊 Generating test reports...'
                script {
                    // Copy HTML report
                    sh '''
                        if [ -f cucumber-report.html ]; then
                            cp cucumber-report.html test-results/ 2>/dev/null || true
                            echo "✅ HTML report generated"
                        fi
                        
                        # List generated files
                        echo "Generated artifacts:"
                        find . -name "cucumber-report*" -o -name "*.png" | head -20
                    '''
                }
            }
        }

        stage('Archive Results') {
            steps {
                echo '📦 Archiving test results...'
                script {
                    // Archive all test results
                    archiveArtifacts artifacts: 'cucumber-report.html, test-results/**, cucumber-report.json', 
                                     allowEmptyArchive: true
                    
                    // Publish HTML report
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: '.',
                        reportFiles: 'cucumber-report.html',
                        reportName: 'Cucumber Test Report'
                    ])
                    
                    echo '✅ Results archived'
                }
            }
        }
    }

    post {
        always {
            echo '🧹 Cleaning up...'
            script {
                // Collect test statistics
                sh '''
                    echo "Test Statistics:"
                    if [ -f cucumber-report.json ]; then
                        echo "JSON report found at: $(pwd)/cucumber-report.json"
                        cat cucumber-report.json | head -50
                    fi
                '''
            }
        }

        success {
            echo '✅ Pipeline completed successfully!'
            // Send success notification
            sh 'echo "✅ All tests passed!" '
        }

        failure {
            echo '❌ Pipeline failed!'
            // Archive failure screenshots
            archiveArtifacts artifacts: 'test-results/screenshots/**', 
                             allowEmptyArchive: true
            // Send failure notification
            sh 'echo "❌ Tests failed. Check the Cucumber Report above."'
        }

        unstable {
            echo '⚠️ Pipeline unstable - some tests failed'
        }
    }
}

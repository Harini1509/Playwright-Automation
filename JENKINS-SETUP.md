# Jenkins Integration Guide

## Overview
This document explains how to set up and configure Jenkins to run the Cucumber automated tests in parallel.

## Prerequisites

### Jenkins Installation
- Jenkins 2.380+ (or latest LTS)
- Java 11+ installed on Jenkins agent
- Node.js 16+ installed on Jenkins agent
- npm 8+ installed

### Jenkins Plugins Required
Install these plugins via `Manage Jenkins → Plugin Manager`:

1. **Pipeline** (if not already installed)
2. **Git** (for repository checkout)
3. **Pipeline Graph Analysis Plugin**
4. **HTML Publisher Plugin** (for Cucumber reports)
5. **Node and Label parameter plugin** (optional)

## Setup Steps

### Step 1: Create New Pipeline Job

1. Go to Jenkins Dashboard
2. Click **New Item**
3. Enter job name: `Playwright-Cucumber-Tests`
4. Select **Pipeline**
5. Click **OK**

### Step 2: Configure Pipeline

1. **General Tab:**
   - Enable: "This project is parameterized"
   - Add parameters:
     - `PARALLEL_WORKERS` (Choice: 1, 2, 4)
     - `HEADLESS_MODE` (Boolean)

2. **Pipeline Tab:**
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/your-username/your-repo.git`
   - Branch: `*/main` (or your branch)
   - Script Path: `Jenkinsfile`

3. Click **Save**

### Step 3: Configure in the Jenkinsfile

Update the `Jenkinsfile` with your repository details:

```groovy
userRemoteConfigs: [[url: 'https://github.com/YOUR-USERNAME/YOUR-REPO.git']]
```

## Pipeline Stages

The Jenkinsfile includes these stages:

### 1. **Checkout**
- Clones the repository
- Logs checkout status

### 2. **Install Dependencies**
- Verifies Node.js and npm versions
- Runs `npm install`

### 3. **Update Cucumber Config**
- Updates parallel workers count based on parameter
- Modifies `cucumber.js` configuration

### 4. **Run Tests**
- Executes: `npm run test:cucumber`
- Runs tests with specified parallel workers

### 5. **Generate Reports**
- Verifies Cucumber HTML report generation
- Captures screenshots from failed tests

### 6. **Archive Results**
- Archives HTML reports
- Publishes Cucumber report
- Stores test artifacts

## Running Tests

### Method 1: Manual Trigger
1. Open the Jenkins job
2. Click **Build with Parameters**
3. Select options:
   - **PARALLEL_WORKERS:** Choose 1, 2, or 4
   - **HEADLESS_MODE:** Check to run headless
4. Click **Build**

### Method 2: Scheduled Build (Cron)
1. Go to job configuration
2. Under **Build Triggers**, select **Poll SCM**
3. Set schedule (example - daily at 2 AM):
   ```
   0 2 * * *
   ```
4. Save

### Method 3: Git Webhook (Triggered by Push)
1. Configure webhook in GitHub/GitLab to Jenkins
2. Tests run automatically on every push/PR

## Viewing Reports

### In Jenkins UI
1. Open completed build
2. Look for **Cucumber Test Report** link in build output
3. Click to view interactive HTML report

### Report Locations
- **HTML Report:** `Cucumber Test Report` (Published in Jenkins)
- **JSON Report:** Archived in build artifacts
- **Screenshots:** `test-results/screenshots/` (for failed tests)

## Configuration Examples

### Example 1: Run with 2 Workers
```bash
# Parameter values:
PARALLEL_WORKERS=2
HEADLESS_MODE=false
```

### Example 2: Run Headless with 4 Workers
```bash
# Parameter values:
PARALLEL_WORKERS=4
HEADLESS_MODE=true
```

## Troubleshooting

### Issue: "npm: command not found"
**Solution:** Ensure Node.js is installed on Jenkins agent
```bash
# On Jenkins agent
node -v  # Should show version
npm -v   # Should show version
```

### Issue: Tests timeout
**Solution:** Increase timeout in Jenkinsfile
```groovy
timeout(time: 45, unit: 'MINUTES')  // Increase from 30
```

### Issue: Port already in use
**Solution:** Configure unique port in concurrent builds
```bash
export PORT=8080
export DEBUG_PORT=5900
```

### Issue: Screenshot failures in parallel mode
**Solution:** Reduce parallel workers to 2
```groovy
parallel: 2  // Reduce resource contention
```

## Integration with Slack Notifications

Add to Jenkinsfile to notify Slack:

```groovy
post {
    success {
        slackSend(
            channel: '#automation-tests',
            message: "✅ Cucumber Tests PASSED\n" +
                     "Job: ${JOB_NAME}\n" +
                     "Build: ${BUILD_NUMBER}",
            color: 'good'
        )
    }
    failure {
        slackSend(
            channel: '#automation-tests',
            message: "❌ Cucumber Tests FAILED\n" +
                     "Job: ${JOB_NAME}\n" +
                     "Build: ${BUILD_NUMBER}",
            color: 'danger'
        )
    }
}
```

## Integration with Email Notifications

Add to Jenkinsfile:

```groovy
post {
    always {
        emailext(
            subject: "Build ${BUILD_NUMBER}: ${BUILD_STATUS}",
            body: '''
                ${DEFAULT_CONTENT}
                
                Test Report: ${BUILD_URL}Cucumber_Test_Report/
            ''',
            to: 'team@example.com',
            attachmentsPattern: 'cucumber-report.json'
        )
    }
}
```

## Performance Tuning

### For Faster Execution (Parallel Mode)
```groovy
parallel: 4  // Maximum 4 workers
timeout(time: 45, unit: 'MINUTES')
```

### For Stability (Sequential Mode)
```groovy
parallel: 1  // Run tests one by one
timeout(time: 30, unit: 'MINUTES')
```

## Maintenance

### Clean Old Builds
Configure in Jenkins:
1. Job Configuration → **Discard old builds**
2. Set: "Keep builds for 30 days"
3. Max builds to keep: 10

### Monitor Logs
- Jenkins Console Output: Real-time logs during build
- Jenkins System Log: Server-level diagnostics

## Best Practices

✅ **DO:**
- Run tests in parallel (2-4 workers)
- Archive reports after each run
- Monitor test trends over time
- Set up notifications for failures
- Use parameterized builds

❌ **DON'T:**
- Run with parallel: 0 (invalid)
- Set extremely high timeouts (>1 hour)
- Archive large video files
- Run tests on limited hardware with 4+ workers

## Next Steps

1. ✅ Push Jenkinsfile to repository
2. ✅ Create Jenkins pipeline job
3. ✅ Configure webhook (or schedule)
4. ✅ Run first build
5. ✅ Monitor reports and logs
6. ✅ Set up notifications

## Support

For issues or questions:
- Check build logs in Jenkins
- Review Cucumber report for test failures
- Check screenshots in `test-results/screenshots/`

---

**Ready to integrate with Jenkins?** 🚀

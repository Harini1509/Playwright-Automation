# Quick Start Guide

## Local Development

### Install Dependencies
```bash
npm install
```

### Run Tests

**Sequential (Default):**
```bash
npm run test:cucumber
```

**Parallel Mode:**
```bash
# Edit cucumber.js and change: parallel: 2
npm run test:cucumber
```

### View Reports
```bash
# Open in browser
open cucumber-report.html  # macOS
start cucumber-report.html # Windows
```

## Jenkins Setup

### 1. Prerequisites Checklist
- [ ] Node.js 16+ installed on Jenkins agent
- [ ] npm 8+ installed
- [ ] Git installed
- [ ] HTML Publisher Plugin installed
- [ ] Pipeline Plugin installed

### 2. Quick Setup
1. Create new **Pipeline** job in Jenkins
2. Configure SCM to point to your Git repository
3. Set script path to `Jenkinsfile`
4. Save and build!

### 3. Run from Jenkins
Click **Build with Parameters** and choose:
- **PARALLEL_WORKERS:** 2 (recommended)
- **HEADLESS_MODE:** false

### 4. View Results
After build completes:
1. Scroll to **Cucumber Test Report**
2. Click on report link
3. View test results and screenshots

## File Structure

```
📁 Playwright/
├── 📄 Jenkinsfile              ← Jenkins pipeline configuration
├── 📄 cucumber.js              ← Cucumber configuration
├── 📄 package.json             ← Dependencies
├── 📁 features/
│   └── 📄 purchase.feature     ← Test scenarios (BDD)
├── 📁 step-definitions/
│   ├── 📁 hooks/
│   │   └── 📄 hooks.js         ← Before/After hooks
│   ├── 📄 purchase.steps.js    ← Step implementations
│   └── 📄 testDataHelper.js    ← Test data utilities
├── 📁 test-data/
│   └── 📄 test-data.json       ← Test input data
├── 📁 Pages/                   ← Page Object Model classes
├── 📄 JENKINS-SETUP.md         ← Detailed Jenkins guide
└── 📄 README.md                ← Project documentation
```

## Command Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run test:cucumber` | Run all tests |
| `npm run test:cucumber -- --dry-run` | Validate feature files |
| `npm run test:cucumber -- features/purchase.feature` | Run single feature |

## Configuration Files

### cucumber.js
Controls how tests run:
- `parallel: 1` - Sequential execution
- `parallel: 2` - 2 tests at a time
- `timeout: 90000` - 90 seconds per step

### test-data/test-data.json
All test input data centralized:
- User credentials
- Product names
- URLs
- Expected results

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Tests timeout | Increase timeout in cucumber.js |
| Parallel fails | Reduce parallel workers to 1 |
| npm not found | Install Node.js on agent |
| Port in use | Configure unique port number |
| Screenshot fails | Run in single-threaded mode |

## Performance

- **Sequential:** ~2-3 minutes for 3 scenarios
- **Parallel (2):** ~1-2 minutes for 3 scenarios
- **Parallel (4):** ~1 minute but may timeout

**Recommended:** Use parallel: 2 for balance

## Test Results

Tests produce:
- ✅ **cucumber-report.html** - Interactive test report
- ✅ **cucumber-report.json** - Machine-readable results
- 📸 **screenshots/** - Failure screenshots
- 📊 **progress-bar** - Console output

## Next Steps

1. [ ] Clone/setup repository locally
2. [ ] Run `npm install`
3. [ ] Run `npm run test:cucumber` locally
4. [ ] Verify tests pass
5. [ ] Set up Jenkins job
6. [ ] Configure parameters
7. [ ] Run from Jenkins
8. [ ] View reports

---

**Issues?** Check [JENKINS-SETUP.md](JENKINS-SETUP.md) for detailed troubleshooting.

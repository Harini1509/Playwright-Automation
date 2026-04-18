const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: './test-results',
  reportPath: './test-results/html-report',
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest',
    },
    device: 'Local test machine',
    platform: {
      name: 'windows',
      version: '11',
    },
  },
  customData: {
    title: 'Test Execution Info',
    data: [
      { label: 'Project', value: 'Playwright Automation' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Date', value: new Date().toLocaleString() },
    ],
  },
  pageTitle: 'Playwright Cucumber Test Report',
  reportName: 'E2E Test Report',
  displayDuration: true,
  durationInMS: true,
});

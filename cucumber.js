module.exports = {
  default: {
    require: ['step-definitions/**/*.js', 'step-definitions/hooks/**/*.js'],
    format: [
      'progress-bar',
      'html:cucumber-report.html',
      'json:test-results/cucumber-report.json',
    ],
    formatOptions: {
      snippetInterface: 'async-await',
    },
    parallel: 2, // Run 2 scenarios in parallel
    strict: true,
    timeout: 90000, // 90 seconds per step
  },
};

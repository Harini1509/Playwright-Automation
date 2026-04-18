/**
 * Logger utility for consistent logging
 */

class Logger {
  static INFO = '📝';
  static SUCCESS = '✅';
  static ERROR = '❌';
  static WARNING = '⚠️';
  static STEP = '🔄';
  static ACTION = '👉';
  static WAIT = '⏳';
  static CHECK = '🔍';
  static DATA = '📊';

  /**
   * Log info message
   */
  static info(message) {
    console.log(`${this.INFO} [INFO] ${message}`);
  }

  /**
   * Log success message
   */
  static success(message) {
    console.log(`${this.SUCCESS} [SUCCESS] ${message}`);
  }

  /**
   * Log error message
   */
  static error(message, error = null) {
    if (error) {
      console.error(`${this.ERROR} [ERROR] ${message}:`, error);
    } else {
      console.error(`${this.ERROR} [ERROR] ${message}`);
    }
  }

  /**
   * Log warning message
   */
  static warning(message) {
    console.warn(`${this.WARNING} [WARNING] ${message}`);
  }

  /**
   * Log step message
   */
  static step(message) {
    console.log(`${this.STEP} [STEP] ${message}`);
  }

  /**
   * Log action message
   */
  static action(message) {
    console.log(`${this.ACTION} [ACTION] ${message}`);
  }

  /**
   * Log wait message
   */
  static wait(message) {
    console.log(`${this.WAIT} [WAIT] ${message}`);
  }

  /**
   * Log check message
   */
  static check(message) {
    console.log(`${this.CHECK} [CHECK] ${message}`);
  }

  /**
   * Log data message
   */
  static data(message, data) {
    console.log(`${this.DATA} [DATA] ${message}`, data);
  }

  /**
   * Log section separator
   */
  static section(title) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`  ${title}`);
    console.log(`${'='.repeat(60)}\n`);
  }
}

module.exports = Logger;

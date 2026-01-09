import { LogLevel } from "./LogLevel";

/**
 * Generate a consistent HSL color from a namespace string
 */
const namespaceToColor = (namespace: string): string => {
  let hash = 0;
  for (let i = 0; i < namespace.length; i++) {
    hash = namespace.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 45%)`;
};

/**
 * Replace {} placeholders with arguments
 * e.g., formatMessage("User {} logged in from {}", "john", "mobile")
 *       => "User john logged in from mobile"
 */
const formatMessage = (
  message: string,
  args: ReadonlyArray<unknown>
): string => {
  let index = 0;
  return message.replace(/\{\}/g, () => {
    if (index < args.length) {
      const arg = args[index];
      index++;
      // Convert to string representation
      if (arg === null) return "null";
      if (arg === undefined) return "undefined";
      if (typeof arg === "object") {
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    }
    return "{}"; // Keep placeholder if no more args
  });
};

interface LoggerInstance {
  readonly debug: (message: string, ...args: ReadonlyArray<unknown>) => void;
  readonly info: (message: string, ...args: ReadonlyArray<unknown>) => void;
  readonly warn: (message: string, ...args: ReadonlyArray<unknown>) => void;
  readonly error: (message: string, ...args: ReadonlyArray<unknown>) => void;
}

/**
 * Logger class with namespace-based colored logging
 * Supports {} placeholder interpolation:
 *   log.info("User {} logged in from {}", userId, source)
 */
class Logger {
  /* eslint-disable functional/prefer-readonly-type */
  private minLevel: LogLevel = LogLevel.DEBUG;
  /* eslint-enable functional/prefer-readonly-type */
  private readonly loggers = new Map<string, LoggerInstance>();

  /**
   * Set the minimum log level
   * Logs below this level will be ignored
   */
  setLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  /**
   * Get the current log level
   */
  getLevel(): LogLevel {
    return this.minLevel;
  }

  /**
   * Get or create a logger for a specific namespace
   */
  getLogger(namespace: string): LoggerInstance {
    if (!this.loggers.has(namespace)) {
      this.loggers.set(namespace, this.createLogger(namespace));
    }
    return this.loggers.get(namespace)!;
  }

  private createLogger(namespace: string): LoggerInstance {
    const color = namespaceToColor(namespace);
    const namespaceStyle = `color: ${color}; font-weight: bold;`;
    const messageStyle = "color: inherit; font-weight: normal;";

    const log = (
      level: LogLevel,
      consoleMethod: (...args: ReadonlyArray<unknown>) => void,
      message: string,
      ...args: ReadonlyArray<unknown>
    ) => {
      if (level < this.minLevel) return;

      const formattedMessage = formatMessage(message, args);

      consoleMethod(
        `%c${namespace}%c ${formattedMessage}`,
        namespaceStyle,
        messageStyle
      );
    };

    return {
      debug: (message, ...args) =>
        log(LogLevel.DEBUG, console.debug, message, ...args),
      info: (message, ...args) =>
        log(LogLevel.INFO, console.log, message, ...args),
      warn: (message, ...args) =>
        log(LogLevel.WARN, console.warn, message, ...args),
      error: (message, ...args) =>
        log(LogLevel.ERROR, console.error, message, ...args),
    };
  }
}

// Singleton instance
export const logger = new Logger();

// Convenience function
export const getLogger = (namespace: string): LoggerInstance =>
  logger.getLogger(namespace);

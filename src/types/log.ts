export enum LogColor {
  GRAY = 'gray',
  CYAN = 'cyan',
  YELLOW = 'yellow',
  RED = 'red',
}

export enum LogLevel {
  VERBOSE = 'verbose',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}
export interface Log {
  [LogLevel.VERBOSE](...args: unknown[]): void;
  [LogLevel.INFO](...args: unknown[]): void;
  [LogLevel.WARN](...args: unknown[]): void;
  [LogLevel.ERROR](...args: unknown[]): void;
  setLevel(level: LogLevel): void;
}

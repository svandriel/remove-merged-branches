export enum LogColor {
    GRAY = 'gray',
    CYAN = 'cyan',
    YELLOW = 'yellow',
    RED = 'red'
}

export enum LogLevel {
    VERBOSE = 'verbose',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}
export interface Log {
    [LogLevel.VERBOSE](...args: any[]): void;
    [LogLevel.INFO](...args: any[]): void;
    [LogLevel.WARN](...args: any[]): void;
    [LogLevel.ERROR](...args: any[]): void;
    setLevel(level: LogLevel): void;
}

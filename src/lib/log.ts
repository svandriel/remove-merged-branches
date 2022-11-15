import chalk from 'chalk';
import { mapObjIndexed } from 'ramda';

import { Log, LogColor, LogLevel } from '../types/log';

const LEVELS: Record<LogLevel, { color: LogColor; value: number }> = {
    [LogLevel.VERBOSE]: {
        color: LogColor.GRAY,
        value: 0
    },
    [LogLevel.INFO]: {
        color: LogColor.CYAN,
        value: 10
    },
    [LogLevel.WARN]: {
        color: LogColor.YELLOW,
        value: 20
    },
    [LogLevel.ERROR]: {
        color: LogColor.RED,
        value: 30
    }
};

let logLevel = LEVELS[LogLevel.INFO];

const baseLog = (levelName: LogLevel, ...args: any[]) => {
    const level = LEVELS[levelName];
    if (level.value >= logLevel.value) {
        const chalkFunc = chalk[level.color].bind(chalk);
        console.log(chalkFunc(levelName.toUpperCase()), ...args);
    }
};

const loggers = mapObjIndexed((_, level) => {
    return (...args: any[]) => baseLog(level, ...args);
}, LEVELS);

function setLevel(newLevel: LogLevel): void {
    if (!LEVELS[newLevel]) {
        throw new Error(`Invalid log level: ${newLevel}`);
    }
    logLevel = LEVELS[newLevel];
}

export const log: Log = Object.assign(loggers, { setLevel });

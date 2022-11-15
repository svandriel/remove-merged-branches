import chalk from 'chalk';

import { LogLevel } from '../types/log';
import { log } from './log';

test('does not verbose calls by default', () => {
  jest.spyOn(console, 'log');

  log.verbose('w00t');
  expect(console.log).not.toHaveBeenCalled();

  log.info('hi there');
  expect(console.log).toHaveBeenCalledTimes(1);
});

test('logging on verbose level', () => {
  jest.spyOn(console, 'log');

  log.setLevel(LogLevel.VERBOSE);
  log.verbose('Verbose');
  expect(console.log).toHaveBeenCalledWith(chalk.gray('VERBOSE'), 'Verbose');

  log.setLevel(LogLevel.INFO);
  log.verbose('Verbose2');
  expect(console.log).not.toHaveBeenCalledWith(
    chalk.gray('VERBOSE'),
    'Verbose2',
  );

  log.setLevel(LogLevel.WARN);
  log.verbose('Verbose3');
  expect(console.log).not.toHaveBeenCalledWith(
    chalk.gray('VERBOSE'),
    'Verbose3',
  );
});

test('logging on info level', () => {
  jest.spyOn(console, 'log');

  log.setLevel(LogLevel.VERBOSE);
  log.info('Info');
  expect(console.log).toHaveBeenCalledWith(chalk.cyan('INFO'), 'Info');

  log.setLevel(LogLevel.INFO);
  log.info('Info2');
  expect(console.log).toHaveBeenCalledWith(chalk.cyan('INFO'), 'Info2');

  log.setLevel(LogLevel.WARN);
  log.info('Info3');
  expect(console.log).not.toHaveBeenCalledWith(chalk.cyan('INFO'), 'Info3');
});

test('logging on warn level', () => {
  jest.spyOn(console, 'log');

  log.setLevel(LogLevel.INFO);
  log.warn('Warning');
  expect(console.log).toHaveBeenCalledWith(chalk.yellow('WARN'), 'Warning');

  log.setLevel(LogLevel.WARN);
  log.warn('Warning2');
  expect(console.log).toHaveBeenCalledWith(chalk.yellow('WARN'), 'Warning2');

  log.setLevel(LogLevel.ERROR);
  log.warn('Warning3');
  expect(console.log).not.toHaveBeenCalledWith(
    chalk.yellow('WARN'),
    'Warning3',
  );
});

test('logging on error level', () => {
  jest.spyOn(console, 'log');

  log.setLevel(LogLevel.INFO);
  log.error('Error');
  expect(console.log).toHaveBeenCalledWith(chalk.red('ERROR'), 'Error');

  log.setLevel(LogLevel.WARN);
  log.error('Error2');
  expect(console.log).toHaveBeenCalledWith(chalk.red('ERROR'), 'Error2');

  log.setLevel(LogLevel.ERROR);
  log.error('Error3');
  expect(console.log).toHaveBeenCalledWith(chalk.red('ERROR'), 'Error3');
});

test('fails when setting an invalid level', () => {
  expect(() => {
    log.setLevel('debug' as LogLevel);
  }).toThrow('Invalid log level: debug');
});

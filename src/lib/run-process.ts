import chalk from 'chalk';
import { spawn } from 'child_process';

import { RunProcessError, RunProcessOutput } from '../types/run-process';
import { log } from './log';

export function runProcess(
  cmd: string,
  args: string[] = [],
): Promise<RunProcessOutput> {
  return new Promise((resolve, reject) => {
    try {
      log.verbose(`Executing: ${chalk.cyan(`${cmd} ${args.join(' ')}`)}`);
      const proc = spawn(cmd, args);
      let stdout = '';
      let stderr = '';
      proc.stdout.on('data', data => {
        stdout += data;
        logData(false, data);
      });
      proc.stderr.on('data', data => {
        stderr += data;
        logData(true, data);
      });
      proc.on('error', err => {
        reject(err);
      });
      proc.on('exit', code => {
        const output: RunProcessOutput = {
          stdout,
          stderr,
          code: code || 0,
        };
        if (code === 0) {
          resolve({
            stdout,
            stderr,
            code,
          });
        } else {
          const err = new RunProcessError(
            `Process terminated with code ${
              code ?? '<null>'
            }: ${cmd} ${args.join(' ')}`,
            output,
          );
          reject(err);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

function logData(isError: boolean, data: unknown): void {
  const prefix = isError ? '!' : '>';
  const color = isError ? 'red' : 'grey';
  trimEnd(String(data))
    .split('\n')
    .map(line => `${prefix} ${chalk[color](line)}`)
    .forEach(line => {
      log.verbose(line);
    });
}

function trimEnd(str: string): string {
  return str.replace(/\s+$/, '');
}

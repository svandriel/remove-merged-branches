import { RunProcessOutput } from '../types/run-process';
import { runProcess } from './run-process';

export const runGit = (...args: string[]): Promise<RunProcessOutput> =>
  runProcess('git', args);

import { runProcess } from './run-process';

export const runGit = (...args: string[]) => runProcess('git', args);

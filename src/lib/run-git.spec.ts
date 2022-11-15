import { RunProcessOutput } from '../types/run-process';
import { runGit } from './run-git';
import * as stubRunProcess from './run-process';

test('running git', async () => {
  const output: RunProcessOutput = {
    code: 0,
    stdout: 'Yay',
    stderr: 'Oops',
  };
  jest.spyOn(stubRunProcess, 'runProcess').mockResolvedValue(output);

  const procOutput = await runGit('rev-parse', 'HEAD');
  expect(procOutput).toEqual(output);
  expect(stubRunProcess.runProcess).toHaveBeenCalledWith('git', [
    'rev-parse',
    'HEAD',
  ]);
});

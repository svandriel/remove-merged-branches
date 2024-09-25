import * as runProcessModule from '../lib/run-process';
import { getDefaultBranch } from './get-default-branch';

describe('get default branch', () => {
  beforeEach(() => {
    jest.spyOn(runProcessModule, 'runProcess').mockResolvedValue({
      stdout: `* remote origin
  Fetch URL: git@github.com:svandriel/remove-merged-branches.git
  Push  URL: git@github.com:svandriel/remove-merged-branches.git
  HEAD branch: master
  Remote branch:
    master tracked
  Local branch configured for 'git pull':
    master merges with remote master
  Local ref configured for 'git push':
    master pushes to master (up to date)
`,
      stderr: '',
      code: 0,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('parses the default branch', async () => {
    const defaultBranch = await getDefaultBranch();
    expect(defaultBranch).toBe('master');
  });
});

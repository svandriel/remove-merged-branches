import { splitIntoRemoteAndBranch } from './split-into-remote-and-branch';

test('Split into remote and branch', () => {
    expect(splitIntoRemoteAndBranch('origin/master')).toEqual(['origin', 'master']);
    expect(splitIntoRemoteAndBranch('origin/feature/one')).toEqual(['origin', 'feature/one']);
});

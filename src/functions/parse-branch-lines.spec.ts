import { parseBranchLines } from './parse-branch-lines';

test('Parsing branch lines', () => {
    expect(
        parseBranchLines(`* master
    refactor/extract-functions
    remotes/origin/master
    remotes/origin/refactor/extract-functions`)
    ).toEqual(['refactor/extract-functions', 'remotes/origin/master', 'remotes/origin/refactor/extract-functions']);
});

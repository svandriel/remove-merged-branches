import { removeBranchFromList } from './remove-branch-from-list';

test('Remove branch from list', () => {
    expect(removeBranchFromList('master', ['w00t', 'master/master', 'origin/master', 'develop', 'tests'])).toEqual([
        'w00t',
        'develop',
        'tests'
    ]);
});

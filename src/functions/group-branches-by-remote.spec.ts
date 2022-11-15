import { groupBranchesByRemote } from './group-branches-by-remote';

test('Group branches by remote', () => {
    expect(
        groupBranchesByRemote([
            'origin/feature/one',
            'azure/feature/one',
            'origin/feature/two',
            'develop',
            'azure/master',
            'azure/develop'
        ])
    ).toEqual([
        ['origin', ['feature/one', 'feature/two']],
        ['azure', ['feature/one', 'master', 'develop']],
        ['', ['develop']]
    ]);
});

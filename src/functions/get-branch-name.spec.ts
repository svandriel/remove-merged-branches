import { getBranchName } from './get-branch-name';

test('Get branch name with origin', () => {
    expect(getBranchName('origin/feature/winning')).toBe('feature/winning');
});

test('Get branch name without origin', () => {
    expect(getBranchName('winning')).toBe('winning');
});

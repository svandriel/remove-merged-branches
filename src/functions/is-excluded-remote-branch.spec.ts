import { isExcludedRemoteBranch } from './is-excluded-remote-branch';

test('Is excluded remote branch', () => {
    expect(isExcludedRemoteBranch('develop')).toBe(true);
    expect(isExcludedRemoteBranch('dev')).toBe(true);
    expect(isExcludedRemoteBranch('master')).toBe(true);
    expect(isExcludedRemoteBranch('origin/develop')).toBe(true);
    expect(isExcludedRemoteBranch('origin/dev')).toBe(true);
    expect(isExcludedRemoteBranch('origin/master')).toBe(true);
});

test('Is no excluded remote branch', () => {
    expect(isExcludedRemoteBranch('* current')).toBe(false);
    expect(isExcludedRemoteBranch('some/branch')).toBe(false);
    expect(isExcludedRemoteBranch('random-name')).toBe(false);
    expect(isExcludedRemoteBranch('winning/always')).toBe(false);
    expect(isExcludedRemoteBranch('developing')).toBe(false);
    expect(isExcludedRemoteBranch('devving')).toBe(false);
    expect(isExcludedRemoteBranch('mastered')).toBe(false);
});

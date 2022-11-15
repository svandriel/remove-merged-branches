import { isExcludedLocalBranch } from './is-excluded-local-branch';

test('Is excluded local branch', () => {
  expect(isExcludedLocalBranch('develop')).toBe(true);
  expect(isExcludedLocalBranch('dev')).toBe(true);
  expect(isExcludedLocalBranch('master')).toBe(true);
});

test('Is no excluded local branch', () => {
  expect(isExcludedLocalBranch('origin/develop')).toBe(false);
  expect(isExcludedLocalBranch('origin/dev')).toBe(false);
  expect(isExcludedLocalBranch('origin/master')).toBe(false);
  expect(isExcludedLocalBranch('some/branch')).toBe(false);
  expect(isExcludedLocalBranch('random-name')).toBe(false);
  expect(isExcludedLocalBranch('winning/always')).toBe(false);
  expect(isExcludedLocalBranch('developing')).toBe(false);
  expect(isExcludedLocalBranch('devving')).toBe(false);
  expect(isExcludedLocalBranch('mastered')).toBe(false);
});

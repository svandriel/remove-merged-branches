import { isExcludedBranch } from './is-excluded-branch';

test('Is excluded branch', () => {
  expect(isExcludedBranch('* current')).toBe(true);
  expect(isExcludedBranch('origin/develop')).toBe(true);
  expect(isExcludedBranch('origin/dev')).toBe(true);
  expect(isExcludedBranch('origin/master')).toBe(true);
  expect(isExcludedBranch('develop')).toBe(true);
  expect(isExcludedBranch('dev')).toBe(true);
  expect(isExcludedBranch('master')).toBe(true);
});

test('Is no excluded branch', () => {
  expect(isExcludedBranch('some/branch')).toBe(false);
  expect(isExcludedBranch('random-name')).toBe(false);
  expect(isExcludedBranch('winning/always')).toBe(false);
  expect(isExcludedBranch('developing')).toBe(false);
  expect(isExcludedBranch('devving')).toBe(false);
  expect(isExcludedBranch('mastered')).toBe(false);
});

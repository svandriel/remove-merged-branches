import { anyPass, startsWith } from 'ramda';

import { isExcludedLocalBranch } from './is-excluded-local-branch';
import { isExcludedRemoteBranch } from './is-excluded-remote-branch';

export const isExcludedBranch = anyPass([
  startsWith('*'),
  isExcludedLocalBranch,
  isExcludedRemoteBranch,
]);

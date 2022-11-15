import { compose } from 'ramda';

import { getBranchName } from './get-branch-name';
import { isExcludedLocalBranch } from './is-excluded-local-branch';

export const isExcludedRemoteBranch = compose(
  isExcludedLocalBranch,
  getBranchName,
);

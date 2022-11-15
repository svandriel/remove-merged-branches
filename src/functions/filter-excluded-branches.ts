import { either, reject } from 'ramda';

import { isAlias } from './is-alias';
import { isExcludedBranch } from './is-excluded-branch';

export const filterExcludedBranches = reject(either(isExcludedBranch, isAlias));

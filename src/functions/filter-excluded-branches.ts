import { Dictionary, either, reject } from 'ramda';

import { isAlias } from './is-alias';
import { isExcludedBranch } from './is-excluded-branch';

export const filterExcludedBranches: <
  P extends string,
  C extends readonly P[] | Dictionary<P>,
>(
  collection: C,
) => C = reject(either(isExcludedBranch, isAlias));

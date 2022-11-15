import { compose } from 'ramda';

import { filterExcludedBranches } from './filter-excluded-branches';
import { splitLines } from './split-lines';

export const parseBranchLines = compose(filterExcludedBranches, splitLines);

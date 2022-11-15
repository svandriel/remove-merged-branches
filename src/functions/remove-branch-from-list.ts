import { curry, equals, reject } from 'ramda';

import { getBranchName } from './get-branch-name';

export const removeBranchFromList = curry((toRemove: string, list: string[]) =>
    reject(x => equals(toRemove, getBranchName(x)), list)
);

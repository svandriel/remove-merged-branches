import { groupBy, head, map, mapObjIndexed, pipe, toPairs } from 'ramda';

import { splitIntoRemoteAndBranch } from './split-into-remote-and-branch';

export const groupBranchesByRemote = pipe(
    map(splitIntoRemoteAndBranch),
    groupBy<string[]>(head),
    mapObjIndexed(map(list => list[1])),
    toPairs
);

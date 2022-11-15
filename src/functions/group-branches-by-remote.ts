import { groupBy, head, map, mapObjIndexed, pipe, toPairs } from 'ramda';

import { splitIntoRemoteAndBranch } from './split-into-remote-and-branch';

export const groupBranchesByRemote: (
  list: readonly string[],
) => [string, string[]][] = pipe(
  map(splitIntoRemoteAndBranch),
  groupBy<string[]>(head),
  mapObjIndexed(map(list => list[1] as string)),
  x => toPairs(x),
);

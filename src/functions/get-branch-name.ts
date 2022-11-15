import { splitIntoRemoteAndBranch } from './split-into-remote-and-branch';

export const getBranchName = (ref: string): string =>
  splitIntoRemoteAndBranch(ref)[1];

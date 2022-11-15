import { splitIntoRemoteAndBranch } from './split-into-remote-and-branch';

export const getBranchName = (ref: string) => splitIntoRemoteAndBranch(ref)[1];

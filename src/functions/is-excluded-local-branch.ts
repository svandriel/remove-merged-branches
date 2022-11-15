import { __, contains } from 'ramda';

const EXCLUDE_BRANCHES = ['dev', 'master', 'develop'];

export const isExcludedLocalBranch = contains(__, EXCLUDE_BRANCHES);

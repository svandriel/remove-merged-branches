import { __, includes } from 'ramda';

const EXCLUDE_BRANCHES = ['dev', 'master', 'develop'];

export const isExcludedLocalBranch = includes(__, EXCLUDE_BRANCHES);

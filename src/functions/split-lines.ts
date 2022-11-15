import { compose, map, split, trim } from 'ramda';

export const splitLines = compose(map(trim), split('\n'), trim);

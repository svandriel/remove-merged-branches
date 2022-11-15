export const splitIntoRemoteAndBranch = (str: string): [string, string] => {
  const index = str.indexOf('/');
  return index === -1 ? ['', str] : [str.slice(0, index), str.slice(index + 1)];
};

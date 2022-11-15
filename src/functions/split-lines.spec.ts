import { splitLines } from './split-lines';

test('Split lines', () => {
  expect(
    splitLines(`

    One
    Two
    Three

    Four


`),
  ).toEqual(['One', 'Two', 'Three', '', 'Four']);

  expect(splitLines('')).toEqual(['']);
});

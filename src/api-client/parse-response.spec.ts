import fs from 'fs';
import path from 'path';

import { parseInitialPage } from './parse-response';

const testDataFolder = path.join(__dirname, '..', '..', 'test-data');
const contents = fs.readFileSync(path.join(testDataFolder, 'index.html'));

describe('parseResponse', () => {
    describe('parseInitialPage', () => {
        it('works', async () => {
            const result = parseInitialPage(contents.toString());
            expect(result).toMatchSnapshot();
        });
    });
});

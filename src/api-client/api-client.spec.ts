import axios from 'axios';
import fs from 'fs';
import path from 'path';

import { ApiClient } from './api-client';

jest.mock('axios');

const testDataFolder = path.join(__dirname, '..', '..', 'test-data');
const contents = fs.readFileSync(path.join(testDataFolder, 'initial-results.html')).toString();

describe('API client', () => {
    it('works', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            status: 200,
            data: contents,
        });
        const client = new ApiClient();
        await expect(client.getVacancies()).resolves.toEqual({
            count: 1428,
        });
    });
});

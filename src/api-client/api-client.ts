import axios from 'axios';

import { ParsedResponse, parseInitialPage, parseIndexPageResponse } from './parse-response';

const url = 'https://www.werkenvoornederland.nl/vacatures';

export interface VacancyRequest {
    areaIds: string[];
    subAreaIds: string[];
}

export class ApiClient {
    async getFilters(): Promise<any> {
        const response = await this.get(url);

        return parseInitialPage(response);
    }

    async getVacancies(): Promise<ParsedResponse> {
        // https://www.werkenvoornederland.nl/vacatures?_hn:type=component-rendering&_hn:ref=r32_r1_r4
        const response = await this.get(url, {
            '_hn:type': 'component-rendering',
            '_hn:ref': 'r32_r1_r4',
            '_hn:rid': 'vacancy-results',
            type: 'vacature',
        });
        return parseIndexPageResponse(response);
    }

    private async get(url: string, params: Record<string, string> = {}): Promise<string> {
        const response = await axios.get<string>(url, {
            params,
        });
        if (response.status !== 200) {
            const err = new Error(`Got HTTP ${response.status} on ${url}`);
            Object.assign(err, { response });
            throw err;
        }
        return response.data;
    }
}

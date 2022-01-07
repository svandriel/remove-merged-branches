import Cheerio, { Cheerio as CheerioAPI, Element } from 'cheerio';

export interface ParsedResponse {
    count: number;
}

export interface Filter {
    title: string;
    options: FilterOption[];
}

export interface FilterOption {
    title: string;
    value: string;
    subFilters: LeafFilterOption[];
}

export interface LeafFilterOption {
    title: string;
    key: string;
    value: string;
}

export function parseInitialPage(html: string): Filter[] {
    const $ = Cheerio.load(html);
    const results = $('.vacancy-filter-panel')
        .toArray()
        .map(element => {
            const el = $(element);
            const title = el.find('.vacancy-filter-panel__title span').text().trim();
            const options = el
                .find('.vacancy-filter-checkbox__item')
                .toArray()
                .map(item => parseFilterOption(item, $));

            const filter = {
                title,
                options: options.map(option => ({
                    title: option.title,
                    value: option.value,
                    subFilters: option.subFilters,
                })),
            };
            return filter;
        });
    return results;
}

function parseFilterOption(filterOptionItem: Element, $: typeof Cheerio): FilterOption {
    const $filterOptionItem = $(filterOptionItem);
    const result = parseCheckboxItem($filterOptionItem);

    const subFilters = $filterOptionItem
        .find('.vacancy-filter-checkbox-2nd-layer__item')
        .toArray()
        .map(subItem => parseCheckboxItem($(subItem)));

    return { ...result, subFilters };
}

function parseCheckboxItem($item: CheerioAPI<Element>) {
    const input = $item.find('input[type=checkbox]').first();
    const label = $item.find('label').first();
    const id = input.attr('id')?.split('_');
    const title = removeSpaces(label.text());
    const [key, value] = id ?? [];
    return { title, key, value };
}

export function parseIndexPageResponse(html: string): ParsedResponse {
    const $ = Cheerio.load(html);

    const countStr = $('.vacancy-result-bar__totals-badge').text();
    const count = parseInteger(countStr);

    return {
        count,
    };
}

function parseInteger(intString: string): number {
    return +intString.replace(/[.,]/g, '');
}

function removeSpaces(str: string): string {
    return str.replace(/\s+/g, ' ').trim();
}

// function uniq<T>(list: T[]): T[] {
//     return Array.from(new Set(list));
// }

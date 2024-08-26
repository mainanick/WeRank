// [{"keyword":"seo","location_code":2840,"language_code":"en","search_partners":false,"competition":"LOW","competition_index":16,
// "search_volume":201000,"low_top_of_page_bid":3.26,"high_top_of_page_bid":13.27,"cpc":13.14,"monthly_searches":[{"year":2024,"month":7,"search_volume":110000},{"year":2024,"month":6,"search_volume":1000000},{"year":2024,"month":5,"search_volume":110000},{"year":2024,"month":4,"search_volume":110000},{"year":2024,"month":3,"search_volume":110000},{"year":2024,"month":2,"search_volume":110000},{"year":2024,"month":1,"search_volume":135000},{"year":2023,"month":12,"search_volume":110000},{"year":2023,"month":11,"search_volume":110000},{"year":2023,"month":10,"search_volume":110000},{"year":2023,"month":9,"search_volume":110000},{"year":2023,"month":8,"search_volume":110000}],"keyword_annotations":{"concepts":null}}

type MonthlySearch = {
    year: number
    month: number
    search_volume: number

}
export type KeywordResult = {
    keyword: string;
    location_code: number;
    language_code: string;
    search_partners: boolean;
    competition: string;
    competition_index: number;
    search_volume: number;
    low_top_of_page_bid: number;
    high_top_of_page_bid: number;
    cpc: number;
    monthly_searches: MonthlySearch[]

}
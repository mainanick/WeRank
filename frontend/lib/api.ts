import apiURL from "./constants";
import {
  AvgBacklinkInfo,
  BaseResponse,
  BaseResponseTaskList,
  ItemMetric,
  KeywordInfo,
  KeywordIntent,
  KeywordProperties,
  SearchIntentInfo,
  SERPInfo,
} from "./types";

export type KeywordForSiteRequest = {
  target: string;
  location_name: string;
  language_name?: string;
  include_serp_info?: boolean;
  include_subdomains?: boolean;
  include_clickstream_data?: boolean;
  ignore_synonyms?: string;
  limit: number;
  offset?: number;
  offset_token?: string;
  filters?: string[];
  order_by?: string[];
  tag?: string;
};

export type KeywordForSiteResponse = BaseResponse & {
  tasks: Array<
    BaseResponseTaskList & {
      result: Array<{
        se_type: string;
        target: string;
        location_code: number;
        language_code: string;
        total_count: number;
        items_count: number;
        offset: number;
        offset_token: string;
        items: Array<{
          se_type: string;
          keyword: string;
          location_code: number;
          language_code: string;
          keyword_info: KeywordInfo;
          keyword_properties: KeywordProperties;
          serp_info: SERPInfo;
          avg_backlink_info: AvgBacklinkInfo;
          search_intent_info: SearchIntentInfo;
        }>;
      }>;
    }
  >;
};
async function keywordsForSite(data: KeywordForSiteRequest) {
  const res = await fetch(apiURL + "/keywords-for-site", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return (await res.json()) as KeywordForSiteResponse;
}

export type RelatedKeywordsRequest = {
  keyword: string;
  location_name: string;
  language_name: string;
  depth?: number;
  include_seed_keyword?: boolean;
  include_serp_info?: boolean;
  include_clickstream_data?: boolean;
  ignore_synonyms?: string;
  replace_with_core_keyword?: boolean;
  filters?: string[];
  order_by?: string[];
  limit: number;
  offset?: number;
  tag?: string;
};

export type RelatedKeywordsResponse = BaseResponse & {
  tasks: Array<
    BaseResponseTaskList & {
      result: Array<{
        se_type: string;
        seed_keyword: string;
        location_code: number;
        language_code: string;
        total_count: number;
        items_count: number;
        items: Array<{
          se_type: string;
          keyword_data: {
            keyword: string;
            location_code: number;
            language_code: string;
            keyword_info: KeywordInfo;
            keyword_properties: KeywordProperties;
            serp_info: SERPInfo;
            avg_backlink_info: AvgBacklinkInfo;
            search_intent_info: SearchIntentInfo;
          };
          depth: number;
          related_keywords: string[];
        }>;
      }>;
    }
  >;
};
async function relatedKeywords(data: RelatedKeywordsRequest) {
  const res = await fetch(apiURL + "/related-keywords", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return (await res.json()) as RelatedKeywordsResponse;
}

export type KeywordSuggestionsRequest = {
  keyword: string;
  location_name: string;
  language_name: string;
  depth?: number;
  include_seed_keyword?: boolean;
  include_serp_info?: boolean;
  include_clickstream_data?: boolean;
  exact_match?: boolean;
  ignore_synonyms?: string;
  filters?: string[];
  order_by?: string[];
  limit: number;
  offset?: number;
  offset_token?: string;
  tag?: string;
};

export type KeywordSuggestionsResponse = BaseResponse & {
  tasks: Array<
    BaseResponseTaskList & {
      result: Array<{
        se_type: string;
        seed_keyword: string;
        seed_keyword_data: {
          se_type: string;
          keyword: string;
          location_code: number;
          language_code: string;
          keyword_info: KeywordInfo;
          keyword_properties: KeywordProperties;
          serp_info: SERPInfo;
          avg_backlink_info: AvgBacklinkInfo;
          search_intent_info: SearchIntentInfo;
        };
        location_code: number;
        language_code: string;
        total_count: number;
        items_count: number;
        offset: number;
        offset_token: string;
        items: Array<{
          se_type: string;
          keyword: string;
          location_code: number;
          language_code: string;
          keyword_info: KeywordInfo;
          keyword_properties: KeywordProperties;
          serp_info: SERPInfo;
          avg_backlink_info: AvgBacklinkInfo;
          search_intent_info: SearchIntentInfo;
        }>;
      }>;
    }
  >;
};
async function keywordSuggestions(data: KeywordSuggestionsRequest) {
  const res = await fetch(apiURL + "/keyword-suggestions", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return (await res.json()) as KeywordSuggestionsResponse;
}

export type KeywordIdeasRequest = {
  keywords: string[];
  location_name: string;
  language_name: string;
  closely_variants?: boolean;
  ignore_synonyms?: string;
  include_serp_info?: boolean;
  include_clickstream_data?: boolean;
  limit?: number;
  offset?: number;
  offset_token?: string;
  filters?: string[];
  order_by?: string[];
  tag?: string;
};

export type KeywordIdeasResponse = BaseResponse & {
  tasks: Array<
    BaseResponseTaskList & {
      result: Array<{
        se_type: string;
        seed_keywords: string[];
        location_code: number;
        language_code: string;
        total_count: number;
        items_count: number;
        offset: number;
        offset_token: string;
        items: Array<{
          se_type: string;
          keyword: string;
          location_code: number;
          language_code: string;
          keyword_info: KeywordInfo;
          keyword_properties: KeywordProperties;
          serp_info: SERPInfo;
          avg_backlink_info: AvgBacklinkInfo;
          search_intent_info: SearchIntentInfo;
        }>;
      }>;
    }
  >;
};
async function keywordIdeas(data: KeywordIdeasRequest) {
  const res = await fetch(apiURL + "/keyword-ideas", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return (await res.json()) as KeywordIdeasResponse;
}

export type HistoricalSearchVolumeRequest = {
  keywords: string[];
  location_name: string;
  language_name: string;
  include_serp_info?: boolean;
  include_clickstream_data?: boolean;
  tag?: string;
};

export type HistoricalSearchVolumeResponse = BaseResponse & {
  tasks: Array<
    BaseResponseTaskList & {
      result: Array<{
        se_type: string;
        location_code: number;
        language_code: string;
        items_count: number;
        offset: number;
        offset_token: string;
        items: Array<{
          se_type: string;
          keyword: string;
          location_code: number;
          language_code: string;
          serach_partners: boolean;
          keyword_info: KeywordInfo;
          keyword_properties: KeywordProperties;
          serp_info: SERPInfo;
          avg_backlink_info: AvgBacklinkInfo;
        }>;
      }>;
    }
  >;
};
async function historicalSearchVolume(data: HistoricalSearchVolumeRequest) {
  const res = await fetch(apiURL + "/historic-search-volume", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return (await res.json()) as HistoricalSearchVolumeResponse;
}

export type BulkKeywordDifficultyRequest = {
  keywords: string[];
  location_name: string;
  language_name: string;
  include_serp_info?: boolean;
  include_clickstream_data?: boolean;
  tag?: string;
};

export type BulkKeywordDifficultyResponse = BaseResponse & {
  tasks: Array<
    BaseResponseTaskList & {
      result: Array<{
        se_type: string;
        location_code: number;
        language_code: string;
        total_count: number;
        items_count: number;
        items: Array<{
          se_type: string;
          keyword: string;
          keyword_difficulty: number;
        }>;
      }>;
    }
  >;
};
async function bulkKeywordDifficulty(data: BulkKeywordDifficultyRequest) {
  const res = await fetch(apiURL + "/bulk-keyword-difficulty", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return (await res.json()) as BulkKeywordDifficultyResponse;
}

export type SearchIntentRequest = {
  keywords: string[];
  location_name: string;
  language_name: string;
  include_serp_info?: boolean;
  include_clickstream_data?: boolean;
  tag?: string;
};

export type SearchIntentResponse = BaseResponse & {
  tasks: Array<
    BaseResponseTaskList & {
      result: Array<{
        se_type: string;
        location_code: number;
        language_code: string;
        total_count: number;
        items_count: number;
        items: Array<{
          se_type: string;
          keyword: string;
          keyword_intent: KeywordIntent;
          secondary_keyword_intents: KeywordIntent[];
        }>;
      }>;
    }
  >;
};
async function searchIntent(data: SearchIntentRequest) {
  const res = await fetch(apiURL + "/search-intent", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return (await res.json()) as SearchIntentResponse;
}

export type RankedKeywordsRequest = {
  target: string;
  location_name: string;
  language_name: string;
  ignore_synonyms?: boolean;
  item_types?: string[];
  include_clickstream_data?: boolean;
  limit?: number;
  offset?: number;
  load_rank_absolute?: boolean;
  historical_serp_mode?: boolean;
  replace_with_core_keyword?: boolean;
  filters?: string[];
  order_by?: string[];
  tag?: string;
};

export type RankedKeywordsResponse = BaseResponse & {
  tasks: Array<
    BaseResponseTaskList & {
      result: Array<{
        se_type: string;
        target: string;
        location_code: number;
        language_code: string;
        total_count: number;
        items_count: number;
        metrics: {
          organic: ItemMetric;
          paid: ItemMetric;
          featured_snippet: ItemMetric;
          local_pack: ItemMetric;
        };
        metrics_absolute: {
          organic: ItemMetric;
          paid: ItemMetric;
          featured_snippet: ItemMetric;
          local_pack: ItemMetric;
        };
        items: Array<{
          se_type: string;
          keyword_data: {
            keyword: string;
            location_code: number;
            language_code: string;
            keyword_info: KeywordInfo;
            keyword_properties: KeywordProperties;
            serp_info: SERPInfo;
            avg_backlink_info: AvgBacklinkInfo;
            search_intent_info: SearchIntentInfo;
          };
        }>;
      }>;
    }
  >;
};

async function rankedKeywords(data: RankedKeywordsRequest) {
  const res = await fetch(apiURL + "/ranked-keywords", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return (await res.json()) as RankedKeywordsResponse;
}

export type SERPCompetitorsRequest = {
  keywords: string[];
  location_name: string;
  language_name: string;
  include_subdomains?: boolean;
  item_types?: string[];
  limit?: number;
  offset?: number;
  filters?: string[];
  order_by?: string[];
  tag?: string;
};

export type SERPCompetitorsResponse = BaseResponse & {
  tasks: Array<
    BaseResponseTaskList & {
      result: Array<{
        se_type: string;
        seed_keyword: string;
        location_code: number;
        language_code: string;
        total_count: number;
        items_count: number;
        items: Array<{
          se_type: string;
          domain: string;
          avg_position: number;
          median_position: number;
          rating: number;
          etv: number;
          keywords_count: number;
          visibility: number;
          relevant_serp_items: number;
          // TODO
          // keywords_positions: any;
        }>;
      }>;
    }
  >;
};

async function SERPCompetitors(data: SERPCompetitorsRequest) {
  const res = await fetch(apiURL + "/serp-competitors", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return (await res.json()) as SERPCompetitorsResponse;
}

export const API = {
  keywordsForSite,
  relatedKeywords,
  keywordSuggestions,
  keywordIdeas,
  historicalSearchVolume,
  bulkKeywordDifficulty,
  searchIntent,
  rankedKeywords,
  SERPCompetitors,
};

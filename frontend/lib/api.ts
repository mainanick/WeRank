import apiURL from "./constants";
import {
  AvgBacklinkInfo,
  BaseResponse,
  BaseResponseTaskList,
  KeywordInfo,
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

export type GoogleLabsKeywordForSiteResponse = BaseResponse & {
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
  return (await res.json()) as GoogleLabsKeywordForSiteResponse;
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

export const API = {
  keywordsForSite,
  relatedKeywords,
  keywordSuggestions,
  keywordIdeas,
};

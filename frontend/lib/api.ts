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

export const API = {
  keywordsForSite,
};

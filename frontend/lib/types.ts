export type BaseResponseTaskList = {
  id: string;
  status_code: number;
  status_message: string;
  time: string;
  cost: number;
  result_count: number;
  path: string[];
};

export type BaseResponse = {
  version: string;
  status_code: number;
  status_message: string;
  time: string;
  cost: number;
  tasks_count: number;
  tasks_error: number;
  tasks: BaseResponseTaskList[];
};

export type AvgBacklinkInfo = {
  se_type: string;
  backlinks: number;
  dofollow: number;
  referring_pages: number;
  referring_domains: number;
  referring_main_domains: number;
  rank: number;
  main_domain_rank: number;
  last_updated_time: string;
};

export type SERPInfo = {
  se_type: string;
  check_url: string;
  serp_item_types: string[];
  se_results_count: number;
  last_updated_time: string;
  previous_updated_time: string;
};

export type KeywordProperties = {
  se_type: string;
  core_keyword: string;
  synonym_clustering_algorithm: string;
  keyword_difficulty: number;
  detected_language: string;
  is_another_language: boolean;
};

export type KeywordInfo = {
  se_type: string;
  last_updated_time: string;
  competition: number;
  competition_level: string;
  cpc: number;
  search_volume: number;
  low_top_of_page_bid: number;
  high_top_of_page_bid: number;
  categories: number[];
  monthly_searches: Array<{
    year: number;
    month: number;
    search_volume: number;
  }>;
};

export type SearchIntentInfo = {
  se_type: string;
  main_intent: string;
  foreign_intent: string[];
  last_updated_time: string;
};

export type KeywordIntent = {
  label: string;
  probability: number;
};

export type ItemMetric = {
  pos_1: number;
  pos_2_3: number;
  pos_4_10: number;
  pos_11_20: number;
  pos_21_30: number;
  pos_31_40: number;
  pos_41_50: number;
  pos_51_60: number;
  pos_61_70: number;
  pos_71_80: number;
  pos_81_90: number;
  pos_91_100: number;
  etv: number;
  impressions_etv: number;
  count: number;
  estimated_paid_traffic_cost: number;
  is_new: number;
  is_up: number;
  is_down: number;
  is_lost: number;
  clickstream_etv: number;
  clickstream_gender_distribution: {
    female: number;
    male: number;
  };
  clickstream_age_distribution: {
    "18-24": number;
    "25-34": number;
    "35-44": number;
    "45-54": number;
    "55-64": number;
  };
};

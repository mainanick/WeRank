import apiURL from "./constants";

export type KeywordRequest ={
    keywords: string[];
	location_name: string;
	language_name?: string
	search_partners?: boolean
	date_from?: string
	date_to?: string
	include_adult_keywords?: string
	sort_by?: string
}
async function keywords(data: KeywordRequest) {
    const res = await fetch(apiURL+"/keywords", {
		method: "POST",
		body: JSON.stringify(data)
	})
    return await res.json()
}

export const API = {
	keywords
}
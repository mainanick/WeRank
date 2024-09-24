import { Layout } from "@/components/Layout";
import { FormEvent, useState } from "react";
import {
  API,
  RelatedKeywordsRequest,
  RelatedKeywordsResponse,
} from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { CountrySelect } from "@/components/CountrySelect";
import { DataTable } from "@/components/Datatable";

export default function Page() {
  const columns = [
    {
      header: "Keyword",
      accessorKey: "keyword_data.keyword",
    },
    {
      header: "Search Volume",
      accessorKey: "keyword_data.keyword_info.search_volume",
    },
    {
      header: "Competition",
      accessorKey: "keyword_data.keyword_info.competition",
    },
    {
      header: "Competition Level",
      accessorKey: "keyword_data.keyword_info.competition_level",
    },
    {
      header: "CPC",
      accessorKey: "keyword_data.keyword_info.cpc",
    },
    {
      header: "KD",
      accessorKey: "keyword_data.keyword_properties.keyword_difficulty",
    },
    {
      header: "Search Intent",
      accessorKey: "keyword_data.search_intent_info.main_intent",
    },
  ];
  const [formState, setFormState] = useState<RelatedKeywordsRequest>({
    keyword: "",
    location_name: "Kenya",
    language_name: "English",
    depth: 1,
    limit: 500,
  });
  const [results, setResults] = useState<RelatedKeywordsResponse | undefined>();

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (formState.keyword === "" || formState.location_name === "") return;
    const res = await API.relatedKeywords({ ...formState });
    setResults(res);
  };
  const data = results?.tasks.length ? results?.tasks[0].result[0].items : [];
  return (
    <Layout>
      <div className="mb-4">
        <form id="KeywordForSite" onSubmit={onSubmit}>
          <div className="flex w-full max-w-sm items-center">
            <Input
              type="text"
              name="target"
              placeholder="Keyword"
              className="h-8 border-r-0 rounded-r-none"
              onChange={(ev) => {
                setFormState({ ...formState, keyword: ev.target.value });
              }}
            />
            <CountrySelect
              name="location_name"
              onValueChange={(value) => {
                setFormState({ ...formState, location_name: value });
              }}
            />
            <button
              type="submit"
              className="h-8 px-2 ml-2 bg-red-400 rounded-md text-white"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {results && <DataTable columns={columns} data={data} />}
    </Layout>
  );
}

import { Layout } from "@/components/Layout";
import { FormEvent, useState } from "react";
import {
  API,
  SERPCompetitorsRequest,
  SERPCompetitorsResponse,
} from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { CountrySelect } from "@/components/CountrySelect";
import { DataTable } from "@/components/Datatable";

export default function Page() {
  // TODO
  const columns = [
    {
      header: "Domain",
      accessorKey: "domain",
    },
    {
      header: "Avg Position",
      accessorKey: "avg_position",
    },
    {
      header: "Avg Position",
      accessorKey: "avg_position",
    },
    {
      header: "Median Position",
      accessorKey: "median_position",
    },
    {
      header: "Rating",
      accessorKey: "rating",
    },
    {
      header: "ETV",
      accessorKey: "etv",
    },
    {
      header: "Keywords Count",
      accessorKey: "keywords_count",
    },
    {
      header: "Visibility",
      accessorKey: "visibility",
    },
    {
      header: "Relevant SERP Iitems",
      accessorKey: "relevant_serp_items",
    },
  ];
  const [formState, setFormState] = useState<SERPCompetitorsRequest>({
    keywords: [""],
    location_name: "Kenya",
    language_name: "English",
  });
  const [results, setResults] = useState<SERPCompetitorsResponse | undefined>();

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (formState.keywords.length === 0 || formState.location_name === "")
      return;
    const res = await API.SERPCompetitors({ ...formState });
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
                setFormState({ ...formState, keywords: [ev.target.value] });
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

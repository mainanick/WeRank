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
import { SortColumn } from "@/components/SortColumn";
import { ColumnDef } from "@tanstack/react-table";

type T = SERPCompetitorsResponse["tasks"][0]["result"][0]["items"][0];
export default function Page() {
  // TODO
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const columns: ColumnDef<T, any>[] = [
    {
      header: (ctx) => SortColumn(ctx, "Domain"),
      accessorKey: "domain",
    },
    {
      header: (ctx) => SortColumn(ctx, "Avg Position"),
      accessorKey: "avg_position",
    },
    {
      header: (ctx) => SortColumn(ctx, "Median Position"),
      accessorKey: "median_position",
    },

    {
      header: (ctx) => SortColumn(ctx, "Rating"),
      accessorKey: "rating",
    },
    {
      header: (ctx) => SortColumn(ctx, "ETV"),
      accessorKey: "etv",
    },
    {
      header: (ctx) => SortColumn(ctx, "Keywords Count"),
      accessorKey: "keywords_count",
    },
    {
      header: (ctx) => SortColumn(ctx, "Visibility"),
      accessorKey: "visibility",
    },
    {
      header: (ctx) => SortColumn(ctx, "Relevant SERP Items"),
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

import { Layout } from "@/components/Layout";
import { useState } from "react";
import { API, KeywordForSiteResponse } from "@/lib/api";
import { DataTable } from "@/components/Datatable";
import DomainForm, { FormState } from "@/components/DomainForm";
import { SortColumn } from "@/components/SortColumn";
import { ColumnDef } from "@tanstack/react-table";

type T = KeywordForSiteResponse["tasks"][0]["result"][0]["items"][0];
export default function Page() {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const columns: ColumnDef<T, any>[] = [
    {
      header: (ctx) => SortColumn(ctx, "Keyword"),
      accessorKey: "keyword",
    },
    {
      header: (ctx) => SortColumn(ctx, "Search Volume"),
      accessorKey: "keyword_info.search_volume",
    },
    {
      header: (ctx) => SortColumn(ctx, "Competition"),
      accessorKey: "keyword_info.competition",
    },
    {
      header: (ctx) => SortColumn(ctx, "Competition Level"),
      accessorKey: "keyword_info.competition_level",
    },
    {
      header: (ctx) => SortColumn(ctx, "CPC"),
      accessorKey: "keyword_info.cpc",
    },
    {
      header: (ctx) => SortColumn(ctx, "KD"),
      accessorKey: "keyword_properties.keyword_difficulty",
    },
    {
      header: (ctx) => SortColumn(ctx, "Search Intent"),
      accessorKey: "search_intent_info.main_intent",
    },
  ];

  const [results, setResults] = useState<KeywordForSiteResponse | undefined>();

  const onFormSubmit = async (formState: FormState) => {
    if (formState.target === "" || formState.location_name === "") return;
    const res = await API.keywordsForSite({
      target: formState.target,
      location_name: formState.location_name,
      limit: 500,
    });
    setResults(res);
  };

  const data = results?.tasks.length ? results?.tasks[0].result[0].items : [];

  return (
    <Layout>
      <div className="mb-4">
        <DomainForm onFormSubmit={onFormSubmit} />
      </div>

      {results && <DataTable columns={columns} data={data} />}
    </Layout>
  );
}

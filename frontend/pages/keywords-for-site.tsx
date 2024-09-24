import { Layout } from "@/components/Layout";
import { useState } from "react";
import { API, GoogleLabsKeywordForSiteResponse } from "@/lib/api";
import { DataTable } from "@/components/Datatable";
import DomainForm, { FormState } from "@/components/DomainForm";

export default function Page() {
  const columns = [
    {
      header: "Keyword",
      accessorKey: "keyword",
    },
    {
      header: "Search Volume",
      accessorKey: "keyword_info.search_volume",
    },
    {
      header: "Competition",
      accessorKey: "keyword_info.competition",
    },
    {
      header: "Competition Level",
      accessorKey: "keyword_info.competition_level",
    },
    {
      header: "CPC",
      accessorKey: "keyword_info.cpc",
    },
    {
      header: "KD",
      accessorKey: "keyword_properties.keyword_difficulty",
    },
    {
      header: "Search Intent",
      accessorKey: "search_intent_info.main_intent",
    },
  ];

  const [results, setResults] = useState<
    GoogleLabsKeywordForSiteResponse | undefined
  >();

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

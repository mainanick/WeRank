import { Layout } from "@/components/Layout";
import { FormEvent, useState } from "react";
import {
  API,
  CompetitorsDomainRequest,
  CompetitorsDomainResponse,
} from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { CountrySelect } from "@/components/CountrySelect";
import { DataTable } from "@/components/Datatable";
import { SortColumn } from "@/components/SortColumn";
import { ColumnDef } from "@tanstack/react-table";

type T = CompetitorsDomainResponse["tasks"][0]["result"][0]["items"][0];
export default function Page() {
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
      header: (ctx) => SortColumn(ctx, "Sum Position"),
      accessorKey: "sum_position",
    },
    // TODO
  ];
  const [formState, setFormState] = useState<CompetitorsDomainRequest>({
    target: "",
    location_name: "Kenya",
    language_name: "English",
    limit: 500,
  });
  const [results, setResults] = useState<
    CompetitorsDomainResponse | undefined
  >();

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (formState.target === "" || formState.location_name === "") return;
    const res = await API.competitorsDomain({ ...formState });
    setResults(res);
  };
  const data = results?.tasks.length ? results?.tasks[0].result[0].items : [];
  return (
    <Layout>
      <div className="mb-4">
        <form id="competitorsDomain" onSubmit={onSubmit}>
          <div className="flex w-full max-w-sm items-center">
            <Input
              type="text"
              name="target"
              placeholder="target"
              className="h-8 border-r-0 rounded-r-none"
              onChange={(ev) => {
                setFormState({ ...formState, target: ev.target.value });
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

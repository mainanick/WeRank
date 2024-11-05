import { Layout } from "@/components/Layout";
import { FormEvent, useState } from "react";
import { API, DomainRankRequest, DomainRankResponse } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { CountrySelect } from "@/components/CountrySelect";
import { DataTable } from "@/components/Datatable";
import { SortColumn } from "@/components/SortColumn";
import { ColumnDef } from "@tanstack/react-table";

type T = DomainRankResponse["tasks"][0]["result"][0]["items"][0];
export default function Page() {
  // TODO Show Metrics
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const columns: ColumnDef<T, any>[] = [
    {
      header: (ctx) => SortColumn(ctx, "Location Code"),
      accessorKey: "location_code",
    },
    {
      header: (ctx) => SortColumn(ctx, "Organic ETV"),
      accessorKey: "metrics.organic.etv",
    },
    {
      header: (ctx) => SortColumn(ctx, "Paid ETV"),
      accessorKey: "metrics.paid.etv",
    },
    // TODO complete
  ];
  const [formState, setFormState] = useState<DomainRankRequest>({
    target: "",
    location_name: "Kenya",
    language_name: "English",
  });
  const [results, setResults] = useState<DomainRankResponse | undefined>();

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (formState.target.length === 0 || formState.location_name === "") return;
    const res = await API.domainRank({ ...formState });
    setResults(res);
  };
  const data = results?.tasks.length ? results?.tasks[0].result[0].items : [];
  return (
    <Layout>
      <div className="mb-4">
        <form id="domainRank" onSubmit={onSubmit}>
          <div className="flex w-full max-w-sm items-center">
            <Input
              type="text"
              name="target"
              placeholder="Target"
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

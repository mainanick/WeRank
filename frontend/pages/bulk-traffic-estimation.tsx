import { Layout } from "@/components/Layout";
import { FormEvent, useState } from "react";
import {
  API,
  BulkTrafficEstimationRequest,
  BulkTrafficEstimationResponse,
} from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { CountrySelect } from "@/components/CountrySelect";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type T = BulkTrafficEstimationResponse["tasks"][0]["result"][0]["items"][0];
export default function Page() {
  const [formState, setFormState] = useState<BulkTrafficEstimationRequest>({
    targets: [],
    location_name: "Kenya",
    language_name: "English",
  });
  const [results, setResults] = useState<
    BulkTrafficEstimationResponse | undefined
  >();

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (formState.targets.length === 0 || formState.location_name === "")
      return;
    const res = await API.bulkTrafficEstimation({ ...formState });
    setResults(res);
  };
  const data = results?.tasks.length ? results?.tasks[0].result[0].items : [];
  return (
    <Layout>
      <div className="mb-4">
        <form id="bulkTrafficEstimation" onSubmit={onSubmit}>
          <div className="flex w-full max-w-sm items-center">
            <Input
              type="text"
              name="target"
              placeholder="Target"
              className="h-8 border-r-0 rounded-r-none"
              onChange={(ev) => {
                setFormState({
                  ...formState,
                  targets: [...formState.targets, ev.target.value],
                });
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

      {results && (
        <div>
          <BarChart
            width={730}
            height={250}
            data={resultToChartFormat(results)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="target" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* TODO Complete */}
            <Bar name="Organic ETV" dataKey="organic_etv" fill="#8884d8" />
            <Bar name="Paid ETV" dataKey="paid_etv" fill="#82ca9d" />
          </BarChart>
        </div>
      )}
    </Layout>
  );
}

function resultToChartFormat(results: BulkTrafficEstimationResponse) {
  /** 
     [{
    target: string
    organic_etv: number
    organic_count: number
    paid_etv: number
    paid_count: number
    featured_snippet_etv: number
    featured_snippet_count: number
    local_pack_etv: number
    local_pack_count: number
    
}]
      **/

  const items = results["tasks"][0]["result"][0]["items"];
  return items.map((item, _) => {
    return {
      target: item.target,
      organic_etv: item.metrics.organic.etv,
      organic_count: item.metrics.organic.count,
      paid_etv: item.metrics.paid.etv,
      paid_count: item.metrics.paid.count,
      featured_snippet_etv: item.metrics.featured_snippet.etv,
      featured_snippet_count: item.metrics.featured_snippet.count,
      local_pack_etv: item.metrics.local_pack.etv,
      local_pack_count: item.metrics.local_pack.count,
    };
  });
}

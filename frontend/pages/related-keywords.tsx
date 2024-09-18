import { Layout } from "@/components/Layout";
import { FormEvent, useState } from "react";
import { API, RelatedKeywordsResponse } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { formatNumber } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { CountrySelect } from "@/components/CountrySelect";

export default function Page() {
  const [formState, setFormState] = useState({
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

      {results && (
        <div>
          <Table className="border border-t-0 rounded-md">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableColumn>Keyword</TableColumn>
                <TableColumn className="text-right">Search Volume</TableColumn>
                <TableColumn className="text-right">Competition</TableColumn>
                <TableColumn>Competition Level</TableColumn>
                <TableColumn className="text-right">CPC</TableColumn>
                <TableColumn className="text-right">KD</TableColumn>
                <TableColumn>Intent</TableColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderTableRow(results.tasks.length ? results.tasks : [])}
            </TableBody>
          </Table>
        </div>
      )}
    </Layout>
  );
}

function renderTableRow(tasks: RelatedKeywordsResponse["tasks"]) {
  const task = tasks[0];
  return task.result[0].items.map((item) => {
    return (
      <TableRow key={item.keyword_data.keyword}>
        <TableCell>{item.keyword_data.keyword}</TableCell>
        <TableCell className="text-right">
          {formatNumber(item.keyword_data.keyword_info.search_volume)}
        </TableCell>
        <TableCell className="text-right">
          {item.keyword_data.keyword_info.competition}
        </TableCell>
        <TableCell>
          {item.keyword_data.keyword_info.competition_level}
        </TableCell>
        <TableCell className="text-right">
          {item.keyword_data.keyword_info.cpc}
        </TableCell>
        <TableCell className="text-right">
          {item.keyword_data.keyword_properties.keyword_difficulty}
        </TableCell>
        <TableCell>
          {item.keyword_data.search_intent_info.main_intent}
        </TableCell>
      </TableRow>
    );
  });
}

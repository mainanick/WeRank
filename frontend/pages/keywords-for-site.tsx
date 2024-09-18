import { Layout } from "@/components/Layout";
import { useState } from "react";
import { API, GoogleLabsKeywordForSiteResponse } from "@/lib/api";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { SelectProps } from "@radix-ui/react-select";

type Props = {
  target: string;
  location_name: string;
  response?: GoogleLabsKeywordForSiteResponse;
};
export default function Page() {
  const [state, setState] = useState<Props>({
    target: "",
    location_name: "Kenya",
  });
  return (
    <Layout>
      <div className="mb-4">
        <form
          id="KeywordForSite"
          onSubmit={async (ev) => {
            ev.preventDefault();
            if (state.target === "") return;
            console.log(state);
            const res = await API.keywordsForSite({
              target: state.target,
              location_name: state.location_name,
              limit: 500,
            });
            setState({ ...state, response: res });
          }}
        >
          <div className="flex w-full max-w-sm items-center">
            <Input
              type="text"
              name="target"
              placeholder="Domain"
              className="h-8 border-r-0 rounded-r-none"
              onChange={(ev) => {
                setState({ ...state, target: ev.target.value });
              }}
            />
            <CountrySelect
              name="location_name"
              // className="h-8 px-2 bg-gray-200 border-x rounded-r-md"
              onValueChange={(value) => {
                setState({ ...state, location_name: value });
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

      <div>
        {state.response && (
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
              {renderTableRow(
                state.response.tasks.length ? state.response.tasks : []
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </Layout>
  );
}

function renderTableRow(tasks: GoogleLabsKeywordForSiteResponse["tasks"]) {
  const task = tasks[0];
  return task.result[0].items.map((item) => {
    return (
      <TableRow key={item.keyword}>
        <TableCell>{item.keyword}</TableCell>
        <TableCell className="text-right">
          {formatNumber(item.keyword_info.search_volume)}
        </TableCell>
        <TableCell className="text-right">
          {item.keyword_info.competition}
        </TableCell>
        <TableCell>{item.keyword_info.competition_level}</TableCell>
        <TableCell className="text-right">{item.keyword_info.cpc}</TableCell>
        <TableCell className="text-right">
          {item.keyword_properties.keyword_difficulty}
        </TableCell>
        <TableCell>{item.search_intent_info.main_intent}</TableCell>
      </TableRow>
    );
  });
}

export function CountrySelect(props: SelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="h-8 border-l rounded-l-none">
        <SelectValue placeholder="Country" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Country</SelectLabel>
          <SelectItem value="Kenya">Kenya</SelectItem>
          <SelectItem value="United States">USA</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

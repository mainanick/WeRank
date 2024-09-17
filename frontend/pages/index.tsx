import { AsideNav, HeaderNav, Main } from "@/components/Navbar";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { PropsWithChildren, useState } from "react";
import { API, GoogleLabsKeywordForSiteResponse } from "@/lib/api";

const links = [
  {
    title: "Keyword Research",
    links: [
      { title: "Keyword For Site", href: "/keyword-for-site" },
      { title: "Related Keywords", href: "/related-keywords" },
      { title: "Keyword Suggestions", href: "/keyword-suggestions" },
      { title: "Keyword Ideas", href: "/keyword-ideas" },
      { title: "Histroic Search Volume", href: "/keyword-search-volume" },
      { title: "Bulk Keyword Difficulty", href: "/bulk-keyword-difficulty" },
      { title: "Search Intent", href: "/search-intent" },
      { title: "Ranked Keywords", href: "/ranked-keywords" },
      { title: "SERP Competitors", href: "/serp-competitors" },
    ],
  },
  {
    title: "Competitor Analysis",
    links: [
      { title: "Competitors Domain", href: "/competitors-domain" },
      { title: "Domain Intersection", href: "/domain-intersection" },
      { title: "Subdomains", href: "/subdomains" },
      { title: "Relevant Pages", href: "/relevant-pages" },
      { title: "Domain Rank", href: "/domain-rank" },
      { title: "Page Intersection", href: "/page-intersection" },
      { title: "Bulk Traffic Estimation", href: "/bulk-traffic-estimation" },
      { title: "Historical Bulk Traffic", href: "/historical-bulk-traffic" },
    ],
  },
];
export function Layout(props: PropsWithChildren) {
  return (
    <>
      <HeaderNav />
      <AsideNav links={links} />
      <Main>{props.children}</Main>
    </>
  );
}

type Props = {
  target: string;
  response?: GoogleLabsKeywordForSiteResponse;
};
export default function Index() {
  const [state, setState] = useState<Props>({ target: "" });
  return (
    <Layout>
      <div>Home</div>
      <form
        onSubmit={async (ev) => {
          ev.preventDefault();
          if (state.target === "") return;
          console.log(state);
          const res = await API.keywordsForSite({
            target: "s",
            location_name: "Kenya",
            limit: 100,
          });
          setState({ ...state, response: res });
        }}
      >
        <Input
          onChange={(ev) => {
            setState({ target: ev.target.value });
          }}
          type="text"
          label="Domain"
          isRequired
          isClearable
          radius="sm"
        />
        <Button type="submit" color="primary">
          Btn
        </Button>
      </form>
      <div>
        {state.response && (
          <Table>
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
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
  const t = tasks[0];
  return t.result[0].items.map((i) => {
    return (
      <TableRow key={i.keyword}>
        <TableCell>{i.keyword}</TableCell>
        <TableCell>{i.keyword_info.cpc}</TableCell>
        <TableCell>{i.keyword_info.search_volume}</TableCell>
      </TableRow>
    );
  });
}

import { Navbar, NavbarBrand } from "@nextui-org/navbar";
import Link from "next/link";
import { PropsWithChildren } from "react";
import ChartBar from "./icons/ChartBar";
import React from "react";

export function HeaderNav() {
  return (
    <Navbar position="sticky" isBordered className="justify-between">
      <NavbarBrand>
        <span className="w-8 h-8 mr-2">
          <ChartBar />
        </span>

        <p className="font-bold text-lg text-inherit">WeRank</p>
      </NavbarBrand>
    </Navbar>
  );
}

type NavLinkProps = {
  logo?: React.ReactNode;
  title: string;
  href: string;
};
function SideNavLink(props: NavLinkProps & PropsWithChildren) {
  const { logo, title, href } = props;
  return (
    <div className="space-x-1 flex items-center">
      {logo && <span>{logo}</span>}
      <Link href={href} className="text-[14px]">
        {title}
      </Link>
    </div>
  );
}

export type SectionLink = {
  title: string;
  links: SidenavLink[];
};

export type SidenavLink = {
  title: string;
  href: string;
  logo?: React.ReactNode;
};
export function AsideNav(props: { links: SectionLink[] }) {
  const { links } = props;

  return (
    <aside className="border-r-1 p-6 w-64  m-0 fixed h-full overflow-auto bg-gray-50">
      <div className="flex flex-col gap-y-4">
        {links.map((s) => {
          return (
            <React.Fragment key={s.title}>
              <div className="text-gray-500 text-[14px] uppercase">
                {s.title}
              </div>
              {s.links.map((l) => (
                <SideNavLink
                  key={l.href}
                  href={l.href}
                  logo={l.logo}
                  title={l.title}
                />
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </aside>
  );
}

export function Main(props: PropsWithChildren) {
  return <main className="ml-64 pt-6 px-6">{props.children}</main>;
}

const links = [
  {
    title: "Keyword Research",
    links: [
      { title: "Keyword For Site", href: "/keywords-for-site" },
      { title: "Related Keywords", href: "/related-keywords" },
      { title: "Keyword Suggestions", href: "/keyword-suggestions" },
      { title: "Keyword Ideas", href: "/keyword-ideas" },
      { title: "Histroic Search Volume", href: "/historical-search-volume" },
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

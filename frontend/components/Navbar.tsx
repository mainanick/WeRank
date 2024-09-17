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
  return <main className="bg-green-600 ml-64 p-6 ">{props.children}</main>;
}

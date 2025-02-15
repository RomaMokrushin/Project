import React from "react";
import NavBarClient from "./navBarClient";

type Props = {
  links?: {
    name: string;
    url: string;
    active: boolean;
  }[];
};

export default async function NavBarServer({ links }: Props) {
  return <NavBarClient notifications={4} links={links} />;
}

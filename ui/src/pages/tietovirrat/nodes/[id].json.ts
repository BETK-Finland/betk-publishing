import type { APIRoute, GetStaticPaths } from "astro";
import { getRawNodes } from "../../../data/tietovirrat";

export const getStaticPaths: GetStaticPaths = () => {
  return getRawNodes().map((node) => ({
    params: { id: node.id },
    props: { node },
  }));
};

export const GET: APIRoute = ({ props }) => {
  return new Response(JSON.stringify(props.node, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

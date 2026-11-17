import type { APIRoute } from "astro";
import { getRawGraph } from "../../data/tietovirrat";

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(getRawGraph(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

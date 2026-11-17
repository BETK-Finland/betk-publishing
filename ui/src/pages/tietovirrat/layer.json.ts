import type { APIRoute } from "astro";
import { getRawLayerConfig } from "../../data/tietovirrat";

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(getRawLayerConfig(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

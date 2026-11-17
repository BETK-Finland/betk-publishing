import type { APIRoute } from "astro";
import { getRawNodes } from "../../data/tietovirrat";

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(getRawNodes(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

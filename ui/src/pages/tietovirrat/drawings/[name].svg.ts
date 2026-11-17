import type { APIRoute, GetStaticPaths } from "astro";
import { getRawLayerConfig, getReferenceDrawingSvg } from "../../../data/tietovirrat";

export const getStaticPaths: GetStaticPaths = () => {
  const config = getRawLayerConfig();
  return config.layers
    .filter((layer) => layer.referenceDrawing != null)
    .map((layer) => {
      const src = layer.referenceDrawing!.src;
      const filename = src.split("/").pop()!.replace(/\.svg$/, "");
      return {
        params: { name: filename },
      };
    });
};

export const GET: APIRoute = ({ params }) => {
  const svg = getReferenceDrawingSvg(`${params.name}.svg`);
  if (!svg) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
};

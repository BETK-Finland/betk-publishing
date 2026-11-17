import { z } from "astro:content";
import { propertySetAnchor } from "./anchors";
import { propertySetsByDiscipline } from "./loader";

// --- Zod Schemas matching .project/morko-3d/schemas/*.schema.json ---

const ShapeEnum = z.enum(["process-pad", "data-hub", "registry-beacon"]);
const KebabId = z.string().regex(/^[a-z0-9-]+$/);
const HexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/);

export const ReferenceDrawingSchema = z.object({
  src: z.string().regex(/\.svg$/),
  bounds: z.object({
    width: z.number().positive(),
    depth: z.number().positive(),
    offsetX: z.number().default(0),
    offsetZ: z.number().default(0),
    offsetY: z.number().default(0.36),
  }),
  opacity: z.number().min(0).max(1).default(0.4),
  visibleByDefault: z.boolean().default(true),
});

export const LayerItemSchema = z.object({
  id: z.number().int().min(0),
  y: z.number(),
  shape: ShapeEnum,
  label: z.string().min(1),
  referenceDrawing: ReferenceDrawingSchema.nullable().optional(),
});

export const LaneItemSchema = z.object({
  id: KebabId,
  z: z.number().nullable(),
  label: z.string().min(1),
});

export const ChannelItemSchema = z.object({
  label: z.string().min(1),
  color: HexColor,
});

export const PropertySetTraceSchema = z.object({
  id: KebabId,
  group: z.string().min(1),
  label: z.string().min(1),
  color: HexColor,
  description: z.string().min(1),
  disciplines: z.array(z.string()).default(["PRECAST"]),
});

export const LayerConfigSchema = z.object({
  layers: z.array(LayerItemSchema).min(1),
  lanes: z.array(LaneItemSchema).min(1),
  channels: z.record(KebabId, ChannelItemSchema),
  propertySetTraces: z.array(PropertySetTraceSchema).default([]),
});

export const NodeSchema = z.object({
  id: KebabId,
  label: z.string().min(3),
  shortLabel: z.string().max(34),
  layer: z.number().int().min(0),
  lane: KebabId,
  shape: ShapeEnum.optional(),
  color: HexColor,
  position: z.object({
    x: z.number().min(-25).max(25),
    z: z.number().min(-16).max(16),
  }),
  size: z.tuple([
    z.number().positive(),
    z.number().positive(),
    z.number().positive(),
  ]),
  description: z.string().min(1),
  systems: z.array(z.string()),
  artifacts: z.array(z.string()),
});

export const GraphEdgeSchema = z.object({
  from: KebabId,
  to: KebabId,
  channel: KebabId,
  label: z.string().min(1),
  protocol: z.string().nullable().optional(),
  propertySets: z.array(KebabId).default([]),
});

export const GraphSchema = z.array(GraphEdgeSchema);

export type ShapeArchetype = z.infer<typeof ShapeEnum>;
export type ReferenceDrawing = z.infer<typeof ReferenceDrawingSchema>;
export type LayerItem = z.infer<typeof LayerItemSchema>;
export type LaneItem = z.infer<typeof LaneItemSchema>;
export type ChannelItem = z.infer<typeof ChannelItemSchema>;
export type PropertySetTraceItem = z.infer<typeof PropertySetTraceSchema>;
export type LayerConfig = z.infer<typeof LayerConfigSchema>;
export type RawNode = z.infer<typeof NodeSchema>;
export type GraphEdge = z.infer<typeof GraphEdgeSchema>;

export interface CatalogPropertySummary {
  id: string;
  label: string;
  becProperty: string;
  dataType: string;
  unit: string;
}

export interface ResolvedPropertySetTrace extends PropertySetTraceItem {
  anchor: string;
  propertyCount: number;
  properties: CatalogPropertySummary[];
  nodeCount: number;
  edgeCount: number;
}

export interface ResolvedLayer extends LayerItem {
  referenceDrawingSvg?: string;
}

export interface ResolvedNode extends RawNode {
  y: number;
  resolvedShape: ShapeArchetype;
  inputs: GraphEdge[];
  outputs: GraphEdge[];
  propertySets: string[];
}

export interface TietovirratPayload {
  layers: ResolvedLayer[];
  lanes: LaneItem[];
  channels: Record<string, ChannelItem>;
  propertySetTraces: ResolvedPropertySetTrace[];
  nodes: ResolvedNode[];
  edges: GraphEdge[];
}

// --- Build-time Glob Imports ---

const layerModules = import.meta.glob<unknown>(
  "../../../content/tietovirrat/layer.json",
  { eager: true, import: "default" },
);

const nodeModules = import.meta.glob<unknown>(
  "../../../content/tietovirrat/nodes/*.json",
  { eager: true, import: "default" },
);

const graphModules = import.meta.glob<unknown>(
  "../../../content/tietovirrat/graph.json",
  { eager: true, import: "default" },
);

const drawingModules = import.meta.glob<string>(
  "../../../content/tietovirrat/drawings/*.svg",
  { eager: true, query: "?raw", import: "default" },
);

function basenameStem(path: string, ext: string): string {
  const filename = path.split("/").pop() ?? "";
  return filename.slice(0, -ext.length);
}

function loadAndValidate(): {
  rawLayerConfig: LayerConfig;
  rawNodes: RawNode[];
  rawEdges: GraphEdge[];
  drawingsByRelPath: Record<string, string>;
  payload: TietovirratPayload;
} {
  const rawLayerEntry = Object.values(layerModules)[0];
  if (!rawLayerEntry) {
    throw new Error("Missing content/tietovirrat/layer.json");
  }
  const rawLayerConfig = LayerConfigSchema.parse(rawLayerEntry);

  // Map layers and lanes, checking for duplicates
  const layerMap = new Map<number, LayerItem>();
  for (const layer of rawLayerConfig.layers) {
    if (layerMap.has(layer.id)) {
      throw new Error(`Duplicate layer id "${layer.id}" in layer.json`);
    }
    layerMap.set(layer.id, layer);
  }

  const laneSet = new Set<string>();
  for (const lane of rawLayerConfig.lanes) {
    if (laneSet.has(lane.id)) {
      throw new Error(`Duplicate lane id "${lane.id}" in layer.json`);
    }
    laneSet.add(lane.id);
  }

  // Index SVG reference drawings by relative path ("drawings/<file>.svg")
  const drawingsByRelPath: Record<string, string> = {};
  for (const [path, svgContent] of Object.entries(drawingModules)) {
    const filename = path.split("/").pop()!;
    drawingsByRelPath[`drawings/${filename}`] = svgContent;
  }

  const resolvedLayers: ResolvedLayer[] = rawLayerConfig.layers.map((layer) => {
    if (!layer.referenceDrawing) {
      return { ...layer };
    }
    const svg = drawingsByRelPath[layer.referenceDrawing.src];
    if (!svg) {
      throw new Error(
        `Layer ${layer.id} references missing SVG drawing "${layer.referenceDrawing.src}"`,
      );
    }
    return {
      ...layer,
      referenceDrawingSvg: svg,
    };
  });

  // Validate individual node files and enforce filename === node.id
  const rawNodes: RawNode[] = [];
  const nodeMap = new Map<string, RawNode>();

  const sortedNodeEntries = Object.entries(nodeModules).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  for (const [path, rawNodeData] of sortedNodeEntries) {
    const stem = basenameStem(path, ".json");
    const parsedNode = NodeSchema.parse(rawNodeData);

    if (parsedNode.id !== stem) {
      throw new Error(
        `Node file "${path}" has id "${parsedNode.id}" which does not match filename stem "${stem}"`,
      );
    }
    if (nodeMap.has(parsedNode.id)) {
      throw new Error(`Duplicate node id "${parsedNode.id}"`);
    }
    if (!layerMap.has(parsedNode.layer)) {
      throw new Error(
        `Node "${parsedNode.id}" references unknown layer ${parsedNode.layer}`,
      );
    }
    if (!laneSet.has(parsedNode.lane)) {
      throw new Error(
        `Node "${parsedNode.id}" references unknown lane "${parsedNode.lane}"`,
      );
    }

    nodeMap.set(parsedNode.id, parsedNode);
    rawNodes.push(parsedNode);
  }

  // Validate graph.json edges and cross-references
  const rawGraphEntry = Object.values(graphModules)[0];
  if (!rawGraphEntry) {
    throw new Error("Missing content/tietovirrat/graph.json");
  }
  const rawEdges = GraphSchema.parse(rawGraphEntry);

  const traceMap = new Map<string, PropertySetTraceItem>();
  for (const trace of rawLayerConfig.propertySetTraces) {
    if (traceMap.has(trace.id)) {
      throw new Error(`Duplicate propertySetTrace id "${trace.id}" in layer.json`);
    }
    traceMap.set(trace.id, trace);
  }

  for (const edge of rawEdges) {
    if (!nodeMap.has(edge.from)) {
      throw new Error(
        `Graph edge from "${edge.from}" -> "${edge.to}" references unknown source node "${edge.from}"`,
      );
    }
    if (!nodeMap.has(edge.to)) {
      throw new Error(
        `Graph edge from "${edge.from}" -> "${edge.to}" references unknown target node "${edge.to}"`,
      );
    }
    if (!(edge.channel in rawLayerConfig.channels)) {
      throw new Error(
        `Graph edge from "${edge.from}" -> "${edge.to}" references unknown channel "${edge.channel}"`,
      );
    }
    for (const psId of edge.propertySets) {
      if (!traceMap.has(psId)) {
        throw new Error(
          `Graph edge from "${edge.from}" -> "${edge.to}" references unknown propertySet "${psId}"`,
        );
      }
    }
  }

  // Enrich property set traces with catalog properties and graph statistics
  const resolvedPropertySetTraces: ResolvedPropertySetTrace[] =
    rawLayerConfig.propertySetTraces.map((trace) => {
      const primaryDiscipline = trace.disciplines[0] ?? "PRECAST";
      const anchor = propertySetAnchor(primaryDiscipline, trace.group);

      const propById = new Map<string, CatalogPropertySummary>();
      for (const disc of propertySetsByDiscipline) {
        if (!trace.disciplines.includes(disc.discipline)) continue;
        const matchingSet = disc.sets.find((s) => s.group === trace.group);
        if (!matchingSet) continue;
        for (const p of matchingSet.properties) {
          if (!propById.has(p.id)) {
            propById.set(p.id, {
              id: p.id,
              label: p.label,
              becProperty: p.becProperty || "",
              dataType: p.dataType || "",
              unit: p.unit || "",
            });
          }
        }
      }

      const traceNodes = new Set<string>();
      let edgeCount = 0;
      for (const edge of rawEdges) {
        if (edge.propertySets.includes(trace.id)) {
          edgeCount += 1;
          traceNodes.add(edge.from);
          traceNodes.add(edge.to);
        }
      }

      const properties = Array.from(propById.values());
      return {
        ...trace,
        anchor,
        propertyCount: properties.length,
        properties,
        nodeCount: traceNodes.size,
        edgeCount,
      };
    });

  // Resolve elevation, shape archetype, and adjacency lists for each node
  const resolvedNodes: ResolvedNode[] = rawNodes.map((node) => {
    const layerDef = layerMap.get(node.layer)!;
    const inputs = rawEdges.filter((edge) => edge.to === node.id);
    const outputs = rawEdges.filter((edge) => edge.from === node.id);

    const psetIds = new Set<string>();
    for (const e of inputs) {
      for (const ps of e.propertySets) psetIds.add(ps);
    }
    for (const e of outputs) {
      for (const ps of e.propertySets) psetIds.add(ps);
    }
    // Preserve canonical order from layer.json#propertySetTraces
    const orderedPropertySets = rawLayerConfig.propertySetTraces
      .map((t) => t.id)
      .filter((id) => psetIds.has(id));

    return {
      ...node,
      y: layerDef.y,
      resolvedShape: node.shape ?? layerDef.shape,
      inputs,
      outputs,
      propertySets: orderedPropertySets,
    };
  });

  return {
    rawLayerConfig,
    rawNodes,
    rawEdges,
    drawingsByRelPath,
    payload: {
      layers: resolvedLayers,
      lanes: rawLayerConfig.lanes,
      channels: rawLayerConfig.channels,
      propertySetTraces: resolvedPropertySetTraces,
      nodes: resolvedNodes,
      edges: rawEdges,
    },
  };
}

const validated = loadAndValidate();

export function getTietovirratPayload(): TietovirratPayload {
  return validated.payload;
}

export function getRawLayerConfig(): LayerConfig {
  return validated.rawLayerConfig;
}

export function getRawNodes(): RawNode[] {
  return validated.rawNodes;
}

export function getRawGraph(): GraphEdge[] {
  return validated.rawEdges;
}

export function getReferenceDrawingSvg(name: string): string | undefined {
  return validated.drawingsByRelPath[`drawings/${name}`];
}

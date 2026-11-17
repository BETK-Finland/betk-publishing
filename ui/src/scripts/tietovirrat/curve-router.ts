import * as THREE from "three";
import type {
  ChannelItem,
  GraphEdge,
  ResolvedNode,
} from "../../data/tietovirrat";

export interface LinkVisualRecord {
  edge: GraphEdge;
  curve: THREE.CubicBezierCurve3;
  tubeMesh: THREE.Mesh<THREE.TubeGeometry, THREE.MeshStandardMaterial>;
  pulseMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  pulseOffset: number;
  baseOpacity: number;
  channelColor: THREE.Color;
  pulseColor: THREE.Color;
}

function pairKey(a: string, b: string): string {
  return a < b ? `${a}::${b}` : `${b}::${a}`;
}

export function createLinkVisuals(
  edges: GraphEdge[],
  nodesById: Map<string, ResolvedNode>,
  channels: Record<string, ChannelItem>,
): LinkVisualRecord[] {
  // Group edges sharing the same unordered node pair so bidirectional links offset cleanly
  const pairBuckets = new Map<string, GraphEdge[]>();
  for (const edge of edges) {
    const key = pairKey(edge.from, edge.to);
    const list = pairBuckets.get(key);
    if (list) {
      list.push(edge);
    } else {
      pairBuckets.set(key, [edge]);
    }
  }

  const records: LinkVisualRecord[] = [];
  const pulseGeo = new THREE.SphereGeometry(0.088, 12, 12);

  edges.forEach((edge, idx) => {
    const src = nodesById.get(edge.from);
    const dst = nodesById.get(edge.to);
    if (!src || !dst) {
      return;
    }

    const bucket = pairBuckets.get(pairKey(edge.from, edge.to)) ?? [edge];
    const indexInPair = bucket.indexOf(edge);
    // Offset bidirectional/parallel links symmetrically along X by ±0.224 units
    const offsetX =
      bucket.length > 1
        ? (indexInPair - (bucket.length - 1) / 2) * 0.448
        : 0;

    const srcHeight = src.size[1];
    const dstHeight = dst.size[1];
    const isSameLayer = src.layer === dst.layer;
    const isUplink = src.layer < dst.layer;
    const deltaY = Math.abs(dst.y - src.y);

    const startY =
      isSameLayer || isUplink ? src.y + srcHeight / 2 : src.y - srcHeight / 2;
    const endY =
      isSameLayer || !isUplink ? dst.y + dstHeight / 2 : dst.y - dstHeight / 2;

    const start = new THREE.Vector3(
      src.position.x + offsetX,
      startY,
      src.position.z,
    );
    const end = new THREE.Vector3(
      dst.position.x + offsetX,
      endY,
      dst.position.z,
    );

    const sameLayerArcHeight = 1.9 + Math.abs(offsetX) * 0.4;
    const ctrl1 = new THREE.Vector3(
      start.x,
      isSameLayer
        ? start.y + sameLayerArcHeight
        : isUplink
          ? start.y + deltaY * 0.55
          : start.y - deltaY * 0.55,
      start.z,
    );
    const ctrl2 = new THREE.Vector3(
      end.x,
      isSameLayer
        ? end.y + sameLayerArcHeight
        : isUplink
          ? end.y - deltaY * 0.55
          : end.y + deltaY * 0.55,
      end.z,
    );

    const curve = new THREE.CubicBezierCurve3(start, ctrl1, ctrl2, end);
    const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.036, 8, false);

    const channelColor = new THREE.Color(
      channels[edge.channel]?.color ?? "#94a3b8",
    );

    const baseOpacity = 0.78;
    const tubeMat = new THREE.MeshStandardMaterial({
      color: channelColor,
      emissive: channelColor,
      emissiveIntensity: 0.3,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: baseOpacity,
    });

    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);

    const pulseColor = channelColor
      .clone()
      .lerp(new THREE.Color("#ffffff"), 0.45);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: pulseColor.clone(),
      transparent: true,
      opacity: 0.95,
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);

    records.push({
      edge,
      curve,
      tubeMesh,
      pulseMesh,
      pulseOffset: (idx * 0.17) % 1,
      baseOpacity,
      channelColor,
      pulseColor,
    });
  });

  return records;
}

import * as THREE from "three";
import type { ResolvedLayer } from "../../data/tietovirrat";

export interface ReferencePlaneEntry {
  layerId: number;
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  baseOpacity: number;
}

function rasterizeSvgToTexture(
  svgMarkup: string,
  aspect: number,
  maxAnisotropy: number,
): THREE.CanvasTexture {
  const baseWidth = 2048;
  const baseHeight = Math.max(512, Math.round(baseWidth / aspect));

  const canvas = document.createElement("canvas");
  canvas.width = baseWidth;
  canvas.height = baseHeight;

  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  if (!ctx) {
    return texture;
  }

  const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const img = new Image();

  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    texture.needsUpdate = true;
  };

  img.onerror = () => {
    URL.revokeObjectURL(url);
  };

  img.src = url;
  return texture;
}

export function createReferencePlanes(
  layers: ResolvedLayer[],
  maxAnisotropy: number,
): Map<number, ReferencePlaneEntry> {
  const planes = new Map<number, ReferencePlaneEntry>();

  for (const layer of layers) {
    const ref = layer.referenceDrawing;
    const svg = layer.referenceDrawingSvg;
    if (!ref || !svg) {
      continue;
    }

    const { width, depth, offsetX, offsetZ, offsetY } = ref.bounds;
    const aspect = width / depth;
    const texture = rasterizeSvgToTexture(svg, aspect, maxAnisotropy);

    const geometry = new THREE.PlaneGeometry(width, depth);
    // Rotate horizontal onto the XZ plane
    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: ref.opacity,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(offsetX, layer.y + offsetY, offsetZ);
    mesh.visible = ref.visibleByDefault;
    mesh.renderOrder = 1;

    planes.set(layer.id, {
      layerId: layer.id,
      mesh,
      baseOpacity: ref.opacity,
    });
  }

  return planes;
}

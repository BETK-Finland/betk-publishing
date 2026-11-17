import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import type { ResolvedNode } from "../../data/tietovirrat";

export interface NodeVisualRecord {
  node: ResolvedNode;
  group: THREE.Group;
  hitMesh: THREE.Mesh;
  materials: THREE.MeshStandardMaterial[];
  crystalMesh?: THREE.Mesh;
  dropLineMaterial?: THREE.LineDashedMaterial;
  labelObject: CSS2DObject;
  labelElement: HTMLDivElement;
  perimeterRadiusX: number;
  perimeterRadiusZ: number;
  labelBaseY: number;
}

function buildProcessPad(
  node: ResolvedNode,
  baseColor: THREE.Color,
): {
  group: THREE.Group;
  hitMesh: THREE.Mesh;
  materials: THREE.MeshStandardMaterial[];
} {
  const [w, h, d] = node.size;
  const group = new THREE.Group();

  const chassisHeight = h * 0.8;
  const capHeight = h * 0.2;

  const chassisGeo = new THREE.BoxGeometry(w, chassisHeight, d);
  const chassisMat = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.45,
    metalness: 0.15,
  });
  const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
  chassisMesh.position.y = -capHeight * 0.5;
  group.add(chassisMesh);

  const capColor = baseColor.clone().lerp(new THREE.Color("#ffffff"), 0.25);
  const capGeo = new THREE.BoxGeometry(w * 0.96, capHeight, d * 0.96);
  const capMat = new THREE.MeshStandardMaterial({
    color: capColor,
    roughness: 0.3,
    metalness: 0.2,
  });
  const capMesh = new THREE.Mesh(capGeo, capMat);
  capMesh.position.y = chassisHeight * 0.5;
  group.add(capMesh);

  const socketGeo = new THREE.CylinderGeometry(0.144, 0.144, 0.064, 16);
  const socketMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#e2e8f0"),
    emissive: baseColor,
    emissiveIntensity: 0.4,
    roughness: 0.2,
    metalness: 0.5,
  });
  const socketMesh = new THREE.Mesh(socketGeo, socketMat);
  socketMesh.position.y = h / 2;
  group.add(socketMesh);

  return {
    group,
    hitMesh: chassisMesh,
    materials: [chassisMat, capMat, socketMat],
  };
}

function buildDataHub(
  node: ResolvedNode,
  baseColor: THREE.Color,
): {
  group: THREE.Group;
  hitMesh: THREE.Mesh;
  materials: THREE.MeshStandardMaterial[];
  dropLineMaterial: THREE.LineDashedMaterial;
} {
  const [w, h] = node.size;
  const group = new THREE.Group();

  const bodyGeo = new THREE.CylinderGeometry(w * 0.45, w * 0.45, h, 8);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.2,
    metalness: 0.3,
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(bodyMesh);

  // Dashed vertical guide line projecting the K1 data-hub footprint down to the K0 process floor (y = 0)
  const dropPoints = [
    new THREE.Vector3(0, -h / 2, 0),
    new THREE.Vector3(0, -node.y, 0),
  ];
  const dropGeo = new THREE.BufferGeometry().setFromPoints(dropPoints);
  const dropMat = new THREE.LineDashedMaterial({
    color: baseColor,
    dashSize: 0.22,
    gapSize: 0.16,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  const dropLine = new THREE.Line(dropGeo, dropMat);
  dropLine.computeLineDistances();
  group.add(dropLine);

  return {
    group,
    hitMesh: bodyMesh,
    materials: [bodyMat],
    dropLineMaterial: dropMat,
  };
}

function buildRegistryBeacon(
  node: ResolvedNode,
  baseColor: THREE.Color,
): {
  group: THREE.Group;
  hitMesh: THREE.Mesh;
  materials: THREE.MeshStandardMaterial[];
} {
  const [w, h] = node.size;
  const group = new THREE.Group();

  const coreGeo = new THREE.CylinderGeometry(w * 0.42, w * 0.35, h, 6);
  const coreMat = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.25,
    metalness: 0.35,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  group.add(coreMesh);

  const ringColor = baseColor.clone().lerp(new THREE.Color("#ffffff"), 0.3);
  const ringGeo = new THREE.TorusGeometry(w * 0.52, 0.032, 8, 24);
  ringGeo.rotateX(Math.PI / 2);
  const ringMat = new THREE.MeshStandardMaterial({
    color: ringColor,
    emissive: baseColor,
    emissiveIntensity: 0.25,
    roughness: 0.2,
    metalness: 0.5,
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  group.add(ringMesh);

  return {
    group,
    hitMesh: coreMesh,
    materials: [coreMat, ringMat],
  };
}

export function createNodeVisual(node: ResolvedNode): NodeVisualRecord {
  const baseColor = new THREE.Color(node.color);
  const [w, h, d] = node.size;

  let built: {
    group: THREE.Group;
    hitMesh: THREE.Mesh;
    materials: THREE.MeshStandardMaterial[];
    crystalMesh?: THREE.Mesh;
    dropLineMaterial?: THREE.LineDashedMaterial;
  };

  if (node.resolvedShape === "data-hub") {
    built = buildDataHub(node, baseColor);
  } else if (node.resolvedShape === "registry-beacon") {
    built = buildRegistryBeacon(node, baseColor);
  } else {
    built = buildProcessPad(node, baseColor);
  }

  built.group.position.set(node.position.x, node.y, node.position.z);
  built.group.userData = { nodeId: node.id };
  built.hitMesh.userData = { nodeId: node.id };

  const labelEl = document.createElement("div");
  labelEl.className = `morko-node-label layer-${node.layer}`;
  labelEl.textContent = node.shortLabel;
  labelEl.style.setProperty("--node-accent", node.color);

  // Attach label to the outer perimeter edge of the node (clear of top/bottom flow ports)
  const perimeterRadiusX =
    node.resolvedShape === "process-pad" ? w * 0.5 + 0.28 : w * 0.45 + 0.28;
  const perimeterRadiusZ =
    node.resolvedShape === "process-pad" ? d * 0.5 + 0.28 : w * 0.45 + 0.28;
  const labelBaseY = 0;

  const labelObj = new CSS2DObject(labelEl);
  labelObj.position.set(0, labelBaseY, perimeterRadiusZ);
  built.group.add(labelObj);

  return {
    node,
    group: built.group,
    hitMesh: built.hitMesh,
    materials: built.materials,
    crystalMesh: built.crystalMesh,
    dropLineMaterial: built.dropLineMaterial,
    labelObject: labelObj,
    labelElement: labelEl,
    perimeterRadiusX,
    perimeterRadiusZ,
    labelBaseY,
  };
}

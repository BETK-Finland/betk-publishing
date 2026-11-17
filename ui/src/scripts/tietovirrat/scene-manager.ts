import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import type { ResolvedNode, TietovirratPayload } from "../../data/tietovirrat";
import { createLinkVisuals, type LinkVisualRecord } from "./curve-router";
import { createNodeVisual, type NodeVisualRecord } from "./geometry-factory";
import {
  createReferencePlanes,
  type ReferencePlaneEntry,
} from "./reference-plane";

export interface SceneCallbacks {
  onSelectNode: (node: ResolvedNode | null) => void;
  onSelectTrace?: (traceId: string | null) => void;
}

export class TietovirratSceneManager {
  private container: HTMLElement;
  private payload: TietovirratPayload;
  private callbacks: SceneCallbacks;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private labelRenderer: CSS2DRenderer;
  private controls: OrbitControls;
  private resizeObserver: ResizeObserver;

  private nodeVisuals = new Map<string, NodeVisualRecord>();
  private hitMeshes: THREE.Mesh[] = [];
  private linkVisuals: LinkVisualRecord[] = [];
  private referencePlanes = new Map<number, ReferencePlaneEntry>();

  private activeLayers = new Set<number>();
  private activeChannels = new Set<string>();
  private selectedNodeId: string | null = null;
  private activePropertySetId: string | null = null;
  private traceColors = new Map<string, THREE.Color>();

  private raycaster = new THREE.Raycaster();
  private pointerDownPos = { x: 0, y: 0 };
  private animFrameId: number | null = null;
  private clock = new THREE.Clock();

  constructor(
    container: HTMLElement,
    payload: TietovirratPayload,
    callbacks: SceneCallbacks,
  ) {
    this.container = container;
    this.payload = payload;
    this.callbacks = callbacks;

    for (const l of payload.layers) {
      this.activeLayers.add(l.id);
    }
    for (const ch of Object.keys(payload.channels)) {
      this.activeChannels.add(ch);
    }
    for (const trace of payload.propertySetTraces ?? []) {
      this.traceColors.set(trace.id, new THREE.Color(trace.color));
    }

    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#0b1120");

    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 220);
    this.camera.position.set(0, 16.5, 28.5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    container.appendChild(this.renderer.domElement);

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(width, height);
    this.labelRenderer.domElement.className = "morko-label-layer";
    container.appendChild(this.labelRenderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.target.set(0, 3.5, 0);
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.minDistance = 8;
    this.controls.maxDistance = 65;
    this.controls.update();

    this.setupLights();
    this.buildSceneObjects();
    this.bindInteraction();

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(container);

    this.animate();
  }

  private setupLights(): void {
    const ambient = new THREE.AmbientLight("#ffffff", 0.85);
    this.scene.add(ambient);

    const dirMain = new THREE.DirectionalLight("#f8fafc", 1.35);
    dirMain.position.set(12, 22, 16);
    this.scene.add(dirMain);

    const dirFill = new THREE.DirectionalLight("#38bdf8", 0.45);
    dirFill.position.set(-14, 10, -12);
    this.scene.add(dirFill);
  }

  private buildSceneObjects(): void {
    const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();

    // 1. Reference drawing SVG planes per layer
    this.referencePlanes = createReferencePlanes(
      this.payload.layers,
      maxAnisotropy,
    );
    for (const entry of this.referencePlanes.values()) {
      this.scene.add(entry.mesh);
    }

    // 2. Nodes
    const nodesById = new Map<string, ResolvedNode>();
    for (const node of this.payload.nodes) {
      nodesById.set(node.id, node);
      const visual = createNodeVisual(node);
      this.nodeVisuals.set(node.id, visual);
      this.hitMeshes.push(visual.hitMesh);
      this.scene.add(visual.group);

      // Allow clicking the floating HTML label as well
      visual.labelElement.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this.selectNode(node.id);
      });
    }

    // 3. Directed connection curves
    this.linkVisuals = createLinkVisuals(
      this.payload.edges,
      nodesById,
      this.payload.channels,
    );
    for (const link of this.linkVisuals) {
      this.scene.add(link.tubeMesh);
      this.scene.add(link.pulseMesh);
    }
  }

  private bindInteraction(): void {
    const dom = this.renderer.domElement;

    dom.addEventListener("pointerdown", (ev: PointerEvent) => {
      this.pointerDownPos = { x: ev.clientX, y: ev.clientY };
    });

    dom.addEventListener("pointerup", (ev: PointerEvent) => {
      const dx = ev.clientX - this.pointerDownPos.x;
      const dy = ev.clientY - this.pointerDownPos.y;
      if (Math.hypot(dx, dy) > 5) {
        return;
      }

      const rect = dom.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((ev.clientX - rect.left) / rect.width) * 2 - 1,
        -((ev.clientY - rect.top) / rect.height) * 2 + 1,
      );

      this.raycaster.setFromCamera(ndc, this.camera);
      const hits = this.raycaster.intersectObjects(this.hitMeshes, false);

      if (hits.length > 0) {
        const hitNodeId = hits[0].object.userData.nodeId as string | undefined;
        if (hitNodeId) {
          this.selectNode(hitNodeId);
          return;
        }
      }

      this.selectNode(null);
    });
  }

  public selectNode(nodeId: string | null): void {
    this.selectedNodeId = nodeId;
    const record = nodeId ? this.nodeVisuals.get(nodeId) ?? null : null;
    this.applyVisibilityAndHighlight();
    this.callbacks.onSelectNode(record ? record.node : null);
  }

  public setPropertySetTrace(traceId: string | null): void {
    this.activePropertySetId = traceId && traceId.length > 0 ? traceId : null;
    this.applyVisibilityAndHighlight();
    this.callbacks.onSelectTrace?.(this.activePropertySetId);
  }

  public getPropertySetTrace(): string | null {
    return this.activePropertySetId;
  }

  public setLayerActive(layerId: number, active: boolean): void {
    if (active) {
      this.activeLayers.add(layerId);
    } else {
      this.activeLayers.delete(layerId);
    }
    this.applyVisibilityAndHighlight();
  }

  public setChannelActive(channelId: string, active: boolean): void {
    if (active) {
      this.activeChannels.add(channelId);
    } else {
      this.activeChannels.delete(channelId);
    }
    this.applyVisibilityAndHighlight();
  }

  public setReferenceDrawingVisible(layerId: number, visible: boolean): void {
    const plane = this.referencePlanes.get(layerId);
    if (plane) {
      plane.mesh.visible = visible;
    }
  }

  public resetCamera(): void {
    this.controls.target.set(0, 3.5, 0);
    this.camera.position.set(0, 16.5, 28.5);
    this.controls.update();
  }

  public setTopView(): void {
    this.controls.target.set(0, 0, -2.7);
    this.camera.position.set(0, 44, -2.69);
    this.controls.update();
  }

  private applyVisibilityAndHighlight(): void {
    const selectedId = this.selectedNodeId;
    const traceId = this.activePropertySetId;
    const traceColor = traceId ? this.traceColors.get(traceId) ?? null : null;
    const tracePulseColor = traceColor
      ? traceColor.clone().lerp(new THREE.Color("#ffffff"), 0.45)
      : null;

    const connectedNodeIds = new Set<string>();
    const activeLinks = new Set<LinkVisualRecord>();
    const traceNodeIds = new Set<string>();
    const traceLinks = new Set<LinkVisualRecord>();

    if (traceId) {
      for (const link of this.linkVisuals) {
        if (link.edge.propertySets?.includes(traceId)) {
          traceLinks.add(link);
          traceNodeIds.add(link.edge.from);
          traceNodeIds.add(link.edge.to);
        }
      }
    }

    if (selectedId) {
      connectedNodeIds.add(selectedId);
      const selectedNode = this.nodeVisuals.get(selectedId)?.node;
      const isSelectedBridge =
        selectedNode?.resolvedShape === "data-hub" ||
        selectedNode?.id === "tuotetietokanta";

      // 1-hop direct connections (filtered by active trace when set)
      const firstHopBridges = new Set<string>();
      const inboundBridges = new Set<string>();
      const outboundBridges = new Set<string>();

      for (const link of this.linkVisuals) {
        if (traceId && !traceLinks.has(link)) {
          continue;
        }
        if (link.edge.from === selectedId) {
          activeLinks.add(link);
          connectedNodeIds.add(link.edge.to);
          const targetNode = this.nodeVisuals.get(link.edge.to)?.node;
          if (
            !isSelectedBridge &&
            (targetNode?.resolvedShape === "data-hub" ||
              targetNode?.id === "tuotetietokanta")
          ) {
            firstHopBridges.add(link.edge.to);
            outboundBridges.add(link.edge.to);
          }
        } else if (link.edge.to === selectedId) {
          activeLinks.add(link);
          connectedNodeIds.add(link.edge.from);
          const sourceNode = this.nodeVisuals.get(link.edge.from)?.node;
          if (
            !isSelectedBridge &&
            (sourceNode?.resolvedShape === "data-hub" ||
              sourceNode?.id === "tuotetietokanta")
          ) {
            firstHopBridges.add(link.edge.from);
            inboundBridges.add(link.edge.from);
          }
        }
      }

      // 2-hop transitive connections through data hubs / tuotetietokanta
      if (firstHopBridges.size > 0) {
        for (const link of this.linkVisuals) {
          if (traceId && !traceLinks.has(link)) {
            continue;
          }
          if (outboundBridges.has(link.edge.from) && link.edge.to !== selectedId) {
            activeLinks.add(link);
            connectedNodeIds.add(link.edge.to);
          }
          if (inboundBridges.has(link.edge.to) && link.edge.from !== selectedId) {
            activeLinks.add(link);
            connectedNodeIds.add(link.edge.from);
          }
        }
      }
    }

    for (const [id, visual] of this.nodeVisuals.entries()) {
      const layerOn = this.activeLayers.has(visual.node.layer);
      const isSelected = id === selectedId;
      const inTrace = traceId ? traceNodeIds.has(id) : true;
      const isNeighbor = selectedId ? connectedNodeIds.has(id) : true;

      let opacity = 1.0;
      if (!layerOn) {
        opacity = 0.12;
      } else if (traceId !== null) {
        if (!inTrace && !isSelected) {
          opacity = 0.12;
        } else if (selectedId && !isNeighbor && inTrace) {
          // Participating in the traced property set across the rest of the process
          opacity = 0.72;
        }
      } else if (selectedId !== null && !isNeighbor) {
        opacity = 0.15;
      }

      const dim = opacity < 0.99;
      for (const mat of visual.materials) {
        mat.transparent = dim;
        mat.opacity = opacity;
      }

      visual.labelObject.visible = isSelected && layerOn;
      visual.labelElement.classList.toggle("is-selected", isSelected);
      visual.labelElement.classList.toggle("is-dimmed", false);
    }

    for (const link of this.linkVisuals) {
      const srcNode = this.nodeVisuals.get(link.edge.from)?.node;
      const dstNode = this.nodeVisuals.get(link.edge.to)?.node;
      const channelOn = this.activeChannels.has(link.edge.channel);
      const layersOn =
        srcNode !== undefined &&
        dstNode !== undefined &&
        this.activeLayers.has(srcNode.layer) &&
        this.activeLayers.has(dstNode.layer);

      if (!channelOn || !layersOn) {
        link.tubeMesh.visible = false;
        link.pulseMesh.visible = false;
        continue;
      }

      const matchesTrace = traceId === null || traceLinks.has(link);
      if (traceId !== null && !matchesTrace) {
        link.tubeMesh.visible = false;
        link.pulseMesh.visible = false;
        continue;
      }

      link.tubeMesh.visible = true;

      if (traceColor && tracePulseColor) {
        link.tubeMesh.material.color.copy(traceColor);
        link.tubeMesh.material.emissive.copy(traceColor);
        link.pulseMesh.material.color.copy(tracePulseColor);
      } else {
        link.tubeMesh.material.color.copy(link.channelColor);
        link.tubeMesh.material.emissive.copy(link.channelColor);
        link.pulseMesh.material.color.copy(link.pulseColor);
      }

      if (traceId !== null) {
        const isSelectedHop = selectedId === null || activeLinks.has(link);
        link.tubeMesh.material.opacity = isSelectedHop ? 0.96 : 0.68;
        link.pulseMesh.visible = true;
      } else {
        const isHighlighted = selectedId === null || activeLinks.has(link);
        link.tubeMesh.material.opacity = selectedId
          ? isHighlighted
            ? 0.95
            : 0.1
          : link.baseOpacity;
        link.pulseMesh.visible = isHighlighted;
      }
    }
  }

  private handleResize(): void {
    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.labelRenderer.setSize(width, height);
  }

  private animate = (): void => {
    this.animFrameId = requestAnimationFrame(this.animate);
    const elapsed = this.clock.getElapsedTime();

    this.controls.update();

    const camX = this.camera.position.x;
    const camZ = this.camera.position.z;

    for (const visual of this.nodeVisuals.values()) {
      if (visual.crystalMesh) {
        visual.crystalMesh.rotation.y = elapsed * 0.85;
        visual.crystalMesh.rotation.x = Math.sin(elapsed * 1.4) * 0.25;
      }

      // Orbit the label along the node's outer perimeter edge facing the camera
      const dx = camX - visual.node.position.x;
      const dz = camZ - visual.node.position.z;
      const angle = Math.atan2(dx, dz);

      visual.labelObject.position.set(
        Math.sin(angle) * visual.perimeterRadiusX,
        visual.labelBaseY,
        Math.cos(angle) * visual.perimeterRadiusZ,
      );
    }

    for (const link of this.linkVisuals) {
      if (link.pulseMesh.visible) {
        const t = (elapsed * 0.28 + link.pulseOffset) % 1;
        link.curve.getPoint(t, link.pulseMesh.position);
      }
    }

    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  };

  public dispose(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    this.resizeObserver.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
  }
}

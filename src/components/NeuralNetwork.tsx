"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  layer: number;
  index: number;
  baseColor: "blue" | "white";
}

interface Connection {
  fromIndex: number;
  toIndex: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

interface NeuralNetworkProps {
  activeIndex: number;
  wordIndex: number;
}

interface Particle {
  id: number;
  initialX: number;
  initialY: number;
  animateX: number;
  animateY: number;
  duration: number;
}

// Seeded random number generator for consistent results
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Pre-generate static particle data
const STATIC_PARTICLES: Particle[] = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  initialX: seededRandom(i * 4) * 500,
  initialY: seededRandom(i * 4 + 1) * 600,
  animateX: seededRandom(i * 4 + 2) * 500,
  animateY: seededRandom(i * 4 + 3) * 600,
  duration: seededRandom(i * 5) * 10 + 15,
}));

export default function NeuralNetwork({ activeIndex }: NeuralNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 600 });
  const [isClient, setIsClient] = useState(false);
  const [pulsingNodes, setPulsingNodes] = useState<Set<number>>(new Set());
  const animationSeedRef = useRef(0);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Memoize network structure - only recalculates when dimensions change
  const { nodes, connections } = useMemo(() => {
    const { width, height } = dimensions;
    const layers = [3, 4, 6, 4, 3];
    const horizontalPadding = width * 0.08;
    const usableWidth = width - horizontalPadding * 2;
    const layerSpacing = usableWidth / (layers.length - 1);
    const newNodes: Node[] = [];

    let nodeCounter = 0;
    layers.forEach((neuronCount, layerIndex) => {
      const verticalSpacing = height / (neuronCount + 1);
      for (let i = 0; i < neuronCount; i++) {
        const isBlue = seededRandom(layerIndex * 100 + i) > 0.6;
        newNodes.push({
          x: horizontalPadding + layerSpacing * layerIndex,
          y: verticalSpacing * (i + 1),
          layer: layerIndex,
          index: nodeCounter++,
          baseColor: isBlue ? "blue" : "white",
        });
      }
    });

    // Create connections
    const newConnections: Connection[] = [];
    let nodeIndex = 0;
    let connectionSeed = 0;

    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerStart = nodeIndex;
      const currentLayerEnd = nodeIndex + layers[l];
      const nextLayerStart = currentLayerEnd;
      const nextLayerEnd = nextLayerStart + layers[l + 1];

      for (let i = currentLayerStart; i < currentLayerEnd; i++) {
        for (let j = nextLayerStart; j < nextLayerEnd; j++) {
          if (seededRandom(connectionSeed++) > 0.3) {
            newConnections.push({
              fromIndex: i,
              toIndex: j,
              fromX: newNodes[i].x,
              fromY: newNodes[i].y,
              toX: newNodes[j].x,
              toY: newNodes[j].y,
            });
          }
        }
      }
      nodeIndex = currentLayerEnd;
    }

    return { nodes: newNodes, connections: newConnections };
  }, [dimensions]);

  // Single unified animation effect
  useEffect(() => {
    if (!isClient || nodes.length === 0) return;

    const updatePulsingNodes = () => {
      const totalLayers = 5;
      const activeLayer = Math.floor((activeIndex * totalLayers) / 20) % totalLayers;
      const seed = animationSeedRef.current++;

      const newPulsing = new Set<number>();

      // Add typing-based activation
      nodes.forEach((node, index) => {
        if (
          node.layer === activeLayer ||
          node.layer === activeLayer - 1 ||
          node.layer === activeLayer + 1
        ) {
          if (seededRandom(activeIndex * 100 + index) > 0.4) {
            newPulsing.add(index);
          }
        }
      });

      // Add ambient random activation
      const numToActivate = 3 + Math.floor(seededRandom(seed) * 4);
      for (let i = 0; i < numToActivate; i++) {
        const nodeIdx = Math.floor(seededRandom(seed * 10 + i) * nodes.length);
        newPulsing.add(nodeIdx);
      }

      setPulsingNodes(newPulsing);
    };

    // Initial update
    updatePulsingNodes();

    // Set up interval for ambient animation
    const interval = setInterval(updatePulsingNodes, 500);

    return () => clearInterval(interval);
  }, [isClient, nodes, activeIndex]);

  // Don't render until client-side
  if (!isClient) {
    return <div ref={containerRef} className="relative w-full h-full min-h-125" />;
  }

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-125">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connections - using regular SVG for better performance */}
        <g className="connections">
          {connections.map((conn, index) => {
            const isActive = pulsingNodes.has(conn.fromIndex) || pulsingNodes.has(conn.toIndex);
            return (
              <line
                key={index}
                x1={conn.fromX}
                y1={conn.fromY}
                x2={conn.toX}
                y2={conn.toY}
                stroke={isActive ? "rgba(59, 130, 246, 0.6)" : "rgba(59, 130, 246, 0.15)"}
                strokeWidth={isActive ? 1.5 : 0.5}
                style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g className="nodes">
          {nodes.map((node) => {
            const isActive = pulsingNodes.has(node.index);
            const isBlue = node.baseColor === "blue";
            const baseSize = isBlue ? 10 : 8;
            const currentSize = isActive ? baseSize + 4 : baseSize;

            return (
              <g key={node.index}>
                {/* Glow effect */}
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={currentSize + 12}
                    fill={isBlue ? "#3b82f6" : "#ffffff"}
                    opacity={0.25}
                    style={{ filter: "blur(8px)" }}
                  />
                )}

                {/* Main node */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={currentSize}
                  fill={isBlue ? "#3b82f6" : isActive ? "#ffffff" : "#888888"}
                  style={{
                    transition: "r 0.3s, fill 0.3s",
                    filter: isBlue
                      ? "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
                      : isActive
                      ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.5))"
                      : "none",
                  }}
                />

                {/* Inner highlight */}
                <circle
                  cx={node.x - 2}
                  cy={node.y - 2}
                  r={baseSize / 3}
                  fill="rgba(255, 255, 255, 0.3)"
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating particles effect */}
      <FloatingParticles dimensions={dimensions} />
    </div>
  );
}

// Memoized particles component
const FloatingParticles = ({ dimensions }: { dimensions: { width: number; height: number } }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {STATIC_PARTICLES.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          initial={{
            x: (particle.initialX / 500) * dimensions.width,
            y: (particle.initialY / 600) * dimensions.height,
            opacity: 0.1,
          }}
          animate={{
            x: (particle.animateX / 500) * dimensions.width,
            y: (particle.animateY / 600) * dimensions.height,
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

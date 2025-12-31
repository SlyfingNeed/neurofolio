"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  x: number;
  y: number;
  layer: number;
  index: number;
  isActive: boolean;
  glowIntensity: number;
  baseColor: "blue" | "white";
}

interface Connection {
  from: Node;
  to: Node;
  isActive: boolean;
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

export default function NeuralNetwork({ activeIndex }: NeuralNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [pulsingNodes, setPulsingNodes] = useState<Set<number>>(new Set());
  const [dimensions, setDimensions] = useState({ width: 500, height: 600 });

  // Initialize the neural network structure
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

  // Create network structure
  useEffect(() => {
    const { width, height } = dimensions;
    const layers = [4, 6, 8, 6, 4]; // Neurons per layer
    const layerSpacing = width / (layers.length + 1);
    const newNodes: Node[] = [];

    layers.forEach((neuronCount, layerIndex) => {
      const verticalSpacing = height / (neuronCount + 1);
      for (let i = 0; i < neuronCount; i++) {
        const isBlue = Math.random() > 0.6; // 40% chance of being blue
        newNodes.push({
          x: layerSpacing * (layerIndex + 1),
          y: verticalSpacing * (i + 1),
          layer: layerIndex,
          index: newNodes.length,
          isActive: false,
          glowIntensity: 0,
          baseColor: isBlue ? "blue" : "white",
        });
      }
    });

    // Create connections between adjacent layers
    const newConnections: Connection[] = [];
    let nodeIndex = 0;

    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerStart = nodeIndex;
      const currentLayerEnd = nodeIndex + layers[l];
      const nextLayerStart = currentLayerEnd;
      const nextLayerEnd = nextLayerStart + layers[l + 1];

      for (let i = currentLayerStart; i < currentLayerEnd; i++) {
        for (let j = nextLayerStart; j < nextLayerEnd; j++) {
          // Only connect some nodes for visual clarity
          if (Math.random() > 0.3) {
            newConnections.push({
              from: newNodes[i],
              to: newNodes[j],
              isActive: false,
            });
          }
        }
      }
      nodeIndex = currentLayerEnd;
    }

    setNodes(newNodes);
    setConnections(newConnections);
  }, [dimensions]);

  // Propagate activation through the network based on typing
  const propagateActivation = useCallback(() => {
    if (nodes.length === 0) return;

    // Calculate which layer should be active based on character index
    const totalLayers = 5;
    const activeLayer = Math.floor((activeIndex * totalLayers) / 20) % totalLayers;

    // Create ripple effect
    const newPulsingNodes = new Set<number>();
    
    nodes.forEach((node, index) => {
      if (node.layer === activeLayer || node.layer === activeLayer - 1 || node.layer === activeLayer + 1) {
        if (Math.random() > 0.4) {
          newPulsingNodes.add(index);
        }
      }
    });

    setPulsingNodes(newPulsingNodes);
  }, [activeIndex, nodes]);

  useEffect(() => {
    propagateActivation();
  }, [propagateActivation]);

  // Ambient animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      const randomActivation = new Set<number>();
      const numToActivate = Math.floor(Math.random() * 5) + 3;
      
      for (let i = 0; i < numToActivate; i++) {
        randomActivation.add(Math.floor(Math.random() * nodes.length));
      }
      
      setPulsingNodes((prev) => {
        const combined = new Set([...prev, ...randomActivation]);
        return combined;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [nodes.length]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[500px]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connections */}
        <g className="connections">
          {connections.map((conn, index) => {
            const fromActive = pulsingNodes.has(conn.from.index);
            const toActive = pulsingNodes.has(conn.to.index);
            const isActive = fromActive || toActive;

            return (
              <motion.line
                key={index}
                x1={conn.from.x}
                y1={conn.from.y}
                x2={conn.to.x}
                y2={conn.to.y}
                className={isActive ? "neural-line-active" : "neural-line"}
                initial={{ opacity: 0.1 }}
                animate={{
                  opacity: isActive ? 0.6 : 0.15,
                  strokeWidth: isActive ? 1.5 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g className="nodes">
          {nodes.map((node, index) => {
            const isActive = pulsingNodes.has(index);
            const isBlue = node.baseColor === "blue";
            const baseSize = isBlue ? 10 : 8;
            const activeSize = baseSize + 4;

            return (
              <g key={index}>
                {/* Glow effect */}
                <AnimatePresence>
                  {isActive && (
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      initial={{ r: baseSize, opacity: 0 }}
                      animate={{ r: activeSize + 15, opacity: 0.3 }}
                      exit={{ r: baseSize, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      fill={isBlue ? "#3b82f6" : "#ffffff"}
                      filter="blur(8px)"
                    />
                  )}
                </AnimatePresence>

                {/* Main node */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isActive ? activeSize : baseSize}
                  fill={isBlue ? "#3b82f6" : isActive ? "#ffffff" : "#888888"}
                  initial={{ scale: 1 }}
                  animate={{
                    scale: isActive ? [1, 1.2, 1] : 1,
                    filter: isActive
                      ? `drop-shadow(0 0 ${isBlue ? "15px #3b82f6" : "10px #ffffff"})`
                      : "none",
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: isActive ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                  style={{
                    filter: isBlue
                      ? "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
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

// Separate component to handle particles with stable random values
function FloatingParticles({ dimensions }: { dimensions: { width: number; height: number } }) {
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      initialX: Math.random() * 500,
      initialY: Math.random() * 600,
      animateX: Math.random() * 500,
      animateY: Math.random() * 600,
      duration: Math.random() * 10 + 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
          initial={{
            x: (particle.initialX / 500) * dimensions.width,
            y: (particle.initialY / 600) * dimensions.height,
          }}
          animate={{
            x: (particle.animateX / 500) * dimensions.width,
            y: (particle.animateY / 600) * dimensions.height,
            opacity: [0.1, 0.5, 0.1],
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
}

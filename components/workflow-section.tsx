"use client";

import React, { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// File type icons as components
const FileIcon = ({
  type,
  className = "w-4 h-4",
}: {
  type: string;
  className?: string;
}) => {
  const icons = {
    pdf: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
      </svg>
    ),
    docx: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M15,13H16.5V18H15V13M9.5,13A1,1 0 0,1 10.5,14V17A1,1 0 0,1 9.5,18H8V13H9.5M9,14V17H9.5V14H9Z" />
      </svg>
    ),
    image: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
      </svg>
    ),
    spreadsheet: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M11,13H9V15H11V13M15,15V13H13V15H15M11,17H9V19H11V17M15,19V17H13V19H15Z" />
      </svg>
    ),
    code: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z" />
      </svg>
    ),
  };

  return icons[type as keyof typeof icons] || icons.pdf;
};

// Animated file cloud component
const FileCloud = () => {
  const fileTypes = ["pdf", "docx", "image", "spreadsheet", "code"];
  const files = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    type: fileTypes[i % fileTypes.length],
    x: 10 + (i % 2) * 30,
    y: 15 + Math.floor(i / 2) * 25,
  }));

  return (
    <div className="relative w-full h-20 md:h-32 overflow-hidden">
      {files.map((file, index) => (
        <motion.div
          key={file.id}
          className="absolute text-muted-foreground/70"
          style={{
            left: `${file.x}%`,
            top: `${file.y}%`,
          }}
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.8, 1, 1, 0.8],
            y: [-10, 0, 40, 60],
          }}
          transition={{
            duration: 4,
            delay: index * 0.3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <FileIcon type={file.type} className="w-4 h-4 md:w-5 md:h-5" />
        </motion.div>
      ))}
    </div>
  );
};

// Custom node components for React Flow
const InputNode = ({ data }: { data: any }) => (
  <motion.div
    className="flex flex-col items-center gap-4 p-4 rounded-xl"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
  >
    <FileCloud />
    <div className="text-center">
      <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1">
        Diverse Inputs
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground">
        Various file types & formats
      </p>
    </div>
  </motion.div>
);

const CoreNode = ({ data }: { data: any }) => (
  <motion.div
    className="relative flex items-center justify-center w-40 h-24 md:w-48 md:h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/20"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
  >
    {/* Pulsing background */}
    <motion.div
      className="absolute inset-0 bg-primary/10 rounded-2xl"
      animate={{
        scale: [1, 1.03, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1],
      }}
    />

    {/* Central knowledge base node */}
    <motion.div
      className="relative z-10 flex flex-col items-center gap-2"
      animate={{ y: [0, -1, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1],
      }}
    >
      <div className="w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center">
        <motion.div
          className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
          }}
        />
      </div>
      <div className="text-center">
        <div className="text-xs md:text-sm font-semibold text-foreground">
          CloudGlance AI Core
        </div>
        <div className="text-[10px] md:text-xs text-muted-foreground">
          Unified Content Library
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const OutputNode = ({ data }: { data: any }) => {
  const { type } = data;

  const configs = {
    analysis: {
      title: "Instant Analysis",
      subtitle: "Real-time insights",
      color: "green",
      bgClass: "from-green-500/10 to-green-600/5",
      borderClass: "border-green-500/20",
      content: (
        <div className="w-12 h-8 md:w-16 md:h-12 bg-green-500/20 rounded-lg flex items-center justify-center relative">
          <motion.div
            className="w-6 h-4 md:w-8 md:h-6 bg-green-500 rounded text-white flex items-center justify-center text-[10px] md:text-xs font-bold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
            }}
          >
            GO
          </motion.div>
          <motion.div
            className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-0.5 h-0.5 md:w-1 md:h-1 bg-green-400 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
            }}
          />
        </div>
      ),
    },
    bid: {
      title: "Automated Bid Draft",
      subtitle: "Smart proposals",
      color: "blue",
      bgClass: "from-blue-500/10 to-blue-600/5",
      borderClass: "border-blue-500/20",
      content: (
        <div className="w-12 h-8 md:w-16 md:h-12 bg-blue-500/20 rounded-lg flex flex-col justify-center p-1.5 md:p-2">
          <motion.div
            className="w-full h-0.5 md:h-1 bg-blue-500 rounded mb-0.5 md:mb-1"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
          />
          <motion.div
            className="w-3/4 h-0.5 md:h-1 bg-blue-400 rounded mb-0.5 md:mb-1"
            initial={{ width: 0 }}
            whileInView={{ width: "75%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
          />
          <motion.div
            className="w-1/2 h-0.5 md:h-1 bg-blue-300 rounded"
            initial={{ width: 0 }}
            whileInView={{ width: "50%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.33, 1, 0.68, 1] }}
          />
        </div>
      ),
    },
    comparison: {
      title: "Strategic Comparison",
      subtitle: "Competitive analysis",
      color: "purple",
      bgClass: "from-purple-500/10 to-purple-600/5",
      borderClass: "border-purple-500/20",
      content: (
        <div className="w-12 h-8 md:w-16 md:h-12 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-0.5 md:gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 md:w-2 md:h-2 bg-purple-500 rounded-full"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: [0.4, 0, 0.6, 1],
                }}
              />
            ))}
          </div>
        </div>
      ),
    },
  };

  const config = configs[type as keyof typeof configs];

  return (
    <motion.div
      className={`flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 bg-gradient-to-br ${config.bgClass} rounded-xl border ${config.borderClass}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.6 }}
    >
      {config.content}
      <div className="text-center">
        <div className="text-xs md:text-sm font-semibold text-foreground">
          {config.title}
        </div>
        <div className="text-[10px] md:text-xs text-muted-foreground">
          {config.subtitle}
        </div>
      </div>
    </motion.div>
  );
};

// Node types for React Flow
const nodeTypes = {
  input: InputNode,
  core: CoreNode,
  output: OutputNode,
};

// Define static node layouts outside component to prevent recreation
const getMobileNodes = (): Node[] => [
  {
    id: "input",
    type: "input",
    position: { x: 100, y: 0 },
    data: {},
    draggable: false,
  },
  {
    id: "core",
    type: "core",
    position: { x: 100, y: 180 },
    data: {},
    draggable: false,
  },
  {
    id: "analysis",
    type: "output",
    position: { x: 50, y: 350 },
    data: { type: "analysis" },
    draggable: false,
  },
  {
    id: "bid",
    type: "output",
    position: { x: 50, y: 470 },
    data: { type: "bid" },
    draggable: false,
  },
  {
    id: "comparison",
    type: "output",
    position: { x: 50, y: 590 },
    data: { type: "comparison" },
    draggable: false,
  },
];

const getDesktopNodes = (): Node[] => [
  {
    id: "input",
    type: "input",
    position: { x: 0, y: 100 },
    data: {},
    draggable: false,
  },
  {
    id: "core",
    type: "core",
    position: { x: 350, y: 110 },
    data: {},
    draggable: false,
  },
  {
    id: "analysis",
    type: "output",
    position: { x: 650, y: 50 },
    data: { type: "analysis" },
    draggable: false,
  },
  {
    id: "bid",
    type: "output",
    position: { x: 650, y: 140 },
    data: { type: "bid" },
    draggable: false,
  },
  {
    id: "comparison",
    type: "output",
    position: { x: 650, y: 230 },
    data: { type: "comparison" },
    draggable: false,
  },
];

// Define edges with much more prominent styling
const initialEdges: Edge[] = [
  {
    id: "input-to-core",
    source: "input",
    target: "core",
    style: { stroke: "#ffffff", strokeWidth: 4, strokeDasharray: "10 10" },
    animated: true,
    type: "smoothstep",
  },
  {
    id: "core-to-analysis",
    source: "core",
    target: "analysis",
    style: { stroke: "#10b981", strokeWidth: 4, strokeDasharray: "10 10" },
    animated: true,
    type: "smoothstep",
  },
  {
    id: "core-to-bid",
    source: "core",
    target: "bid",
    style: { stroke: "#3b82f6", strokeWidth: 4, strokeDasharray: "10 10" },
    animated: true,
    type: "smoothstep",
  },
  {
    id: "core-to-comparison",
    source: "core",
    target: "comparison",
    style: { stroke: "#8b5cf6", strokeWidth: 4, strokeDasharray: "10 10" },
    animated: true,
    type: "smoothstep",
  },
];

export function WorkflowSection() {
  const [nodes, setNodes, onNodesChange] = useNodesState(getMobileNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Switch between mobile and desktop layouts
  React.useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setNodes(isMobile ? getMobileNodes() : getDesktopNodes());
    };

    // Set initial layout
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array since we're using functions

  return (
    <section className="w-full px-5 py-8 md:py-16 flex flex-col justify-center items-center bg-transparent">
      <div className="w-full max-w-6xl relative">
        {/* Background glow - matches BentoSection pattern */}
        <div className="w-[300px] h-[400px] md:w-[547px] md:h-[938px] absolute top-[40%] left-[20%] origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] md:blur-[130px] z-0" />

        {/* Title */}
        <motion.div
          className="text-center mb-8 md:mb-16 relative z-10"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-6xl md:leading-[67px] text-foreground mb-2 md:mb-4">
            The CloudGlance Intelligence Workflow
          </h2>
          <p className="text-sm md:text-lg lg:text-xl font-medium leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            Transform chaotic inputs into clear, strategic outputs with our
            AI-powered content processing pipeline
          </p>
        </motion.div>

        {/* React Flow container */}
        <motion.div
          className="relative z-10 w-full h-[700px] md:h-[350px] bg-background/30 backdrop-blur-sm rounded-2xl border border-border/20 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            proOptions={{ hideAttribution: true }}
            className="workflow-flow"
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling={true}
          >
            <Background color="#ffffff10" />
          </ReactFlow>
        </motion.div>

        {/* Bottom description */}
        <motion.div
          className="text-center mt-8 md:mt-16 max-w-4xl mx-auto relative z-10"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.9 }}
        >
          <p className="text-sm md:text-base text-muted-foreground">
            The workflow flows from diverse inputs, through our unified AI
            processing core, to deliver three distinct strategic outputs:
            instant analysis with go/no-go decisions, automated bid drafts, and
            comprehensive competitive comparisons.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

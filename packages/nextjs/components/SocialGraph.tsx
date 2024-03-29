import { useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";

export type SocialGraphProps = {
  graphData: {
    nodes: Array<{ id: string; label: string; image: string; shape: string; size?: number }>;
    edges: Array<{ from: string; to: string; type: "solid" | "dashed" }>;
  };
};

const SocialGraph = ({ graphData }: SocialGraphProps) => {
  const networkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (networkRef.current && graphData) {
      const { nodes, edges } = graphData;

      // Create an array with nodes
      const nodesDataset = new DataSet(nodes);

      // Create an array with edges
      const edgesDataset = new DataSet(
        edges.map(edge => ({
          ...edge,
          color: edge.type === "solid" ? "green" : "lightgray",
          dashes: edge.type === "dashed",
          smooth: {
            enabled: edge.type === "solid", // Only enable for solid edges if needed
            type: "horizontal",
            roundness: 0.5,
          },
        })),
      );

      // Provide the data in the vis format
      const data = {
        nodes: nodesDataset,
        edges: edgesDataset,
      };

      // The options for the network graph
      const options = {
        nodes: {
          borderWidth: 2,
          size: 30,
          color: {
            border: "#222222",
            background: "#666666",
          },
          font: { color: "#eeeeee" },
          shapeProperties: {
            useImageSize: true,
          },
        },
        edges: {
          color: "lightgray",
          smooth: {
            enabled: false,
            type: "horizontal",
            roundness: 0.5,
          },
        },
        physics: {
          enabled: true, // Disable physics to keep the network static.
        },
        height: "100%",
        width: "100%",
      };

      // Initialize the network!
      const network = new Network(networkRef.current, data, options);

      // Clean up
      return () => {
        if (network) {
          network.destroy();
        }
      };
    }
  }, [graphData]);

  return (
    <div
      ref={networkRef}
      style={{
        height: "80vh",
        width: "100vw",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default SocialGraph;

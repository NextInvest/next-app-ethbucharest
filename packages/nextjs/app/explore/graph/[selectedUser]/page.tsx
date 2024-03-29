"use client";

import { NextPage } from "next";
import UserGraphView, { GraphData } from "~~/components/UserGraphView";

const graphData: GraphData = {
  nodes: [
    { id: "1", label: "CryptoLand", image: "/crypto-icon.png", shape: "circularImage" },
    { id: "2", label: "Alice", image: "/profile-alice.jpg", shape: "circularImage" },
    { id: "3", label: "Bob", image: "/profile-bob.jpg", shape: "circularImage" },
    { id: "4", label: "Charlie", image: "/profile-charlie.jpg", shape: "circularImage" },
    { id: "5", label: "Diana", image: "/profile-diana.jpg", shape: "circularImage" },
    { id: "6", label: "Edward", image: "/profile-edward.jpg", shape: "circularImage" },
  ],
  edges: [
    { from: "1", to: "2", type: "solid" },
    { from: "1", to: "3", type: "dashed" },
    { from: "1", to: "4", type: "dashed" },
    { from: "1", to: "5", type: "dashed" },
    { from: "1", to: "6", type: "dashed" },
  ],
};

type PageProps = {
  params: { selectedUser: string };
};
const ExploreGraph: NextPage<PageProps> = ({ params }: PageProps) => {
  const getData = (params: { selectedUser: string }) => {
    return { graphData, subscribers: 12, visitors: 23, totalInvestment: "100", projectName: params.selectedUser };
  };
  const data = getData(params);
  return (
    <div className="container mx-auto p-4">
      <UserGraphView {...data} />
    </div>
  );
};

export default ExploreGraph;

import SocialGraph from "./SocialGraph";

export type UserGraphViewProps = {
  projectName: string;
  totalInvestment: string | number;
  visitors: number;
  subscribers: number;
  graphData: GraphData;
};

export type GraphData = {
  nodes: Array<{ id: string; label: string; image: string; shape: string }>;
  edges: Array<{ from: string; to: string; type: "solid" | "dashed" }>;
};

const UserGraphView: React.FC<UserGraphViewProps> = ({
  projectName,
  totalInvestment,
  visitors,
  subscribers,
  graphData,
}) => {
  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">{projectName}</h1>
      <div className="flex justify-around items-center mb-6">
        <div>Total amount of investment</div>
        <div className="text-lg font-bold">{totalInvestment} $</div>
        <div>Visitors</div>
        <div className="text-lg font-bold">{visitors}</div>
        <div>Subscribe</div>
        <div className="text-lg font-bold">{subscribers}</div>
      </div>

      <SocialGraph graphData={graphData} />
    </div>
  );
};

export default UserGraphView;

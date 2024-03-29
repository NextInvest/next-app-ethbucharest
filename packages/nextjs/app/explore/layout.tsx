import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Explore Next",
  description: "Explore Next investments and investors",
});

const ExploreLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ExploreLayout;

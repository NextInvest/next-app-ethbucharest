"use client";

import SearchBarWithFilters from "../_components/SearchBarWithFilters";
import SearchResults from "~~/components/SearchResults";

const ExploreStartups = () => {
  return (
    <div className="container mx-auto p-4">
      <SearchBarWithFilters />
      <SearchResults />
    </div>
  );
};

export default ExploreStartups;

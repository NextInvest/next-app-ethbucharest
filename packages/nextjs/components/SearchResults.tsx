import React from "react";

interface CompanyCardProps {
  logo: string; // Assuming the logo is a URL to an image
  name: string;
  sector: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ logo, name, sector }) => {
  return (
    <div className="bg-nextCardBg p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <img src={logo} alt={`${name} logo`} className="h-10 w-10 rounded-full mr-3" />
        <div>
          <div className="text-white font-bold">{name}</div>
          <div className="text-gray-400">{sector}</div>
        </div>
      </div>
      <div className="flex">
        <button className="bg-blue-600 text-white mr-2 px-3 py-1 rounded">Graph</button>
        <button className="bg-green-600 text-white px-3 py-1 rounded">Details</button>
      </div>
    </div>
  );
};

const SearchResults: React.FC = () => {
  // This data could be fetched from an API or passed down as props
  const companies = [
    { logo: "/logos/logo1.png", name: "TechTrend Solutions", sector: "Healthcare industry" },
    // ...more companies
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company, index) => (
          <CompanyCard key={index} logo={company.logo} name={company.name} sector={company.sector} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

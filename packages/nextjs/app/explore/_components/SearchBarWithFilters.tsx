import React, { useState } from "react";

const SearchBarWithFilters: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  // Replace the following with your actual data fetching logic
  const countries = ["Romania"]; // Example countries
  const cities = ["Bucharest"]; // Example cities
  const sectors = ["Sector"]; // Example sectors

  const handleSearch = () => {
    // Implement your search logic here
    console.log(searchQuery, selectedCountry, selectedCity, selectedSector);
  };

  return (
    <div className="flex flex-wrap items-center space-x-4 p-4 bg-green-800">
      <input
        type="text"
        placeholder="Company name, sector, city"
        className="flex-grow p-2 rounded-lg"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <select
        className="p-2 rounded-lg bg-gray-700 text-white"
        value={selectedCountry}
        onChange={e => setSelectedCountry(e.target.value)}
      >
        {countries.map(country => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        className="p-2 rounded-lg bg-gray-700 text-white"
        value={selectedCity}
        onChange={e => setSelectedCity(e.target.value)}
      >
        {cities.map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select
        className="p-2 rounded-lg bg-gray-700 text-white"
        value={selectedSector}
        onChange={e => setSelectedSector(e.target.value)}
      >
        {sectors.map(sector => (
          <option key={sector} value={sector}>
            {sector}
          </option>
        ))}
      </select>
      <button className="px-4 py-2 rounded-lg bg-green-600 text-white" onClick={handleSearch}>
        Show
      </button>
    </div>
  );
};

export default SearchBarWithFilters;

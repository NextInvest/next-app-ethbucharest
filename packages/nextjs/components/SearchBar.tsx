export default function SearchBar() {
  return (
    <div className="flex flex-wrap justify-between items-center w-full p-4 bg-green-900">
      <div className="flex-grow mb-4 md:mb-0">
        <input type="text" placeholder="What are you looking for?" className="w-full p-2 rounded-l-lg" />
      </div>
      <div className="flex-grow mb-4 md:mb-0">
        <input type="text" placeholder="Location" className="w-full p-2" />
      </div>
      <div className="flex-grow mb-4 md:mb-0">
        <select className="w-full p-2 rounded-r-lg">
          <option value="">Categories</option>
          {/* Add your categories here */}
        </select>
      </div>
      <div className="md:flex-grow-0">
        <button className="w-full md:w-auto bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">Search</button>
      </div>
    </div>
  );
}

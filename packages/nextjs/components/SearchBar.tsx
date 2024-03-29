import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

export default function SearchBar() {
  return (
    <div className="flex flex-wrap justify-between items-center w-full md:w-4/6 bg-nextCardBg rounded-2xl">
      <div className="flex-grow px-4 mb-4 md:mb-0">
        <input type="text" placeholder="What are you looking for?" className="w-full p-2 rounded-l-lg bg-nextCardBg" />
      </div>
      <div className="flex-grow mb-4 px-4 md:mb-0">
        <input type="text" placeholder="Location" className="w-full p-2 bg-nextCardBg" />
      </div>
      <div className="flex-grow mb-4 px-4 md:mb-0">
        <select className="w-full p-2 rounded-r-lg bg-nextCardBg">
          <option value="">Categories</option>
        </select>
      </div>
      <div className="md:flex-grow-0">
        <button
          type="button"
          className="btn btn-lg rounded-[100px]
            bg-gradient-to-r from-gradientGreen to-gradientBlue hover:bg-gradient-to-br
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gradientGreen
            h-16 xl:h-[4.25rem]
            "
        >
          Search
          <MagnifyingGlassCircleIcon
            className="-mr-8 h-16 w-16 xl:h-[4.25rem] xl:w-[4.25rem] text-white"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}

import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <>
      {/* <Head>
        <title>FIND USEFUL INVESTMENTS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head> */}

      <div className="text-white text-center py-20 mt-10 px-4">
        <h1 className="text-5xl md:text-6xl xl:text-9xl font-bold mb-6 text-left">FIND USEFUL</h1>
        <h1 className="text-5xl md:text-6xl xl:text-9xl font-bold mb-6 text-left text-nextGreen">INVESTMENTS</h1>
        <SearchBar />
        {/* <p className="mt-6">Schedule a call with an investor with just a few clicks</p>
        <button className="bg-green-600 mt-4 px-6 py-3 rounded-full font-bold hover:bg-green-700">Book a pitch</button> */}
      </div>
    </>
  );
}

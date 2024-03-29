"use client";

// import Link from "next/link";
// import type { NextPage } from "next";
// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
// const Home: NextPage = () => {
//   const { address: connectedAddress } = useAccount();
//   return (
//     <>
//       <div className="flex items-center flex-col flex-grow pt-10">
//         <div className="px-5">
//           <h1 className="text-center">
//             <span className="block text-2xl mb-2">Welcome to</span>
//             <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
//           </h1>
//           <div className="flex justify-center items-center space-x-2">
//             <p className="my-2 font-medium">Connected Address:</p>
//             <Address address={connectedAddress} />
//           </div>
//           <p className="text-center text-lg">
//             Get started by editing{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/nextjs/app/page.tsx
//             </code>
//           </p>
//           <p className="text-center text-lg">
//             Edit your smart contract{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               YourContract.sol
//             </code>{" "}
//             in{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/hardhat/contracts
//             </code>
//           </p>
//         </div>
//         <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
//           <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <BugAntIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Tinker with your smart contract using the{" "}
//                 <Link href="/debug" passHref className="link">
//                   Debug Contracts
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Explore your local transactions with the{" "}
//                 <Link href="/blockexplorer" passHref className="link">
//                   Block Explorer
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Home;
import { useState } from "react";
import Head from "next/head";
import SearchBar from "../components/SearchBar";
import Modal from "~~/components/SignUpModal";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>FIND USEFUL INVESTMENTS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header className="bg-green-900 text-white">
        <div className="container mx-auto p-5">
          <nav className="flex justify-between items-center">
            <a href="#" className="text-xl font-bold">
              NEXT.
            </a>
            <div className="hidden md:flex space-x-4">
              {/* Navigation Links */}
              <a href="#" className="hover:underline">
                Home
              </a>
              <a href="#" className="hover:underline">
                DAO
              </a>
              <a href="#" className="hover:underline">
                Wallet
              </a>
              <a href="#" className="hover:underline">
                Startups
              </a>
              <a href="#" className="hover:underline">
                Inbox
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="md:hidden hover:underline">
                Menu
              </a>
              <button className="hover:underline" onClick={() => setModalOpen(true)}>
                Sign up
              </button>
            </div>
          </nav>
        </div>
      </header>
      {isModalOpen && <Modal onClose={() => setModalOpen(false)} />}
      <main className="bg-green-800 text-white text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6">FIND USEFUL INVESTMENTS</h1>
        <SearchBar />
        <p className="mt-6">Schedule a call with an investor with just a few clicks</p>
        <button className="bg-green-600 mt-4 px-6 py-3 rounded-full font-bold hover:bg-green-700">Book a pitch</button>
      </main>
    </>
  );
}

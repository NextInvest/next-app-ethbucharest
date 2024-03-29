import { useState } from "react";

export type SignUpModalProps = {
  onClose: () => any;
};

export default function Modal({ onClose }: SignUpModalProps) {
  // You can manage the selected wallet with state if necessary
  const [wallet, setWallet] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl p-8">
        <div className="text-right">
          <button onClick={onClose} className="text-black hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sign up</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Satoshi Nakomoto"
              className="border-2 border-gray-300 rounded-lg w-full px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <p>Connect your wallet</p>
            <button
              onClick={() => setWallet("metamask")}
              className={`w-full bg-blue-500 text-white px-6 py-2 rounded-lg my-2 ${
                wallet === "metamask" ? "ring-2 ring-offset-2 ring-offset-blue-200 ring-white ring-opacity-60" : ""
              }`}
            >
              Metamask
            </button>
            <button
              onClick={() => setWallet("walletConnect")}
              className={`w-full bg-blue-700 text-white px-6 py-2 rounded-lg ${
                wallet === "walletConnect" ? "ring-2 ring-offset-2 ring-offset-blue-200 ring-white ring-opacity-60" : ""
              }`}
            >
              WalletConnect
            </button>
          </div>
          <div className="mb-4">
            <p>Type of profile</p>
            <select className="border-2 border-gray-300 rounded-lg w-full px-3 py-2">
              {/* Populate with options */}
              <option>Investor</option>
            </select>
          </div>
          <div>
            <a href="/signup">
              <button className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Sign up
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

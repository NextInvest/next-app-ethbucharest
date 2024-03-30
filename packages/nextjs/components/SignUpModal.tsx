export type SignUpModalProps = {
  onClose: () => any;
};

export default function Modal({ onClose }: SignUpModalProps) {
  return (
    <div className="fixed inset-0 secondary-background flex justify-center items-center z-10">
      <div className="bg-nextCardBg bg-opacity-50 rounded-lg shadow-2xl p-8">
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
              placeholder="Profile name"
              className="border-2 border-gray-300 rounded-lg w-full px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <p>Type of profile</p>
            <select className="border-2 border-gray-300 rounded-lg w-full px-3 py-2">
              {/* Populate with options */}
              <option>Investor</option>
              <option>Startup</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email (optional)"
              className="border-2 border-gray-300 rounded-lg w-full px-3 py-2"
            />
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

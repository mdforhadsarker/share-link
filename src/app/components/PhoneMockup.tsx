export default function PhoneMockup({ links }) {
  return (
    <div className="flex justify-center items-center h-full p-4">
      <div className="bg-white w-[300px] h-[650px] rounded-3xl shadow-md border border-gray-300 relative p-6">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gray-200 rounded-b-lg"></div>

        {/* Phone Content */}
        <div className="mt-6 flex flex-col space-y-4">
          {/* User Avatar */}
          <div className="flex justify-center items-center">
            <div className="bg-gray-200 w-16 h-16 rounded-full"></div>
          </div>

          {/* Placeholder for User Info */}
          <div className="flex flex-col space-y-2">
            <div className="bg-gray-200 h-4 w-24 mx-auto rounded-md"></div>
            <div className="bg-gray-200 h-3 w-16 mx-auto rounded-md"></div>
          </div>

          {/* Buttons for Social Links */}
          <div className="space-y-4">
            {links.map((item, index) => (
              <button
                key={index}
                className={`w-full py-2 rounded text-white ${
                  item.platform === "GitHub"
                    ? "bg-black"
                    : item.platform === "YouTube"
                    ? "bg-red-600"
                    : "bg-blue-600"
                } flex items-center justify-center`}
              >
                {item.platform}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrowserMockup() {
    return (
      <div className="relative group transition-transform duration-300 ease-in-out transform rotate-3 hover:rotate-0">
        <div className="bg-gradient-to-br from-[hsl(var(--gradient-from))] to-[hsl(var(--gradient-to))] rounded-xl shadow-2xl p-2.5">
          <div className="bg-gray-900/80 rounded-lg">
            <div className="flex items-center p-3 border-b border-gray-700">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-3 pt-4">
                <div className="h-5 bg-gray-700 rounded w-5/6 animate-pulse delay-75"></div>
                <div className="h-5 bg-gray-700 rounded w-full animate-pulse delay-150"></div>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="h-20 bg-gray-800 rounded-md animate-pulse delay-200"></div>
                  <div className="h-20 bg-gray-800 rounded-md animate-pulse delay-300"></div>
                  <div className="h-20 bg-gray-800 rounded-md animate-pulse delay-400"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
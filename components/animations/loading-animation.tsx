import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="flex space-x-6">
      {/* Washing machine drum 1 */}
      <div className="w-20 h-20 bg-gray-300 rounded-full relative animate-spin-slow">
        <div className="w-16 h-16 bg-gray-100 rounded-full absolute top-2 left-2"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full absolute top-5 left-5"></div>
        <div className="w-2 h-2 bg-red-400 rounded-full absolute top-10 right-5"></div>
      </div>

      {/* Washing machine drum 2 */}
      <div className="w-20 h-20 bg-gray-300 rounded-full relative animate-spin-reverse">
        <div className="w-16 h-16 bg-gray-100 rounded-full absolute top-2 left-2"></div>
        <div className="w-3 h-3 bg-yellow-400 rounded-full absolute top-5 left-5"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full absolute top-10 right-5"></div>
      </div>

      {/* Washing machine drum 3 */}
      <div className="w-20 h-20 bg-gray-300 rounded-full relative animate-spin-slow">
        <div className="w-16 h-16 bg-gray-100 rounded-full absolute top-2 left-2"></div>
        <div className="w-3 h-3 bg-purple-400 rounded-full absolute top-5 left-5"></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full absolute top-10 right-5"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;

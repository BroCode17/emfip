import LoadingAnimation from "./animations/loading-animation";

const LaundryLoading = () => {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <LoadingAnimation />
            <p className="mt-6 text-xl text-gray-600">Doing Laundry...</p>
          </div>
        );
      };
      
      export default LaundryLoading;
      
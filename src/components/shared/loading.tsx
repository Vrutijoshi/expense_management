export default function LoadingPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          
          {/* Loading Text */}
          <p className="mt-6 text-lg font-semibold text-gray-700">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }
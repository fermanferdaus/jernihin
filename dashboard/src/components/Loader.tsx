export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950">
      <div className="relative w-14 h-14 mb-5">
        <div className="absolute inset-0 rounded-full border-[3px] border-gray-700"></div>
        <div className="absolute inset-0 rounded-full border-[3px] border-t-blue-500 animate-spin"></div>
      </div>

      <h2 className="text-gray-200 font-medium text-lg animate-pulse">
        Loading...
      </h2>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#523628]">
      <div className="w-12 h-12 border-4 border-[#f08c50] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-[#f4eae6] text-lg">Loading...</p>
    </div>
  );
}

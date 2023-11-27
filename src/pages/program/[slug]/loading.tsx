export default function Loading() {
  return (
    <>
      <div className="bg-gray-100 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md min-h-screen">
          <div className="h-[250px] bg-zinc-400 animate-pulse"></div>
          <div className="h-5 bg-zinc-400 my-2 mx-4 animate-pulse w-[25%] rounded"></div>
          <div className="h-16 bg-zinc-400 my-2 mx-4 animate-pulse rounded"></div>
          <div className="h-30 bg-zinc-400 my-2 mx-4 animate-pulse rounded"></div>
          <div className="h-40 bg-zinc-400 my-2 mx-4 animate-pulse rounded"></div>
          <div className="h-50 bg-zinc-400 my-2 mx-4 animate-pulse rounded"></div>
          <div className="h-60 bg-zinc-400 my-2 mx-4 animate-pulse rounded"></div>
          </div>
          
        </div>
      </div>
    </>
  );
}

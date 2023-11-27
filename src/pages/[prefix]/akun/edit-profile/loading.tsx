export default function Loading() {
  return (
    <>
      <div className="bg-gray-100 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md min-h-screen">
          <div className="h-[50px] bg-zinc-400 animate-pulse"></div>
            {[...new Array(4)].map((_,index) => (
                <>
                <div key={index} className="h-5 bg-zinc-400 my-2 mx-4 animate-pulse w-[25%] rounded"></div>
                <div key={index} className="h-10 bg-zinc-400 my-2 mx-4 animate-pulse rounded"></div>
                </>
                
            ))}
            <div className="h-10 bg-zinc-400 my-2 mx-4 animate-pulse"></div>
          </div>
          
        </div>
      </div>
    </>
  );
}
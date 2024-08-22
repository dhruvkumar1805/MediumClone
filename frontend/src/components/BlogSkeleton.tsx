export const BlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="p-7 border-b border-slate-200 pb-3 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
        <div className="text-md font-thin">
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
        <div className="text-md font-thin">
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
        <div className="text-slate-500 text-sm font-thin pt-2">
          <div className="h-2 bg-gray-200 rounded-full mb-2.5 max-w-32"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const FullBlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="p-4 md:p-10 w-full max-w-screen-xl pt-6 md:pt-12">
        <div className="h-8 bg-gray-200 rounded-full w-full md:w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded-full w-full md:w-3/4 mb-6"></div>
        <div className="h-4 bg-gray-200 rounded-full w-2/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/4 mb-8"></div>
        <div className="flex md:hidden mb-8">
          <div className="flex justify-center items-center">
            <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="h-4 bg-gray-200 rounded-full w-32"></div>
              <div className="h-4 bg-gray-200 rounded-full w-32"></div>
            </div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-full mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-full w-full mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-full w-5/6 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-full w-2/3 mb-4"></div>
        <div className="hidden md:flex mt-12">
          <div className="h-16 w-16 bg-gray-200 rounded-full mr-4"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

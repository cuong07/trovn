const Index = () => {
  return (
    <div>
      <div className="lg:grid lg:grid-cols-2 grid-cols-1 gap-4 h-[560px] overflow-hidden rounded-xl ">
        <div className="bg-[#E6E6E6] animate-pulse"></div>
        <div className="lg:grid hidden grid-cols-2 gap-4">
          <div className="grid grid-rows-2  gap-2">
            <div className="bg-[#E6E6E6] animate-pulse"></div>
            <div className="bg-[#E6E6E6] animate-pulse"></div>
          </div>
          <div className="grid grid-rows-2  gap-2">
            <div className="bg-[#E6E6E6] animate-pulse"></div>
            <div className="bg-[#E6E6E6] animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2 mt-8 flex flex-col gap-2">
          <div className="bg-[#E6E6E6] animate-pulse w-2/5 h-6"></div>
          <div className="bg-[#E6E6E6] animate-pulse w-4/5 h-6"></div>
          <div className="bg-[#E6E6E6] animate-pulse  w-4/5 h-6"></div>
          <div className="bg-[#E6E6E6] animate-pulse  w-4/5 h-6"></div>
        </div>
        <div className="col-span-1">
          <div className="bg-[#E6E6E6] animate-pulse rounded-md pl-20 h-[300px] mt-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;

/* eslint-disable react/prop-types */
import { Skeleton } from "antd";
import { ListingCard } from "../../../components";
import useListingStore from "../../../hooks/useListingStore";
import SkeletonImage from "antd/es/skeleton/Image";

const Index = ({ data }) => {
  const {
    listings: { isLoading },
  } = useListingStore();
  return (
    <div className=" grid grid-cols-5 px-20 gap-6">
      {data.map((item) => (
        <ListingCard listing={item} key={item.id} />
      ))}
      {isLoading &&
        new Array(10).fill(0).map((_, index) => (
          <div key={index}>
            <div className="w-full mb-2 rounded-xl animate-pulse aspect-square bg-[#F0F0F0]"></div>
            <Skeleton className=" animate-pulse" />
          </div>
        ))}
    </div>
  );
};

export default Index;

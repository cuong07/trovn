import React, { useEffect } from "react";
import { getFavorites } from "@/apis/favorite";
import useFavoriteStore from "@/hooks/useFavoriteStore";
import ProductList from "../Home/ProductList";
import { Empty } from "antd";

const Index = () => {
  const { favorites } = useFavoriteStore();
  const listings = favorites?.map((item) => item.listing);
  useEffect(() => {
    (async () => {
      await getFavorites();
    })();
  }, []);
  return (
    <div className="container mx-auto my-10">
      <div className="md:px-20 px-6 mb-6">
        <h1 className="text-2xl font-semibold">Danh sách yêu thích</h1>
      </div>

      <ProductList data={listings} column={4} />
      {listings.length === 0 && (
        <Empty
          className="md:h-[600px] h-svh"
          description="Danh sách yêu thích trống"
        />
      )}
    </div>
  );
};

export default Index;

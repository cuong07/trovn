import { useEffect } from "react";
import useListingStore from "../../hooks/useListingStore";
import { getListings } from "../../apis/listing";
import ProductList from "../Home/ProductList";

const Index = () => {
  const {
    listings: { filter },
    searchListing: { contents },
    setSearchListings,
  } = useListingStore();
  const { keyword } = filter;
  useEffect(() => {
    (async () => {
      const { data } = await getListings();
      setSearchListings(data);
    })();
  }, [keyword, setSearchListings]);
  console.log(contents);
  return (
    <div>
      <ProductList data={contents} />
    </div>
  );
};

export default Index;

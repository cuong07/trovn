import { useEffect } from "react";
import useListingStore from "../../hooks/useListingStore";
import { getListings } from "../../apis/listing";

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
  return <div>Search</div>;
};

export default Index;

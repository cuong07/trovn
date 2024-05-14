/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SliderFilter } from "../../components";
import { getAllAmenity } from "../../apis/amenities";
import { getListings } from "../../apis/listing";
import useListingStore from "../../hooks/useListingStore";

const Index = () => {
  const [amenities, setAmenities] = useState([]);
  const { setListings, listings } = useListingStore();

  useEffect(() => {
    (async () => {
      const { data } = await getAllAmenity();
      setAmenities(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await getListings(0, 100, { keyword: "" });
      setListings({ data });
    })();
  }, []);
  console.log(listings);
  return (
    <div>
      <SliderFilter data={amenities} />
    </div>
  );
};

export default Index;

/* eslint-disable react/prop-types */
const Index = ({ listingAmenities }) => {
  console.log(listingAmenities);
  return (
    <div className="grid grid-cols-2 gap-4">
      {listingAmenities?.map((item) => (
        <div key={item.id} className="flex gap-4">
          <div>
            <img
              src={item.amenity.iconUrl}
              alt={item.amenity.name}
              className="w-6 h-6"
            />
          </div>
          <div className="text-base leading-5">{item.amenity.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Index;

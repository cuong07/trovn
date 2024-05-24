/* eslint-disable react/prop-types */
import { MapListing } from "..";
import { getTerm } from "../../utils/helpers";

const Index = ({ newListing, locations, amenities }) => {
  const {
    title,
    description,
    area,
    address,
    term,
    amenityConnections,
    longitude,
    latitude,
  } = newListing;
  const filteredAmenities = amenities.filter((amenity) =>
    amenityConnections.includes(amenity.id)
  );
  const mappedAmenities = amenityConnections.map((id) =>
    filteredAmenities.find((amenity) => amenity.id === id)
  );

  return (
    <div className="grid grid-cols-2 h-full gap-4">
      <div className="h-full p-4 bg-white rounded-xl">
        <h2 className="text-3xl text-center">Xem trước</h2>
        <div className="grid gap-4">
          <div>
            <div className="mb-1 font-semibold">Tiêu đề:</div>
            <div className="text-2xl font-semibold">
              {title?.length > 0 ? title : "Chưa nhập tên"}
            </div>
          </div>
          <div>
            <div className="mb-1 font-semibold">Chi tiết:</div>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  description?.length > 0
                    ? description
                    : "<p>Chưa có giới thiệu<p>",
              }}
            />
          </div>
          <div>
            <div className="mb-1 font-semibold">Diện tích:</div>
            <div>
              {area}m<sup>2</sup>
            </div>
          </div>
          <div>
            <div className="mb-1 font-semibold">Tiện ích:</div>
            <div className="grid grid-cols-2">
              {mappedAmenities.map((item) => (
                <div key={item.id} className="flex gap-2 items-center">
                  <img src={item.iconUrl} className="w-6" />
                  <div>{item.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1 font-semibold">Địa chỉ:</div>
            <div className="">{address}</div>
          </div>
          <div>
            <div className="mb-1 font-semibold">
              Phuong thức cho thuê phòng:
            </div>
            <div className="">{getTerm(term)}</div>
          </div>
        </div>
      </div>
      <div className=" h-full rounded-xl overflow-hidden">
        <MapListing longitude={longitude} latitude={latitude} />
      </div>
    </div>
  );
};

export default Index;

/* eslint-disable react/prop-types */
import FroalaEditor from "react-froala-wysiwyg";
import { Select } from "antd";

import { Input } from "..";
import useListingStore from "../../hooks/useListingStore";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";

const Index = ({ amenities, locations }) => {
  const { updateListing, newListing } = useListingStore();

  const amenityOptions = amenities.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const locationOptions = locations.map((item) => ({
    label: `${item.name} - ${item.city}`,
    value: item.id,
  }));

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    updateListing(name, value);
  };

  return (
    <div className="grid grid-cols-5 gap-4 h-full w-full">
      <div className="grid gap-4 col-span-2 h-full">
        <div className="bg-white p-6 rounded-xl h-full border">
          <div className="mb-4">
            <h2 className="font-semibold text-2xl">Thông tin chi tiết</h2>
            <div className="text-sm text-[#717171] ">
              Điều quan trọng là phải kiên nhẫn, được khách hàng làm theo
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">Tiêu đề</div>
              <Input
                value={newListing.title}
                name="title"
                onChange={handleChangeInput}
                type="text"
                required
              />
            </div>
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">Mô tả</div>
              <FroalaEditor
                description
                tag="area"
                // model={content}
                model={newListing.description}
                onModelChange={(value) => updateListing("description", value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 grid gap-4 h-full">
        <div className="bg-white p-6 rounded-xl border h-full">
          <div className="mb-4">
            <h2 className="font-semibold text-2xl">Giá phòng và diện tích</h2>
            <div className="text-sm text-[#717171] ">
              Giá cả tối ưu là lựa chọn tốt nhất
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">Giá</div>
              <Input
                value={newListing.price}
                name="price"
                onChange={handleChangeInput}
                type="text"
              />
            </div>
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">
                Diện tích
              </div>
              <Input
                value={newListing.area}
                name="area"
                onChange={handleChangeInput}
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border h-full">
          <div className="mb-4">
            <h2 className="font-semibold text-2xl">Địa chỉ</h2>
            <div className="text-sm text-[#717171] ">Thành phố</div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">
                Tỉnh / Thành phố
              </div>
              <Select
                showSearch
                style={{
                  width: 200,
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(value) => updateListing("locationId", value)}
                options={locationOptions}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 grid gap-4 h">
        <div className="bg-white p-6 rounded-xl border">
          <div className="mb-4">
            <h2 className="font-semibold text-2xl">Phương thức cho thuê</h2>
            <div className="text-sm text-[#717171] ">
              Chọn phương thức cho thue
            </div>
          </div>
          <div className="grid gap-4">
            <div className="text-sm leading-[14px] font-medium">
              Phương thức
            </div>
            <Select
              className="w-full min-h-10 rounded-md text-sm "
              value={newListing.term}
              onChange={(value) => updateListing("term", value)}
              options={[
                {
                  label: "Cho thuê ngắn hạn",
                  value: "SHORT",
                },
                {
                  label: "Cho thuê dài hạn",
                  value: "LONG",
                },
                {
                  label: "Cho thuê ngắn hạn và dài hạn",
                  value: "BOTH",
                },
              ]}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <div className="mb-4">
            <h2 className="font-semibold text-2xl">Tiện ích và dịch vụ</h2>
            <div className="text-sm text-[#717171] ">
              Những tiện ích và dịch vụ của nhà ở
            </div>
          </div>
          <div className="grid gap-3">
            <div className="text-sm leading-[14px] font-medium">Tiện ích</div>
            <Select
              className="w-full min-h-10 rounded-md text-sm "
              mode="multiple"
              value={newListing.amenityConnections}
              onChange={(value) => updateListing("amenityConnections", value)}
              options={amenityOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

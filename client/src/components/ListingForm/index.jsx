import { useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import { Input } from "..";

const Index = () => {
  const [content, setContent] = useState("");

  const handleModelChange = (model) => {
    setContent(model);
  };
  console.log(content);

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="grid gap-4 col-span-2">
        <div className="bg-white p-6 rounded-xl border">
          <div className="mb-4">
            <h2 className="font-semibold text-2xl">Thông tin chi tiết</h2>
            <div className="text-sm text-[#717171] ">
              Điều quan trọng là phải kiên nhẫn, được khách hàng làm theo
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">Tiêu đề</div>
              <Input type="text" />
            </div>
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">Mô tả</div>
              <FroalaEditor
                description
                tag="area"
                model={content}
                onModelChange={handleModelChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 grid gap-4">
        <div className="bg-white p-6 rounded-xl border">
          <div className="mb-4">
            <h2 className="font-semibold text-2xl">Giá phòng và diện tích</h2>
            <div className="text-sm text-[#717171] ">
              Điều quan trọng là phải kiên nhẫn, được khách hàng làm theo
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">Giá</div>
              <Input type="text" />
            </div>
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">
                Diện tích
              </div>
              <Input type="text" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <div className="mb-4">
            <h2 className="font-semibold text-2xl">Giá phòng và diện tích</h2>
            <div className="text-sm text-[#717171] ">
              Điều quan trọng là phải kiên nhẫn, được khách hàng làm theo
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">Giá</div>
              <Input type="text" />
            </div>
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">
                Diện tích
              </div>
              <Input type="text" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="bg-white p-6 rounded-xl border">
          <div className="mb-4">
            <h2 className="font-semibold text-2xl">Giá phòng và diện tích</h2>
            <div className="text-sm text-[#717171] ">
              Điều quan trọng là phải kiên nhẫn, được khách hàng làm theo
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">Giá</div>
              <Input type="text" />
            </div>
            <div className="grid gap-3">
              <div className="text-sm leading-[14px] font-medium">
                Diện tích
              </div>
              <Input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

import { Table } from "antd";
import { useEffect, useState } from "react";
import { getListings } from "../../../../apis/listing";
const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  Table.EXPAND_COLUMN,
  {
    title: "Amenity",
    dataIndex: "listingAmenities.amenity.name",
    key: "amenity",
  },
  Table.SELECTION_COLUMN,
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const Index = () => {
  const [listings, setListing] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        data: { contents },
        sucess,
        message,
      } = await getListings();
      setListing(contents);
    })();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        rowSelection={{}}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.description}
            </p>
          ),
        }}
        dataSource={listings}
      />
    </div>
  );
};

export default Index;

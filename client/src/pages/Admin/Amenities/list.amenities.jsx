import React from 'react';
import { getAllAmenity } from "@/apis/amenities";
import { useEffect, useState } from "react";
import { Table, Pagination } from "antd";

function ListAmenities(){
    const [amenities, setAmenities] = useState([{}]);
    
    useEffect(()=>{
        const getData = async()=>{
            const {data} = await getAllAmenity();
            setAmenities((pre)=>[...data]);
        }
        getData();
    },[])
    console.log("Amenities: ",amenities);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: 230,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            width: 100,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            width: 100,
        },
        {
            title: "Link ảnh",
            dataIndex: "iconUrl",
            key: "iconUrl",
            width: 300,
            render: (iconUrl) => <a>{iconUrl}</a>
        },
    ]
    return (
        <div>
            
            <Table
                columns={columns}
                dataSource={amenities}
                pagination={{
                    pageSize: 5,
                  }}
            />
        </div>
    )
}

export default ListAmenities;
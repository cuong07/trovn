import React from 'react';
import { getAllAmenity } from "@/apis/amenities";
import { useEffect, useState } from "react";
import { Table , Modal, Button  } from "antd";
import { AiOutlineDelete} from "react-icons/ai";
import { deleteAmenityById } from '@/apis/amenities';


function ListAmenities(){
    const [amenities, setAmenities] = useState([{}]);
    const [deleteAmenity, setDeleteAmenity] = useState("");
    const [deleted, setDeleted] = useState(false);
    
    useEffect(()=>{
        const getData = async()=>{
            const {data} = await getAllAmenity();
            setAmenities((pre)=>[...data]);
        }
        getData();
    },[deleted])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        const res = await deleteAmenityById(deleteAmenity);
        setDeleted(!deleted);
        alert('Đã xóa Tiện nghi');
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDeleteClick = (id)=>{
        setDeleteAmenity(id);
        setIsModalOpen(true);
    }
    

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
            title: "Ảnh",
            dataIndex: "iconUrl",
            key: "iconUrl",
            width: 300,
            render: (iconUrl) => <img style={{height: "50px"}} src={iconUrl}/>
        },
        {
            title: "Xóa",
            key: "delete",
            dataIndex: "id",
            width: 60,
            align: 'center',
            render: (id)=><AiOutlineDelete className='text-4xl text-rose-500 text-center w-full' onClick={()=>handleDeleteClick(id)}/>
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
            <Modal title="Xóa Amenity" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn chắc chắn muốn xóa Tiện nghi: {deleteAmenity}</p>
            </Modal>
        </div>
    )
}

export default ListAmenities;
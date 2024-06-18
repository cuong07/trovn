import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getListingByUserId, getUser } from "@/apis/user";
import { Grid } from "antd";
import { BiCamera, BiCheck } from "react-icons/bi";

const Index = () => {
    const { id } = useParams();
    const [user, setUser] = useState();
    const [listings, setListings] = useState();

    useEffect(() => {
        (async () => {
            const [res1, res2] = await Promise.all([
                getUser(id),
                getListingByUserId(id),
            ]);
            console.log(res2);
            setUser(res1);
            setListings(res2.data);
        })();
    }, [id]);

    return (
        <div className="container md:px-40 mx-auto grid grid-cols-3 gap-4 ">
            <div className="col-span-1 relative">
                <div className="sticky top-20">
                    <div className="w-[400px] shadow-lg rounded-2xl p-4 flex flex-col gap-8 items-center">
                        <div className=" w-40 h-40   relative ">
                            <img
                                src={user?.avatarUrl}
                                className="object-cover  border rounded-full w-full h-full  "
                                alt="avatar"
                            />

                            {
                                <div className="absolute z-50 bottom-0 translate-y-[50%] left-0 flex justify-center w-full">
                                    <div className="w-[70%] cursor-pointer py-1 bg-white rounded-full shadow-xl flex justify-center gap-2">
                                        <BiCamera size={20} />
                                        <p>Chỉnh sửa</p>
                                    </div>
                                </div>
                            }
                        </div>
                        <div>
                            {user?.isVerify && (
                                <div className="flex gap-2 items-center text-lg">
                                    <BiCheck size={24} />
                                    Đã xác minh
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2"></div>
        </div>
    );
};

export default Index;

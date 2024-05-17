import { useParams } from "react-router-dom";
import {getUser } from "../../apis/user";
import { useEffect } from "react";

function Profile(){
    const {id} = useParams();
    useEffect(() => {
        const getInforUser = async ()=>{
            const user = await getUser(id);
            console.log(user);
        }
        getInforUser();
       
    },[]);
    
    return(
        <>
            <h1>Profile page ${id}</h1>
            
        </>
    )
}

export default Profile;
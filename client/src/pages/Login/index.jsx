import { useState } from "react";

function LoginForm(){

    const [formData, setFormData] = useState({username: "", password: ""});

    const handleChange = (evt) =>{
        setFormData((previusData)=> {return {
            ...previusData, [evt.target.name]: evt.target.value,
    }})
    }

    const handleSubmit = (evt)=>{
        evt.preventDefault();
        console.log(formData);
        //xử lý đăng nhập
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor="username">User Name</label>
            <input name="username" type="text" id="username" value={formData.username} onChange={handleChange}/>

            <label htmlFor="password">Password</label>
            <input name="password" type="password" id="password" value={formData.password} onChange={handleChange}/>

            <button type="submit">Submit</button>
        </form>
        </>
    )

}

export default LoginForm;
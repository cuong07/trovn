import { useState } from "react";

function Login(){

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
            <div>
                <label htmlFor="username">User Name</label>
                <input name="username" type="text" id="username" value={formData.username} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" id="password" placeholder="ahfkad" value={formData.password} onChange={handleChange}/>
            </div>
            <div>
                <span>Bạn chưa có tài khoản? Đăng ký tài khoản</span>
                <span>Quên mật khẩu</span>
            </div>
            
            <button type="submit">Submit</button>
        </form>
        </>
    )

}

export default Login;
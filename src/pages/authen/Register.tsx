import { api } from '../../service/apis';
import Navbar from '../navbar/Navbar';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import "./login.scss";
import { Modal } from 'antd';
import BtnLoading from '../../components/BtnLoading';
export default function Register(setModalVisible: any) {
    const navigate = useNavigate();
    let [load, setLoad] = useState(false);
    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        try {
            const userName = (e.target as any).userName.value;
            const email = (e.target as any).email.value;
            const password = (e.target as any).password.value;



            if (!userName || !email || !password) {
                alert("Vui lòng nhập đầy đủ các trường");
                return;
            }
            const newUser = {
                userName,
                email,
                password
            }

            setLoad(true)
            let res = await api.authen.create(newUser)




            setLoad(false)
            if (res.status == 200) {
                Modal.success({
                    title: "Đăng kí thành công",
                    content: "Vui lòng kiểm tra email của bạn để xác thực",
                    onOk: () => {
                        (e.target as any).userName.value = "";
                        (e.target as any).email.value = "";
                        (e.target as any).password.value = "";
                        navigate("/home/login")
                    }
                })
            }
        } catch (err: any) {

            setLoad(false)
            Modal.error({
                title: "Lỗi",
                content: (err.response?.data?.message || []).join("") || "Lỗi không rõ!"
            })
        }
    };
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="box-authen-login-register" >
                <form className="form" onSubmit={(e) => { handleSignup(e) }}>
                    <h2>Register</h2>
                    <div className="input">
                        <div className="inputBox">
                            <label>Username</label>
                            <input type="text" id="userName" placeholder="Text..." />
                        </div>
                        <div className="inputBox">
                            <label>Email</label>
                            <input type="email" id="email" placeholder="Text..." />
                        </div>
                        <div className="inputBox">
                            <label>Password</label>
                            <input type="password" id="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" />
                        </div>
                        <div className="inputBox">
                            <input style={{ cursor: 'pointer' }} type="submit" name="" value="Sign Up" />
                        </div>
                    </div>
                    <p className="forget">Forget Password ? <a href="#">Click Here</a></p>
                    <p style={{ cursor: 'pointer' }} className="forget">have Account?<a onClick={() => {
                        navigate("/home/login")
                    }}> Sign</a></p>
                </form>
            </div>
        </div>

    )
}


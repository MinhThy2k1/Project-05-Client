import { Modal } from "antd"
import { api } from '../../service/apis';
import Navbar from "../navbar/Navbar"
import "./login.scss"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
export default function Login() {
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!(e.target as any).loginInfo.value || !(e.target as any).loginPassword.value) {
                Modal.warning({
                    title: "Chú ý!",
                    content: "Vui lòng nhập đầy đủ thông tin đăng nhập!",
                    onOk: () => { }
                })
                return
            }


            let loginData = {
                loginInfo: (e.target as any).loginInfo.value,
                password: (e.target as any).loginPassword.value
            }


            setLoad(true)
            let result = await api.authen.getToken(loginData)
            if (result.status == 200) {
                (e.target as any).loginInfo.value = "";
                (e.target as any).loginPassword.value = "";
                setLoad(false)
                localStorage.setItem("token", result.data.data)

                Modal.success({
                    title: result.data.message,
                    onOk: () => {
                        window.location.href = "/"
                    }
                })
            }
        } catch (err: any) {


            setLoad(false)
            Modal.error({
                title: "Lỗi!",
                content: err.response.data.message,
                onOk: () => {

                }
            });

        }
    }
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="box-authen-login-register">
                <form className="form" onSubmit={(e) => { handleLogin(e) }} >
                    <h2>Login</h2>
                    <div className="input">
                        <div className="inputBox">
                            <label>Username</label>
                            <input type="text" id="loginInfo" placeholder="Text..." />
                        </div>
                        <div className="inputBox">
                            <label>Password</label>
                            <input type="password" id="loginPassword" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" />
                        </div>
                        <div className="inputBox">
                            <input style={{ cursor: 'pointer' }} type="submit" name="" value="Sign In" />
                        </div>
                    </div>
                    <p className="forget">Forget Password ? <a href="#">Click Here</a></p>
                    <p style={{ cursor: 'pointer' }} className="forget">Dont have Account?<a onClick={() => {
                        navigate("/home/register")
                    }}> Register</a></p>
                </form>
            </div>
        </div>

    )
}

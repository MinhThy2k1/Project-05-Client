import "./authenpartner.scss"
import { Modal } from "antd"
import { api } from '../../../../service/apis';
import { useNavigate } from "react-router-dom"
import { useState } from "react"
export default function authen() {
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
            let result = await api.authen.login(loginData)
            if (result.status == 200) {
                (e.target as any).loginInfo.value = "";
                (e.target as any).loginPassword.value = "";
                setLoad(false)
                localStorage.setItem("tokenAuthen", result.data.data)
                Modal.success({
                    title: result.data.message,
                    onOk: () => {
                        navigate("/manager")
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
        <div className="box-authen-partner">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={(e) => { handleLogin(e) }} >
                    <div className="user-box">
                        <input type="text" id="loginInfo" required />
                        <label>Username</label>
                    </div>
                    <div className="user-box">
                        <input type="password" id="loginPassword" required />
                        <label>Password</label>
                    </div>
                    <button className="box-submit-partnert" type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

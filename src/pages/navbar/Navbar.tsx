import { useNavigate } from "react-router-dom"
import "./navbar.scss"
import ChatBox from "../chat/chat-box";
import { useSpring, animated } from "react-spring";
import { useEffect, useState } from "react";
import { socketChat } from "../../service/chat-socket";
import { logout } from '../../service/firebase';
import { DownOutlined } from '@ant-design/icons';
import { MenuProps, Dropdown, Space, Modal } from "antd"
import { StoreType } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../store/slices/user.slice";
export default function Navbar() {
    const [openChat, setOpenChat] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const items: MenuProps['items'] = [
        {
            label: <a href="https://www.antgroup.com">
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/c/c69bbbaab19285dd98e27ec11d83bf33.svg" alt="" />
                Combo tiết kiệm</a>,
            key: '0',
        },
        {
            label: <a href="https://www.aliyun.com">
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b5ba7b36551c2499565d55c265f5f9e7.svg" alt="" />
                Bảo hiểm du lịch</a>,
            key: '1',
        },
        {
            label: <a href="https://www.aliyun.com">
                <img src="	https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/e/e676ec2c54d3d081691ff29b7fb9a97e.svg" alt="" />
                Phiếu quà tặng</a>,
            key: '1',
        },
    ];
    const userStore = useSelector((store: StoreType) => store.userStore)
    const chatStore = useSelector((store: StoreType) => store.chatStore)

    const toggleChatBox = () => {
        setOpenChat(true); // Cập nhật giá trị của isOpen khi click vào chữ "X"
    };
    return (
        <div className="main-box">
            <div className="box-main-up">
                <div className="box-1">
                    <div className="box-1-item">
                        <div onClick={() => {
                            window.location.href = '/'
                        }} title="traveloka.com" className="box-left">
                            {/* <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/fbab4f587da2242fbe9858fe3e5ba717.svg" alt="" /> */}
                            BK.Com
                        </div>
                        <div>
                            <p onClick={async () => {
                                let connect = await socketChat.connect();
                                if (connect?.status) {
                                    alert("Mở Khung Chat " + connect.message)
                                } else {
                                    alert("Sự đáng tiếc")
                                }
                            }}>
                                <div onClick={() => {
                                    toggleChatBox()
                                }}>
                                    <i className="fa-brands fa-rocketchat"></i>
                                    <span className="button-flicker"></span>
                                </div></p>

                            <div className="box-chat">
                                {

                                    chatStore.data && (
                                        <div style={{
                                            width: 500,
                                        }}>
                                            <ChatBox data={chatStore.data || []} user={userStore.data} />
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    </div>

                </div>
                <div className="box-2">
                    <div className="box-lan">
                        <div>
                            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/a3478fc6e57b8681609c1458bd50cbb9.svg" alt="" />
                        </div>
                        VI|VN
                    </div>
                    <div className="box-sale">
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="IcMarketingPromoBadge"><circle cx="12" cy="12" r="10" stroke="#0194f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle><path d="M8.5 17.5L15.5 6.5C15.5 6.5 14 8.00002 12 8.00002C10 8.00002 8 7.05 8 7.05M8 7.00002V7.00002C9.10457 7.00002 10 7.89545 10 9.00002V9.00002C10 10.1046 9.10457 11 8 11V11C6.89543 11 6 10.1046 6 9.00002V9.00002C6 7.89545 6.89543 7.00002 8 7.00002V7.00002ZM18 15V15C18 16.1046 17.1046 17 16 17V17C14.8954 17 14 16.1046 14 15V15C14 13.8954 14.8954 13 16 13V13C17.1046 13 18 13.8954 18 15Z" stroke="#91EC00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </div>
                        <p>Khuyến Mãi</p>
                    </div>
                    <div>
                        <p>Hỗ Trợ</p>
                    </div>
                    <div>
                        <p onClick={() => {
                            navigate("/contact/parnert")
                        }}>Hợp tác với chúng tôi</p>
                    </div>
                    <div>
                        <p>Đặt chỗ của tôi</p>
                    </div>
                    <div className="box-authen">
                        {
                            userStore.data ? (
                                <span>Chào: <div className="w3-dropdown-hover box-user">
                                    {userStore.data?.userName} <i className="fa-solid fa-angle-down"></i>
                                    <div className="w3-dropdown-content w3-bar-block w3-card-4">
                                        <a href="" className="w3-bar-item w3-button" onClick={() => {
                                            navigate(`/profile/`)
                                        }}>profile</a>
                                        {userStore.data.isParnert == "Yes" && (
                                            <div>
                                                <a className="w3-bar-item w3-button" onClick={() => {
                                                    navigate("/partner")
                                                }
                                                }>Manager Hotel</a>
                                            </div>
                                        )}
                                        <p className="w3-bar-item w3-button"
                                            onClick={() => {
                                                Modal.confirm({
                                                    title: "Xác nhận",
                                                    content: "Bạn chắc chắn muốn đăng xuất!",
                                                    onOk: async () => {
                                                        await logout()
                                                        localStorage.removeItem("token")
                                                        window.location.reload()
                                                        dispatch(userAction.setData(null))

                                                    }

                                                })

                                            }}><i className="fa-solid fa-arrow-right-from-bracket"></i></p>
                                    </div>
                                </div></span>
                            )
                                :
                                (
                                    <>
                                        <div>
                                            <button className="box-signin" onClick={() => navigate("/home/login")}>
                                                <i className="fa-solid fa-user" style={{ color: '#74C0FC' }}></i><span>Sign in</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button className="box-signup" onClick={() => navigate("/home/register")}> Register </button>
                                        </div>
                                    </>
                                )
                        }


                    </div>
                </div>
            </div >
            <div className="box-main-down">
                <div className="box-menu-item">
                    <p>Khách sạn</p>
                </div>
                <div className="box-menu-item">
                    <p>Vé máy bay</p>
                </div>
                <div className="box-menu-item">
                    <p>Vé xe khách</p>
                </div>
                <div className="box-menu-item">
                    <p>Đưa đón sân bay</p>
                </div>
                <div className="box-menu-item">
                    <p>Cho thuê xe</p>
                </div>
                <div className="box-menu-item">
                    <p>Hoạt động & vui chơi</p>
                </div>
                <div className="box-menu-item">
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space style={{ cursor: 'pointer' }}>
                                More
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>

        </div >
    )
}

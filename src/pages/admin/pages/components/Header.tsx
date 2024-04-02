
import { StoreType } from '../../../../store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from '../../../../service/firebase';
import { Modal } from 'antd';

import { adminAction } from '../../../../store/slices/admin.slice';
import { userAction } from '../../../../store/slices/user.slice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const adminStore = useSelector((store: StoreType) => store.adminStore)
  const userStore = useSelector((store: StoreType) => store.userStore)
  return (
    <div className='admin_header'>
      <div className='left'>
        <span>{"hi, "}</span>
        <span>{adminStore.data?.userName}</span>
      </div>
      <div className='right'>
        {/* admin */}
        <a onClick={() => {
          if (adminStore.data?.role === "admin") {
            Modal.confirm({
              title: "Xác nhận",
              content: "Bạn chắc chắn muốn đăng xuất!",
              onOk: async () => {
                await logout();
                localStorage.removeItem("tokenAdmin");
                dispatch(adminAction.setData(null));
                navigate("/manager/login");
              }
            });
          } else {
            if (userStore.data?.isParnert == "Yes") {
              Modal.confirm({
                title: "Xác nhận",
                content: "Bạn chắc chắn muốn đăng xuất!",
                onOk: async () => {
                  await logout();
                  localStorage.removeItem("token");
                  dispatch(userAction.setData(null));
                  navigate("/home/login");
                }
              });


            }
          }
        }
        }> đăng xuất</a>
        {/* parnert */}
      </div>
    </div >
  )
}

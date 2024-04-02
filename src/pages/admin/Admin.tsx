import { useSelector } from "react-redux";
import { StoreType } from "../../store";
import './admin.scss'
import Header from "./pages/components/Header";
import Body from "./pages/components/Body";
import { useEffect } from "react";
import { message } from "antd";

export default function Admin() {
  const adminStore = useSelector((store: StoreType) => store.adminStore)

  const userStore = useSelector((store: StoreType) => store.userStore)

  useEffect(() => {
    if (!adminStore.data && !adminStore.loading) {
      localStorage.removeItem("tokenAdmin")
      localStorage.removeItem("token")
      alert("bạn không có quyền")
      window.location.href = "/"
    }
    console.log("admin", adminStore.data);

  }, [adminStore.data, adminStore.loading])
  return (
    <>
      {
        adminStore.data && (
          <div className="admin_page">
            <Header></Header>
            <Body></Body>
          </div>
        )
      }
    </>
  )
}


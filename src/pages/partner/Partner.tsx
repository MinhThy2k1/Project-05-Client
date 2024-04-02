import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../store";
import "./partner.scss"
import Header from "./pages/components/Header";
import Body from "./pages/components/Body";
import { useEffect } from "react";
import { api } from "../../service/apis";
import { UseDispatch } from "react-redux";
import { userAction } from "../../store/slices/user.slice";

export default function Admin() {
    const dispatch = useDispatch();
    const userStore = useSelector((store: StoreType) => store.userStore)

    useEffect(() => {
        if (!userStore.data && !userStore.loading) {
            localStorage.removeItem("token")
            alert("bạn không có quyền")
            window.location.href = "/"
        }
        if (userStore.data.isParnert == "No") {
            window.location.href = "/"

        }
        console.log("userstoredata", userStore.data)
    }, [userStore.data, userStore.loading])
    return (
        <>
            {
                userStore.data.isParnert == "Yes" && (
                    <div className="admin_page">
                        <Header></Header>
                        <Body></Body>
                    </div>
                )
            }
        </>
    )
}


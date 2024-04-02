import Lazy from "../ultis/lazies/Lazy"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
export default function RouteSetup() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={Lazy(() => import("../pages/home/Layout"))()}>
                </Route>
                <Route path="/hotel" element={Lazy(() => import("../pages/list/List.tsx"))()}></Route>
                <Route path="/info-contact/:id" element={Lazy(() => import("../pages/component/infocontact/Infocontact.tsx"))()}></Route>
                <Route path="/hotel/:id" element={Lazy(() => import("../pages/hotel/Hotel.tsx"))()}></Route>
                <Route path="/profile" element={Lazy(() => import("../pages/component/profile/Profile.tsx"))()}></Route>
                <Route path="contact/parnert" element={Lazy(() => import("../pages/component/contact/contact.tsx"))()}></Route>
                {/* <Route path="/home  /login" element={Lazy(() => import("../pages/authen/Login"))()}></Route> */}
                <Route path="/home/register" element={Lazy(() => import("../pages/authen/Register"))()}></Route>
                <Route path="/manager/login" element={Lazy(() => import("../pages/admin/pages/authenAdmin/Authen"), localStorage.getItem("tokenAdmin") == null, "/")()}></Route>
                <Route path="/home/login" element={Lazy(() => import("../pages/authen/Login"), localStorage.getItem("token") == null, "/")()}></Route>
                <Route path="/manager" element={Lazy(() => import("../pages/admin/Admin"))()}>
                    <Route path="active-hotel" element={Lazy(() => import("../pages/admin/component/ActiveHotel.tsx"))()}></Route>
                    <Route path="status-user" element={Lazy(() => import("../pages/admin/component/statususer/Statususer.tsx"))()}></Route>
                </Route>
                <Route path="/partner" element={Lazy(() => import("../pages/partner/Partner"))()}>
                    <Route path="create-hotel" element={Lazy(() => import("../pages/partner/pages/newhotel/Createhotel.tsx"))()}></Route>
                    <Route path="pending-status" element={Lazy(() => import("../pages/partner/pages/components/pendingstatus/Pendingstatus.tsx"))()}></Route>
                    <Route path="create-room/:id" element={Lazy(() => import("../pages/partner/pages/components/createroom/Createroom.tsx"))()}></Route>
                </Route>
                <Route path="/partner/login" element={Lazy(() => import("../pages/admin/pages/authenPartner/Authen"))()}></Route>

            </Routes>
        </BrowserRouter>
    )
}

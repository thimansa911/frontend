import { Route, Routes } from "react-router-dom"
import AdminUserPage from "./adminUserPage."
import AdminDashboardPage from "./adminDashboardPage"
import AdminProductPage from "./adminProductPage"
import AdminProductAddPage from "./adminProductAddPage"
import AdminStatusPage from "./adminStatusPage"
import AdminOrderPage from "./adminOrderPage"
import AdminPaymentReceiptPage from "./adminPaymentReceiptPage"
import { Link } from "react-router-dom"

function AdminHomePage(){
    return(
        <div className="w-screen h-screen flex">
            <div className="w-76 h- bg-red-400 flex-col flex items-center" >
                <Link className="text-2xl font-bold p-8" to="/admin">Admin Panel</Link>
                <Link className="text-[18px] p-2" to="/admin/product" >Product</Link>
                <Link className="text-[18px] p-2" to="/admin/user" >User</Link>
                <Link className="text-[18px] p-2" to="/admin/status" >Status</Link>
                <Link className="text-[18px] p-2" to="/admin/order" >Oredrs</Link>
                <Link className="text-[18px] p-2" to="/admin/payment" >Payment receipt</Link>
            </div>
            <div className="w-[calc(100%-304px)] h-full" >
                <Routes path="/">
                    <Route path="/" element={<AdminDashboardPage/>} />
                    <Route path="/product" element={<AdminProductPage/>} />
                    <Route path="/user" element={<AdminUserPage/>} />
                    <Route path="/addproduct" element={<AdminProductAddPage/>}/>
                    <Route path="/status" element={<AdminStatusPage/>}/>
                    <Route path="/order" element={<AdminOrderPage/>} />
                    <Route path="/payment" element={<AdminPaymentReceiptPage/>} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminHomePage
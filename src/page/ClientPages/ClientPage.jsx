import Header from "../../components/Header"
import { Route, Routes } from "react-router-dom"
import ClientSideProductPage from "./ClientISideProductPage"
import ProductOverView from "./overViewPage"
import CartPage from "./cartPage"
import CheckOutPage from "./checkOutPage"


function ClientPage(){

    return(
        <div className="h-screen w-full">
            <Header/>
            <div className="w-full h-[calc(100%-104px)] p-4">
                <Routes path="/">
                    <Route path="/" element={<ClientSideProductPage/>} />
                    <Route path="/contactus" element={<h1>Contact us</h1>} />
                    <Route path="/overview/:productId" element={<ProductOverView/>} />
                    <Route path="/reviews" element={<h1>Reviews</h1>} />
                    <Route path="/aboutus" element={<h1>About us</h1>} />
                    <Route path="/*" element={<h1>404 not found</h1>} />
                    <Route path="cart" element={<CartPage/>} />
                    <Route path="/checkout" element={<CheckOutPage/>} />
                </Routes>
            </div>
        </div>
    )
}

export default ClientPage
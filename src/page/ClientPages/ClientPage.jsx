import Header from "../../components/Header"
import { Route, Routes } from "react-router-dom"
import ClientSideProductPage from "./ClientISideProductPage"
import ProductOverView from "./overViewPage"

function ClientPage(){

    return(
        <div className="h-screen w-full max-h-screen">
            <Header/>
            <div className="w-full h-[calc(100%-104px)] p-4">
                <Routes path="/">
                    <Route path="/home" element={<ClientSideProductPage/>} />
                    <Route path="/contact" element={<h1>Contact us</h1>} />
                    <Route path="/overview/:productId" element={<ProductOverView/>} />
                    <Route path="/*" element={<h1>404 not found</h1>} />
                </Routes>
            </div>
        </div>
    )
}

export default ClientPage
import { useState } from "react"
import { Link } from "react-router-dom"

function AdminProductAddPage(){

    const [productId, setProductId] = useState("")
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productLabelPrice, setProductLabelPrice] = useState("")
    const [productPic, setProductPic] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [available, setAvailable] = useState("")

    function HandleSubmit(){
        const productData = {
            productId: productId,
            productName: productName,
            productPrice: productPrice,
            productLabelPrice: productLabelPrice,
            productPic: productPic,
            productDescription:productDescription,
            available: available
        }
        console.log(productData)

    }

    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-180 h-130 bg-red-300 rounded-2xl flex flex-col justify-between p-6">
                <h1 className="font-bold text-2xl">Add product</h1>
                <input onChange={(e)=>{setProductId(e.target.value)}} type="text" placeholder="Product Id" className="border-2 border-black p-1"/>
                <input onChange={(e)=>{setProductName(e.target.value)}} type="text" placeholder="Product Name" className="border-2 border-black p-1"/>
                <input onChange={(e)=>{setProductPrice(e.target.value)}} type="number" placeholder="Price" className="border-2 border-black p-1"/>
                <input onChange={(e)=>{setProductLabelPrice(e.target.value)}} type="text" placeholder="Label Price" className="border-2 border-black p-1"/>
                <input onChange={(e)=>{setProductPic(e.target.value)}} type="file" accept="image/*" placeholder="Images" className="border-2 border-black p-1"/>
                <textarea onChange={(e)=>{setProductDescription(e.target.value)}} type="text" placeholder="Description" className="w-100 border-2 border-black p-1"/>
                <select onChange={(e)=>{setAvailable(e.target.value)}} className="border-2 border-black rounded-xl p-1 w-40">
                    <option >Is Available</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
                <Link onClick={HandleSubmit}  className="text-white bg-red-500 w-50 text-center rounded-2xl p-1 h-8 active:translate-y-1">Add</Link>
                <Link to="/admin/product" className="bg-white text-red-500 w-50 p-1 h-8 rounded-2xl text-center active:translate-y-1 ">Cancel</Link>
                
            </div>
        </div>
    )
}

export default AdminProductAddPage
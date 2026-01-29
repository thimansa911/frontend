import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import UploadFile from "../../utils/mediaUpload"

function AdminProductAddPage(){

    const [productId, setProductId] = useState("")
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productLabelPrice, setProductLabelPrice] = useState("")
    const [productPic, setProductPic] = useState([])
    const [productDescription, setProductDescription] = useState("")
    const [available, setAvailable] = useState("")

    const navigate = useNavigate()

async function HandleSubmit(){

    const PromisesArray = []

    for(let i=0; i<productPic.length; i++){

        const promise = UploadFile(productPic[i])
        PromisesArray[i] = promise

    }

    const responses = await Promise.all(PromisesArray)

        const productData = {
            productId: productId,
            productName: productName,
            productPrice: productPrice,
            productLabelPrice: productLabelPrice,
            productPic: responses,
            productDescription:productDescription,
            available: available
        }

        const token = localStorage.getItem("token")
        if(token == null){
           return window.location.href = "/login";
        } 

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/product/create", productData,
            {
                headers:{
                    Authorization:"Bearer " +token
                }
            }
        ).then(
            (res)=>{
                toast.success("Product create successful")
                navigate("/admin/product")
                const response = res.data
                console.log(response)
            }
        ).catch(
            (error)=>{
                toast.error("Failed to create product")
                console.error("Error adding product:", error)
            }
        )

    }

    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-180 h-130 bg-red-300 rounded-2xl flex flex-col justify-between p-6">
                <h1 className="font-bold text-2xl">Add product</h1>
                <input onChange={(e)=>{setProductId(e.target.value)}} type="text" placeholder="Product Id" className="border-2 border-black p-1"/>
                <input onChange={(e)=>{setProductName(e.target.value)}} type="text" placeholder="Product Name" className="border-2 border-black p-1"/>
                <input onChange={(e)=>{setProductPrice(e.target.value)}} type="number" placeholder="Price" className="border-2 border-black p-1"/>
                <input onChange={(e)=>{setProductLabelPrice(e.target.value)}} type="number" placeholder="Label Price" className="border-2 border-black p-1"/>
                <input onChange={(e)=>{setProductPic(e.target.files)}} type="file" multiple placeholder="Images" className="border-2 border-black p-1"/>
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
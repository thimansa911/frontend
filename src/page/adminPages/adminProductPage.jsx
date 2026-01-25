import axios from "axios";
import { useState } from "react";
import { CgAdd } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { FaPen } from "react-icons/fa";
import toast from "react-hot-toast";
import LoaderFunction from "../../components/loader";

function AdminProductPage(){

    const [products, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(
        ()=>{
            if(isLoading){
              axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/get").then(
                (res)=>{
                    setProduct(res.data)
                    setIsLoading(false)
                }
            )
        }
    },[isLoading]
)
    const navigate = useNavigate()
    return(
        <div className="w-full h-full">

            {isLoading ? <LoaderFunction/> : <table>
                <thead>
                    <tr>
                        <th className="p-6">Image</th>
                        <th className="p-6">Product ID</th>
                        <th className="p-6">Name</th>
                        <th className="p-6">Price</th>
                        <th className="p-6">Label Price</th>
                        <th className="p-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                  products.map(
                    (product, index)=>{
                      return(
                        <tr key={index}>
                          <td className="p-6"> 
                            <img src={product.productPic[0]} className="w-10 h-10 object-cover" />
                          </td>
                          <td className="p-6" >{product.productId}</td>
                          <td className="p-6" >{product.productName}</td>
                          <td className="p-6" >{product.productPrice}</td>
                          <td className="p-6" >{product.productLabelPrice}</td>
                          <td className="p-3 flex-wrap flex items-center gap-1 justify-center">
                            <BiTrash className="text-2xl p-1 bg-red-400 rounded-full active:translate-y-1 cursor-pointer" onClick={
                                ()=>{
                                    const token = localStorage.getItem("token")
                                    if(token === null){
                                        navigate("/login")
                                        return;
                                    }
                                    axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/delete/"+ product.productId,
                                        {
                                            headers:{
                                                Authorization: `Bearer ${token}`
                                            } 
                                        }
                                    ).then(
                                        ()=>{
                                            toast.success("Product deleted successful");
                                            setIsLoading(!isLoading)
                                        }
                                    ).catch(
                                        (error)=>{
                                            toast.error("Failed to delete product");
                                            console.error("Error deleting product:", error);
                                        }
                                    )
                                }
                            }/>
                            <FaPen onClick={()=>{
                                navigate("/admin/updateproduct/"+product.productId)
                            }} className="text-2xl p-1 bg-green-400 rounded-full active:translate-y-1 cursor-pointer"/>
                            </td>
                        </tr>
                      )
                    }
                  )
                }
                </tbody>
            </table>}
        
            <Link to="/admin/addproduct" className="text-4xl fixed bottom-3 right-3"><CgAdd/></Link>
        </div>
    )
}

export default AdminProductPage
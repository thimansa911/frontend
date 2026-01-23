import axios from "axios";
import { useState } from "react";
import { CgAdd } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { FaPen } from "react-icons/fa";
import toast from "react-hot-toast";

function AdminProductPage(){

    const [products, setProduct] = useState([])
    const [a, setA] = useState(0)

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/get").then(
                (res)=>{
                    setProduct(res.data)
                }
            )
        }
        ,[a]
    )
    const navigate = useNavigate()
    return(
        <div className="w-full h-full">

            <table>
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
                    (products, index)=>{
                      return(
                        <tr key={index}>
                          <td className="p-6"> 
                            <img src={products.productPic[0]} className="w-10 h-10 object-cover" />
                          </td>
                          <td className="p-6" >{products.productId}</td>
                          <td className="p-6" >{products.productName}</td>
                          <td className="p-6" >{products.productPrice}</td>
                          <td className="p-6" >{products.productLabelPrice}</td>
                          <td className="p-3 flex-wrap flex items-center gap-1 justify-center">
                            <BiTrash className="text-2xl p-1 bg-red-400 rounded-full active:translate-y-1 cursor-pointer" onClick={
                                ()=>{
                                    const token = localStorage.getItem("token")
                                    if(token === null){
                                        navigate("/login")
                                        return;
                                    }
                                    axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/delete/"+ products.productId,
                                        {
                                            headers:{
                                                Authorization: `Bearer ${token}`
                                            } 
                                        }
                                    ).then(
                                        ()=>{
                                            toast.success("Product deleted successful");
                                            setA(a+1);
                                        }
                                    ).catch(
                                        (error)=>{
                                            toast.error("Failed to delete product");
                                            console.error("Error deleting product:", error);
                                        }
                                    )
                                }
                            }/>
                            <FaPen className="text-2xl p-1 bg-green-400 rounded-full active:translate-y-1 cursor-pointer"/>
                            </td>
                        </tr>
                      )
                    }
                  )
                }
                </tbody>
            </table>
        
            <Link to="/admin/addproduct" className="text-4xl fixed bottom-3 right-3"><CgAdd/></Link>
        </div>
    )
}

export default AdminProductPage
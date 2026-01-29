import { useEffect, useState } from "react"
import axios from "axios"
import LoaderFunction from "../../components/loader"
import ProductCard from "../../components/ProductCard"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function ClientSideProductPage(){

    const [product, setProduct] = useState([]);
    const [isLoading, SetIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(
        ()=>{
            if(isLoading){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/get",{
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }
                }).then(
                    (res)=>{
                        setProduct(res.data);
                        SetIsLoading(false);
                        }
                    ).catch(()=>{
                        toast.error("Your session has expired. Please log in again")
                        navigate("/login")
                    })
            }
        },[isLoading]
    )

    return(
    <div className="w-full bg-gray-100">
        {
            isLoading? <LoaderFunction/> : <div className="w-full h-full flex-wrap gap-6 justify-center ite flex">
                {
                    product.map(
                        (product)=>{
                            return(
                                <ProductCard key={product.productId} product={product}/>
                            )
                        }
                    )
                }
            </div>
        }
    </div>
  )
}

export default ClientSideProductPage

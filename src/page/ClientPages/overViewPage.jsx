import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoaderFunction from "../../components/loader";
import toast from "react-hot-toast";

function ProductOverView(){

    const[product, setProduct] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const { productId } = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        if(isLoading){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/info/"+productId,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then(
            (res)=>{
                setProduct(res.data)
                setIsLoading(false)
            }
        ).catch(
            ()=>{
                toast.error("Please login to get product information")
                navigate("/login")
            }
        )
      }
    },[isLoading]
)

    return(
        <div className="w-full h-full">
                {
                    isLoading? <LoaderFunction/>:
                    <div className="w-full h-full p-6 flex flex-row">
                        <div className="w-150 h-full p-2 bg-amber-50" ><img src={product.productPic[0]} className="w-140 h-80 object-cover " /></div>
                        <div className="w-150 h-full p-2 bg-amber-200" >
                            <h1 className="text-2xl font-bold" >{product.productName}</h1>
                            <h1>LKR.{product.productPrice}</h1>
                            </div>
                    </div>
                }
        </div>
    )
}

export default ProductOverView;
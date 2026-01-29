import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoaderFunction from "../../components/loader";
import toast from "react-hot-toast";
import ImagesArray from "../../components/imagesArray";

function ProductOverView(){

    const[product, setProduct] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const { productId } = useParams();
    const navigate = useNavigate();


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
        <div className="w-full h-full bg-gray-100">
                {
                    isLoading? <LoaderFunction/>:
                    <div className="w-full h-full p-6 flex flex-row">
                        <div className="w-150 h-full p-2" >
                            <ImagesArray images={product.productPic} />
                            </div>
                        <div className="w-150 h-full p-2 flex flex-col gap-4" >
                            <h1 className="text-2xl font-bold" >{product.productName}</h1>
                            <span>Description:{product.productDescription}</span>
                            {
                                product.productPrice < product.productLabelPrice?
                                <div>
                                    <h1 className="text-2xl">LKR.{product.productPrice}</h1>
                                    <h1 className="line-through text-xl">LKR.{product.productLabelPrice}</h1>
                                </div>
                                :
                                <div>
                                    <h1 className="text-2xl">LKR.{product.productLabelPrice}</h1>
                                </div>
                            }
                            </div>
                    </div>
                }
        </div>
    )
}

export default ProductOverView;
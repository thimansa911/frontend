import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoaderFunction from "../../components/loader";
import toast from "react-hot-toast";
import ImagesArray from "../../components/imagesArray";
import { AddToCart, GetCart } from "../../utils/cart";

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
                            <div className="p-1 w-full h-50 gap-2 flex">
                                <button onClick={()=>{
                                    AddToCart(product, 1)
                                    toast.success("Product added to cart")
                                    console.log(GetCart())
                                    }}
                                     className="cursor-pointer rounded-2xl bg-blue-500 text-white hover:bg-white active:translate-y-1 hover:text-blue-500 hover:border-2 hover:border-blue-500 h-10 w-40">Add To Cart</button>
                                <button onClick={()=>{
                                    navigate("/checkout", {
                                        state:{
                                            item:[{
                                                productId:product.productId,
                                                quantity: 1,
                                                name: product.productName,
                                                image: product.productPic[0], // pick first image
                                                price: product.productPrice
                                            }]
                                        }
                                    })
                                }} className="cursor-pointer rounded-2xl bg-blue-400 text-white hover:bg-white active:translate-y-1 hover:text-blue-400 hover:border-2 hover:border-blue-400 h-10 w-40">Buy now</button>
                            </div>
                            </div>
                    </div>
                }
        </div>
    )
}

export default ProductOverView;
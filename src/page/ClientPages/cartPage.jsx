import { useState } from "react"
import { AddToCart, GetCart, GetTotal } from "../../utils/cart"
import { BiPlus } from "react-icons/bi"
import { FaDeleteLeft, FaMinus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage(){

    const navigate = useNavigate();
    const [ cart , setCart ] = useState(GetCart())

    return(
        <div className="w-full flex flex-col items-center gap-5 bg-gray-100">
            {
                cart.map(
                    (item)=>{
                        return(
                            <div key={item.productId} className="reletive gap-10 font-bold cursor-pointer w-220 h-28 hover:shadow-2xl border border-black flex bg-white flex-row justify-center items-center">
                                <img src={item.image} className="object-cover h-24 w-24" /> 
                                <span>{item.name}</span>
                                <span>LKR.{(item.price * item.quantity).toLocaleString("en-us", {minimumFractionDigits: 2 , maximumFractionDigits : 2})}</span>
                                <span>Qty : {item.quantity}</span>
                                <button onClick={()=>{
                                    AddToCart(item, 1)
                                    setCart(GetCart())
                                    }} className="active:translate-y-1 cursor-pointer rounded-full w-6 h-6 bg-black p-1"><BiPlus className="text-white"/></button>
                                <button onClick={()=>{
                                    AddToCart(item, -1)
                                    setCart(GetCart())
                                }} className="active:translate-y-1 cursor-pointer rounded-full w-6 h-6 bg-black p-1"><FaMinus className="text-white"/></button>
                                    <button onClick={()=>{
                                        AddToCart(item, -item.quantity);
                                        setCart(GetCart())
                                    }} className="absolute left-267"><FaDeleteLeft className="text-red-500 font-bold text-2xl cursor-pointer hover:text-3xl active:translate-y-1"/></button>
                            </div>
                        )
                    }
                )
            }

            <div className="w-220 h-30 bg-red-300 p-4 text-xl font-bold flex justify-end items-center relative">
                Total : LKR.{GetTotal().toLocaleString("en-us",{minimumFractionDigits: 2 , maximumFractionDigits: 2})}
                <div className="w-40 h-full flex justify-center items-center absolute left-1">
                    <button className="rounded-2xl cursor-pointer active:translate-y-1 p-1 w-34 h-12 bg-blue-400 hover:bg-white hover:text-blue-400 text-white " onClick={
                        ()=>{
                            navigate("/checkout", {state:{ item : cart}})
                        }
                    }>Plase Order</button>
                </div>
            </div>

        </div>
    )
}
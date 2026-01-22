import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function LoginPage(){

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleLogin(){

        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
            email: email,
            password: password  
        }).then(
            (response)=>{
                toast.success("Login successful")
                localStorage.setItem("token", response.data.Token)
                if(response.data.role === "admin"){
                    navigate("/admin")
                }else{
                    if(response.data.role === "user"){
                        navigate("/")
                    }
                }
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("Login failed")
            }
        )
    }

    return(
        <div className="w-screen h-screen flex justify-center items-center bg-red-500">
            <div className="w-100 h-120 bg-black rounded-2xl">
                <h1 className="text-red-500  h-20 w-100 font-bold text-center text-4xl p-4">Login</h1>

                <div className="h-30 w-100 flex-col flex p-4">
                    <h1 className="text-red-500 text-[18px]">Email</h1>
                    <input type="text" className="text-white p-2 border-white border-2 w-90" onChange={
                        (e)=>{
                            setEmail(e.target.value)
                        }
                    }></input>
                </div>

                 <div className="h-30 w-100 flex-col flex p-4">
                    <h1 className="text-red-500 text-[18px]">Password</h1>
                    <input type="text" className="text-white p-2 border-white border-2 w-90" onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    }></input>
                </div>
                
                <div className="h-24 w-100 flex items-center justify-center">
                <button className="bg-blue-400 p-3 h-14 w-44 rounded-full text-[18px] cursor-pointer active:translate-y-1" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
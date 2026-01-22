import { useState } from "react"
import toast from "react-hot-toast"
import UploadFile from "../utils/mediaUpload"

export default function TheTest(){

    const [pic, setPic] = useState(null)

    function handleSubmit(){
        UploadFile(pic).then(
            (url)=>{
                console.log(url)
                toast.success("Pic uploaded successfully")
            }
        ).catch(
            (error)=>{
                console.error("Failed to upload pic:", error)
                toast.error("Failed to upload Pic")
            }
        )
    }

    return(
        <div className="w-screen h-screen flex justify-center items-center gap-2">
            <input onChange={(e)=>{ setPic(e.target.files[0])}} type="file" className="border-2 border-black w-80 h-10 rounded-2xl p-1" />
            <button onClick={handleSubmit} className="w-20 h-10 bg-blue-400 rounded-2xl cursor-pointer active:translate-y-1">Upload</button>
        </div>
    )
}
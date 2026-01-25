import axios from "axios"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router-dom"
import UploadFile from "../../utils/mediaUpload"

function AdminUpdateProductPage(){

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productLabelPrice, setProductLabelPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [available, setAvailable] = useState(true);
  const [oldPics, setOldPics] = useState([]);
  const [newPics, setNewPics] = useState([]);
  const navigate = useNavigate()
  const { productId } = useParams()

    useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/info/" +productId,{
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }
      })
      .then((res) => {
        const p = res.data;
        setProductName(p.productName);
        setProductPrice(p.productPrice);
        setProductLabelPrice(p.productLabelPrice);
        setProductDescription(p.productDescription);
        setAvailable(p.available);
        setOldPics(p.productPic); 
      })
      .catch(() => {
        navigate("/admin/product");
      });
  },[]
);


    async function HandleSubmit(){  
        
    let finalPics = oldPics; 

    if (newPics.length > 0) {
        const uploaded = await Promise.all(
            Array.from(newPics).map(file => UploadFile(file))
    );
        finalPics = uploaded; 
}

        const productData = {
            productId: productId,
            productName: productName,
            productPrice: productPrice,
            productLabelPrice: productLabelPrice,
            productPic: finalPics,
            productDescription:productDescription,
            available: available
        }

        const token = localStorage.getItem("token")
        if(token == null){
           return window.location.href = "/login";
        } 

        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/product/update/"+productId, productData,
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
                <h1 className="font-bold text-2xl">Update product</h1>
                <input disabled value={productId} onChange={(e)=>{setProductId(e.target.value)}} type="text" className="border-2 border-black p-1"/>
                <input placeholder="Name" value={productName} onChange={(e)=>{setProductName(e.target.value)}} type="text" className="border-2 border-black p-1"/>
                <input placeholder="Price" value={productPrice} onChange={(e)=>{setProductPrice(e.target.value)}} type="number" className="border-2 border-black p-1"/>
                <input placeholder="Label Price" value={productLabelPrice} onChange={(e)=>{setProductLabelPrice(e.target.value)}} type="text" className="border-2 border-black p-1"/>
                <input onChange={(e)=>{setNewPics(e.target.files)}} type="file" multiple  className="border-2 border-black p-1"/>
                <textarea placeholder="Description" value={productDescription} onChange={(e)=>{setProductDescription(e.target.value)}} type="text" className="w-100 border-2 border-black p-1"/>
                <select value={available} onChange={(e)=>{setAvailable(e.target.value)}} className="border-2 border-black rounded-xl p-1 w-40">
                    <option >Is Available</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
                <Link onClick={HandleSubmit}  className="text-white bg-red-500 w-50 text-center rounded-2xl p-1 h-8 active:translate-y-1">Update</Link>
                <Link to="/admin/product" className="bg-white text-red-500 w-50 p-1 h-8 rounded-2xl text-center active:translate-y-1 ">Cancel</Link>
                
            </div>
        </div>
    )
}

export default AdminUpdateProductPage
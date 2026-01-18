import { CgAdd } from "react-icons/cg";
import { Link } from "react-router-dom";

function AdminProductPage(){
    return(
        <div className="w-full h-full">
            <Link to="/admin/addproduct" className="text-4xl fixed bottom-3 right-3"><CgAdd/></Link>
        </div>
    )
}

export default AdminProductPage
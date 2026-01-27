import { Link } from "react-router-dom"

function ProductCard(props){
    const product = props.product
    return(
        <Link to={"/overview/"+product.productId} className="w-80 h-100 rounded-2xl overflow-hidden shrink-0 p-1 border-2 border-red-300 hover:border-white hover:shadow-2xl hover:shadow-red-400" >
            <div><img src={product.productPic[0]} className="w-full h-70 object-cover rounded-t-2xl" /></div>

        </Link>
    )
}

export default ProductCard
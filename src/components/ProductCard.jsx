import { Link } from "react-router-dom"

function ProductCard(props){
    const product = props.product
    return(
        <Link to={"/overview/"+product.productId} className="w-50 h-70 overflow-hidden shrink-0 hover:shadow-2xl hover:shadow-black bg-white" >
            <div><img src={product.productPic[0]} className="w-full h-46 object-cover " /></div>
            <div className="w-full h-24 flex flex-col items-center justify-center p-0.5 gap-0.5 bg-white">
                <h1>{product.productName}</h1>
                {
                    product.productPrice < product.productLabelPrice?
                    <div className="flex-col flex">
                        <span>LKR.{product.productPrice}</span>
                        <span className="line-through">LKR.{product.productLabelPrice}</span>
                    </div>
                    :
                    <div>
                        <span>LKR.{product.productLabelPrice}</span>
                    </div>
                }
            </div>

        </Link>
    )
}

export default ProductCard
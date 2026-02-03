export function  GetCart(){
    let cartInString = localStorage.getItem("cart");

    if(cartInString == null){
        cartInString = "[]"
        localStorage.setItem("cart", cartInString);
    }

    const cart = JSON.parse(cartInString);
    return cart 
}

export function AddToCart(product, qty){
    const cart = GetCart()

    const exsistingProductIndex = cart.findIndex(()=>{
        return item.productId === product.productId
    })

    if(exsistingProductIndex == -1){
        cart.push(
            {
                productId: product.productId,
                quantity : qty,
                price: product.productPrice,
                image:product.productPic
            }
        )
        localStorage.setItem("cart", JSON.stringify(cart));
    }else{
        const quantity = cart[exsistingProductIndex].quantity + qty;
        if(newQty <= 0){
            const newCart = cart.filter((item, index)=>{
                return index !== exsistingProductIndex;
            })
            localStorage.setItem("cart",JSON.stringify(newCart));
        }else{
            cart[exsistingProductIndex].quantity = newQty;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
}
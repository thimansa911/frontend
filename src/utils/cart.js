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

    const existingProductIndex = cart.findIndex(
        (item)=>{
            
        return item.productId === product.productId
    })

    if(existingProductIndex == -1){
        cart.push(
            {
                productId: product.productId,
                name:product.productName,
                quantity : qty,
                price: product.productPrice,
                image:product.productPic[0]
            }
        )
        localStorage.setItem("cart", JSON.stringify(cart));

    }else{

        const newQty = cart[existingProductIndex].quantity + qty;
        
        if(newQty <= 0){
            const newCart = cart.filter((item, index)=>{
                return index !== existingProductIndex;
            })
            localStorage.setItem("cart",JSON.stringify(newCart));
        }else{
            cart[existingProductIndex].quantity = newQty;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
}

export function GetTotal(){
    const cart = GetCart();
    let total = 0;
    cart.forEach((item)=>{
        total += item.price * item.quantity
    })

    return total
}
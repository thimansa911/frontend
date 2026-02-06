import { useState , useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { FaDeleteLeft, FaMinus } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CartPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.item || []);
  const navigate = useNavigate();

  // If cart is empty, redirect user
    useEffect(() => {
    if (!location.state?.item || location.state.item.length === 0) {
      toast.error("Please select items to checkout");
      navigate("/");
    }
  }, []);

  // Place order function
  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    // Create order payload with all required fields
    const order = {
      orderId: Date.now().toString(),      // Unique order ID
      email: "user@example.com",           // Replace with actual logged-in user email
      firstName: "hello",
      lastName: "yoyo",
      address: "gg",
      phoneNumber: "gb",
      items: cart.map((item) => ({
        productId: item.productId,
        qty: item.quantity,
        productName: item.name,
        productPic: [item.image],
        ProductPrice: item.price,
      })),
    };

    console.log("Order payload:", order);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/order/create", // Use full backend URL
        order,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Order response:", response.data);
      toast.success("Order placed successfully");

      // Clear cart after successful order
      setCart([]);
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order");
    }
  }

  // Calculate total
  function getTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  return (
    <div className="w-full flex flex-col items-center gap-5 bg-gray-100">
      {cart.map((item, index) => (
        <div
          key={item.productId}
          className="relative gap-10 font-bold cursor-pointer w-160 h-28 hover:shadow-2xl border border-black flex bg-white flex-row justify-center items-center"
        >
          <div className="w-25 h-full justify-center items-center flex">
            <img src={item.image} className="object-cover h-24 w-24" />
          </div>
          <div className="w-60 h-full items-center flex flex-col gap-1 justify-center">
            <span>{item.name}</span>
            <span>
              LKR.
              {(item.price * item.quantity).toLocaleString("en-us", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span>Qty : {item.quantity}</span>
          </div>
          <div className="w-50 h-full justify-center items-center flex gap-4">
            <button
              onClick={() => {
                const newCart = [...cart];
                newCart[index].quantity += 1;
                setCart(newCart);
              }}
              className="active:translate-y-1 cursor-pointer rounded-full w-6 h-6 bg-black p-1"
            >
              <BiPlus className="text-white" />
            </button>
            <button
              onClick={() => {
                const newCart = [...cart];
                newCart[index].quantity -= 1;
                if (newCart[index].quantity <= 0) newCart.splice(index, 1);
                setCart(newCart);
              }}
              className="active:translate-y-1 cursor-pointer rounded-full w-6 h-6 bg-black p-1"
            >
              <FaMinus className="text-white" />
            </button>
          </div>
          <button
            onClick={() => {
              const newCart = [...cart];
              newCart.splice(index, 1);
              setCart(newCart);
            }}
            className="absolute left-238"
          >
            <FaDeleteLeft className="text-red-500 font-bold text-2xl cursor-pointer hover:text-3xl active:translate-y-1" />
          </button>
        </div>
      ))}

      <div className="w-160 h-30 bg-red-300 p-4 flex justify-end items-center relative">
        <div className="w-50 h-full items-center justify-center flex text-bold text-xl">
          Total : LKR.
          {getTotal().toLocaleString("en-us", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="w-40 h-full flex justify-center items-center absolute left-1">
          <button
            onClick={placeOrder}
            className="w-25 h-12 bg-blue-400 text-white hover:bg-white hover:text-blue-400 active:translate-y-1 rounded-2xl cursor-pointer"
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
}

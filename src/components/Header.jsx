import { Link } from "react-router-dom";

function Header(){
    return(
        <header className="w-full h-26 bg-red-400 flex justify-center items-center gap-10">
            <Link to="/" className="font-bold text-xl text-black" >Home</Link>
            <Link to="/products" className="font-bold text-xl text-black" >Products</Link>
            <Link to="/aboutus" className="font-bold text-xl text-black" >About us</Link>
            <Link to="/reviews" className="font-bold text-xl text-black" >Reviews</Link>
            <Link to="/contactus" className="font-bold text-xl text-black" >Contact Us</Link>
        </header>
    )
}

export default Header; 
function RegisterPage(){
    return(
        <div className="w-screen h-screen flex justify-center items-center bg-[url(/src/assets/loginone.jpg)]">
            <div className="w-290 h-140 bg-white rounded-2xl flex items-center justify-around shadow-black shadow-2xl">
                <div className=" bg-white w-140 h-136 rounded-2xl flex p-6 flex-col items-center gap-10">
                    <div className="w-full h-26 flex justify-center items-center">
                        <h1 className=" text-2xl font-bold">Hello Again!</h1>
                    </div>
                    <input type="text" className="w-100 h-10 border-2 border-black p-1" placeholder="Email"></input>
                    <input type="text" className="w-100 h-10 border-2 border-black p-1" placeholder="Password"></input>
                    <button className="bg-amber-600 text-center text-white text-[18px] h-10 w-100 border-2 border-amber-600 active:translate-y-1 cursor-pointer">Login</button>
                    <h1>If you dont't have an account ? <span className="text-blue-400 cursor-pointer">register</span> from here </h1>
                </div>
                <div className="bg-[url(/src/assets/logintwo.jpg)] w-140 h-136 rounded-2xl bg-center bg-cover"></div>
            </div>
        </div>
    )
}


export default RegisterPage

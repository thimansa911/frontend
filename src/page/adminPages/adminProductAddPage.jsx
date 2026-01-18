function AdminProductAddPage(){
    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-180 h-130 bg-red-300 rounded-2xl flex flex-col items-center ">
                <h1 className="">Add product</h1>
                <input type="text"/>
                <input type="text"/>
                <input type="number"/>
                <input type="text"/>
                <input type="file"/>
                <input type="text"/>
                <select>
                    <option>Available</option>
                    <option>True</option>
                    <option>False</option>
                </select>
            </div>
        </div>
    )
}

export default AdminProductAddPage
import { useState } from "react";

function ImagesArray(props){

    const [activeIndex, setActiveIndex] = useState(0)
    const Pic = props.images

    return(
        <div className="w-full h-full flex flex-col gap-1">
            <div className="max-w-180 max-h-80">
                <img src={Pic[activeIndex]} className="w-140 h-80"/>
            </div>
            <div className="w-full h-20 flex justify-center items-center gap-1">
                {
                    Pic.map(
                        (Pic, index)=>{
                            return(
                                <img src={Pic} key={index} className={"w-30 h-20 cursor-pointer "+(activeIndex == index && "border-2 border-black")} onClick={
                                    ()=>{
                                        setActiveIndex(index)
                                    }
                                } />
                            )             
                        }
                    )
                }
            </div>
        </div>
    )
}

export default ImagesArray;
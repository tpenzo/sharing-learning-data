import React, { useState } from "react";

function PopularUserInfo(){
    const [userName, setUserName] = useState("Nguyễn Văn Abc");
    const [chosen, setChosen] = useState(false);

    const chooseItem = ()=>setChosen(!chosen) 
    
    return(
        <li className="user-info flex-row justify-center items-center w-full py-1 px-3 list-none bg-inherit hover:bg-white hover:shadow-sm rounded-xl mt-1 mx-auto cursor-pointer">
            <div className="w-8 h-8 2xl:w-10 2xl:h-10 inline-block border-[1px] border-gray-300 bg-gray-200 p-2 rounded-full mt-1 text-center">
                {/* {img ? img :<box-icon name='user' ></box-icon>} */}
            </div>
            <div className="w-[70%] inline-block ml-3 -translate-y-1/2">
                <p className="text-sm 2xl:text-base font-semibold text-gray-700">{userName}</p>
            </div>
        </li> 
    )
}

export default PopularUserInfo;
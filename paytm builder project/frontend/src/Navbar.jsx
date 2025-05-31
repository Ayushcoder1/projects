import {Link, Outlet} from "react-router-dom"
import { useState } from "react";

function Navbar(){
    const [toggle, setToggle] = useState(null);
    
    return (
        <div>
            <Topbar toggle={toggle} setToggle={setToggle}/>
            <div className="grid grid-cols-5 h-svh">
                <div className="col-span-1">
                    <Sidebar />
                </div>
                <div className="col-span-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

function Topbar({toggle, setToggle}){
  return (
    <div className="bg-zinc-200 shadow-lg h-15 grid grid-cols-10">
        <div className="col-span-2 flex items-center justify-center border-1">
            Paytm
        </div>
        <div className="col-span-8 border-1 flex justify-end">
            <div className="mr-5">
                <div className="flex text-center hover:underline hover:cursor-pointer pt-4" onClick={() => setToggle(!toggle)}>Ayush Gautam</div>
                {
                    toggle && (
                    <div className="absolute mt-2 w-30 bg-white shadow-lg rounded-md z-20">
                    {['Profile', 'Logout'].map((item, index) => (
                        <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <Link to={item === 'Profile' ? '/user/Settings' : '/user/login'} className="text-black">{item}</Link>
                        </div>
                    ))}
                    </div>
                    )
                }
            </div>
            
            <div className="flex items-center mr-4 border-l-1 pl-4">
                Help
            </div>
        </div>
    </div>
  )
}

function Sidebar(){
    const arr = ["Dashboard", "Transactions", "Settings", "Contacts"]
    return (
        <div className="bg-zinc-200 shadow-lg border-r-1 border-l-1 h-svh">
            {arr.map(function(item, index){
                return (
                    <div key={index} className="shadow-md hover:bg-zinc-300 rounded-full mb-2">
                        <p className="p-4 text-center items-center font-medium text-lg font-mono"><Link to={item}>{item}</Link></p>
                    </div>
                )
            })}
        </div>
    )
}

export default Navbar
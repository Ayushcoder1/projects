function Settings(){
    const arr = ["Profile", "Security", "Notifications", "Language", "About Us"];
    return (
        <div className="shadow-lg h-lvh grid grid-cols-5">
            <div className="col-span-1 bg-white p-4 rounded-sm">
                {arr.map(function(item, index){
                    return (
                        <div key={index} className="hover:cursor-pointer text-center text-lg font-mono rounded-full hover:bg-zinc-200 p-2">
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Settings
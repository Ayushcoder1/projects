function Table(){
    const arr = [["User 1", "-$200", "Success"], ["User 2", "-$150", "Success"],
                ["User 3", "+$300", "Failed"], ["User 1", "+$400", "Success"]];
    return (
        <div>
            <div className="grid grid-cols-3 p-4 rounded-sm shadow-sm text-black text-xl font-bold">
                <p>Name</p>
                <p>Amount</p>
                <p>Status</p>
            </div>
            {arr.map(function(item, index){
                return (
                    <div className="grid grid-cols-3 p-4 rounded-sm shadow-sm" key={index}>
                        <div className="font-semibold text-lg ">{item[0]}</div>
                        <div className="font-semibold text-lg ">
                            {item[1][0] === "-" ? 
                                <span className="text-black">{item[1]}</span> : 
                                <span className="text-green-500">{item[1]}</span>
                            }
                        </div>
                        <div className="font-semibold text-lg">
                            {item[2] === "Success" ? 
                                <span className="bg-green-500 p-3 rounded-full text-white">{item[2]}</span> : 
                                <span className="bg-red-500 p-3 rounded-full text-white">{item[2]}</span>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Table
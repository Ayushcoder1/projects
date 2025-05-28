function Links(){
    const arr = [["Based in", "Kanpur"], ["Github", "AyushCoder1"], ["Leetcode", "AyushCoder1"]]
    return (
        <div className="bg-white rounded-lg p-6 mb-5 shadow-lg">
            {arr.map(function(ele){
                return (
                    <div className="flex justify-between m-2">
                        <div className="font-semibold">{ele[0]}</div>
                        <div className="text-zinc-400 font-semibold">{ele[1]}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Links
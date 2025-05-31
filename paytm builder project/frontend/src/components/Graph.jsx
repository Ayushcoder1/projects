import graph from '../assets/graph.png';
function Graph(){
    return (
        <div className='p-6 rounded-xl border-zinc-400 shadow-xl z-25 border-2 grid grid-cols-4'>
            <div className='col-span-1'>
                <h1 className="font-semibold text-lg mb-2 ">Transaction Data</h1>
                <h1 className="font-bold text-black text-3xl mb-4">$15,000</h1>

                <p className="text-lg text-blue-800 italic font-bold hover:cursor-pointer">Change Filter</p>
            </div>
            <div className='col-span-3 h-20'>
                <img src={graph} alt="graph" className='h-35 w-full'/>
            </div>
        </div>
    )
}

export default Graph
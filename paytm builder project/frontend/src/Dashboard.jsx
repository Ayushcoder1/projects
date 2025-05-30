import Balance from "./components/Balance";
import Graph from "./components/Graph";
import Table from "./components/Table";

function Dashboard(){
    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-5">
                <SideBar />
                <div className="p-4 bg-white shadow-lg h-lvh col-span-4">
                    <h1 className="text-black text-3xl font-bold">Dashboard</h1>
                    <p className="text-zinc-400 my-1 font-semibold">Overview of you transaction and balance of you wallet</p>
                    <div className="mt-4 grid grid-cols-5 grid-rows-5">
                        <div className="row-span-5 col-span-1">
                            <Balance />
                        </div>
                        <div className="row-span-5 col-span-4">
                            <Graph />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Table />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Navbar(){
  return (
    <div className="bg-zinc-200 shadow-lg h-15">
      
    </div>
  )
}

function SideBar(){
    return (
        <div className="bg-zinc-200 shadow-lg col-span-1">
            
        </div>
    )
}

export default Dashboard;
import Balance from "./components/Balance";
import Graph from "./components/Graph";
import Table from "./components/Table";

function Dashboard(){
    return (
        <div className="p-4 bg-white shadow-lg h-lvh">
            <h1 className="text-black text-3xl font-bold">Dashboard</h1>
            <p className="text-zinc-400 my-1 font-semibold">Overview of you transaction and balance of you wallet</p>
            <div className="mt-4 grid grid-cols-5">
                <div className="col-span-1">
                    <Balance />
                </div>
                <div className="col-span-4">
                    <Graph />
                </div>
            </div>
            <div className="p-4 flex itenms-center mt-4 border-2 rounded-lg shadow-lg text-2xl font-mono">
                Recent Transactions
            </div>
            <div className="mt-6">
                <Table />
            </div>
        </div>
    )
}

export default Dashboard;
function Bio(){
    return (
        <div className="flex flex-col justify-center bg-white p-8 items-center rounded-lg mb-5 shadow-lg">
            <div className="p-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-15">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>
            <div className="p-3 pb-0 text-xl text-neutral-950 font-bold">
                <h1>Ayush Gautam</h1>
            </div>
            <div className="p-3 text-xl text-center">
                <p>Fresher | Fullstack Developer | Node.js | React | Tailwind</p>
            </div>
            <div className="p-2 mt-3 mb-2 text-lg border-2 border-black rounded-sm">
                <button>Download resume</button>
            </div>
        </div>
    )
}

export default Bio
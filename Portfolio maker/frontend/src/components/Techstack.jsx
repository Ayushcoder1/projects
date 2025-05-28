function Techstack(){
    const arr = ["C++", "Python", "HTML", "CSS", "JavaScript", "Node.js",
         "React", "Tailwind", "Git", "Bash", "MongoDB", "MySQL"];
    
    return (
        <div className="bg-white rounded-lg p-8">
            <h1 className="text-zinc-600 font-semibold text-2xl">Tech Stack</h1>
            <div className="flex flex-wrap justify-center mt-4">
                {arr.map(function(ele){
                    return (
                        <div className="m-2 bg-black text-white rounded-full text-center px-4 py-2">
                            <p>{ele}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Techstack
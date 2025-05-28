function Projects() {
  const projects = [
    ["Todo Web App", "A Todo Web App with auth, edit, done, delete and insert feature"],
    ["Digit Recognizer", "A single-layer neural network from scratch trained to identify digits 0–9"],
    ["Dummy 3", "Dummy description"],
    ["Dummy 4", "Dummy description"],
    ["Dummy 5", "Dummy description"],
  ];

  return (
    <div className="grid grid-cols-2">
      {projects.map(([title, desc], idx) => (
        <div key={idx}
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 p-10 flex flex-col justify-between m-5">
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
                <h2 className="text-xl font-semibold mb-2 text-zinc-500">{title}</h2>
            </div>
            <p className="text-zinc-400 flex-grow">{desc}</p>

        </div>
      ))}
    </div>
  );
}

export default Projects;

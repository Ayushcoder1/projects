function Theme() {
  return (
    <div className="p-4 bg-white rounded-lg mb-5 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold">Theme</h1>
          <p className="text-sm text-gray-600">Default</p>
        </div>

        <div className="relative">
          <button
            onClick={() => {
              const menu = document.getElementById('dropdown');
              menu.classList.toggle('hidden');
            }}
            className="inline-flex items-center w-45 text-end bg-white hover:bg-zinc-100 text-zinc-400 font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            Chose Theme
            <svg className="w-2.5 h-2.5 ms-3" fill="none" viewBox="0 0 10 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m1 1 4 4 4-4" />
            </svg>
          </button>

          <div
            id="dropdown"
            className="hidden absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-50"
          >
            <ul className="py-2 text-sm text-gray-700">
              {['Defualt','Light','Dark','Corporate'].map((item) => (
                <li key={item}>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theme;

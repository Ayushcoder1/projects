import { useSetAtom } from "jotai";
import { useRef, useState } from "react";
import { fetch_filter_data_atom } from "../store/atoms";

function Filter() {
  const [quantity, setQuantity] = useState("Title");
  const [open, setOpen] = useState(false);
  const inputRef = useRef();
  const fetch_filter_data = useSetAtom(fetch_filter_data_atom);

  const placeholderText =
    quantity === "Title" || quantity === "Description"
      ? "Search text…"
      : "DD-MM-YYYY to DD-MM-YYYY";

  const handleSubmit = () => {
    fetch_filter_data(inputRef.current.value, quantity);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-black rounded-lg shadow-lg text-lg font-serif">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholderText}
        className="flex-1 px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
      />

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center px-4 py-2 bg-amber-100 rounded-full hover:bg-amber-200 transition"
        >
          {quantity}
          <svg
            className={`w-4 h-4 ml-2 transform transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {open && (
          <ul className="absolute top-full mt-2 w-40 bg-white rounded-md shadow-lg z-10">
            {["Title", "Description", "Deadline"].map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  setQuantity(opt);
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="px-5 py-2 bg-amber-100 rounded-full hover:bg-amber-200 transition">
        Submit
      </button>
    </div>
  );
}

export default Filter;

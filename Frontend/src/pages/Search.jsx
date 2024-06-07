import React, { useState } from "react";
import ProductCard from "../components/Products/ProductCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const addToCart = () => {};

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  return (
    <div className="p-8 flex flex-row justify-start items-stretch min-h-[calc(100vh-6.5vh)] gap-8">
      <aside className="min-w-[20rem] shadow-md p-8 flex flex-col justify-start items-stretch gap-2">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <h4 className="text-lg font-semibold">Sort</h4>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
          >
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold">Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold">Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
          >
            <option value="">ALL</option>
            <option value="Sample1">Sample1</option>
            <option value="Sample2">Sample2</option>
          </select>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 w-1/2 border border-gray-300 rounded-lg text-lg"
        />
        <div className="mb-10 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
            <ProductCard
              productId="1"
              name="Macbook"
              price={2300}
              stock={21}
              handler={addToCart}
              photo="https://m.media-amazon.com/images/I/61lYIKPieDL._AC_SX342_.jpg"
            />
          </div>
        </div>
        <article className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={!isPrevPage}
            className={`px-4 py-2 rounded-lg ${
              isPrevPage
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700 cursor-not-allowed opacity-50"
            }`}
          >
            Prev
          </button>
          <span>
            {page} of {4}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!isNextPage}
            className={`px-4 py-2 rounded-lg ${
              isNextPage
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700 cursor-not-allowed opacity-50"
            }`}
          >
            Next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;

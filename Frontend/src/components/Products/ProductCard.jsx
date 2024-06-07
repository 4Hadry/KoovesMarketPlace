import React from "react";
import Button from "../../Shared/Button";

const ProductCard = ({ productId, name, photo, price, stock, handler }) => {
  return (
    <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative">
        <img
          src={photo}
          alt={name}
          className="h-[180px] w-full sm:h-[200px] md:h-[220px] lg:h-[240px] xl:h-[260px] object-cover rounded-t-lg"
        />
        {/* Hover Button */}
        <div className="hidden group-hover:flex absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm justify-center items-center transition duration-300">
          <div onClick={() => handler()}>
            <Button
              text={"Add to cart"}
              bgColor={"bg-primary"}
              textColor={"text-white"}
            />
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800 truncate">{name}</h2>
        <div className="flex justify-between items-center mt-2">
          <h2 className="font-bold text-xl text-primary">${price}</h2>
          <span
            className={`text-sm font-medium ${
              stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

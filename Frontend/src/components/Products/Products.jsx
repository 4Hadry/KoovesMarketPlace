import React from "react";
import toast from "react-hot-toast";
import Heading from "../../Shared/Heading";
import ProductCard from "./ProductCard";

import img1 from "../../assets/product/p-1.jpg";
import img2 from "../../assets/product/p-2.jpg";
import img3 from "../../assets/product/p-3.jpg";
import img4 from "../../assets/product/p-4.jpg";
import img5 from "../../assets/product/p-5.jpg";
import img6 from "../../assets/product/p-7.jpg";
import img7 from "../../assets/product/p-9.jpg";
import img8 from "../../assets/product/p-2.jpg";
import { useLatestProductsQuery } from "../../redux/api/productApi";
import { Skeleton } from "../../pages/Loader";
import { useDispatch } from "react-redux";
import { removeCartItems, addToCart } from "../../redux/reducer/cartReducer";

const Products = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem) => {
    console.log("Handler called with:", cartItem); // Debugging log
    if (cartItem.stock < 1) {
      return toast.error("Out of Stock");
    }
    console.log("Dispatching action with item:", cartItem); // Debugging log
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");

    dispatch(addToCart(cartItem));
  };
  if (isError) toast.error("Cannot Fetch the Products");
  return (
    <div>
      <div className="container">
        {/* Header Section  */}
        <Heading title="Latest Products" subtitle="Explore Our Products" />
        {/* Body Section  */}
        <div className="mb-10 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
            {isLoading ? (
              <Skeleton />
            ) : (
              data?.products.map((i) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  photo={i.photo}
                  handler={addToCartHandler}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

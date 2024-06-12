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
import Loader, { Skeleton } from "../../pages/Loader";

const productData = [
  {
    _id: 1,
    photo: img1,
    title: "Boat Headphone",
    price: "120",
    aosDelay: "0",
  },
  {
    _id: 2,
    photo: img2,
    title: "Rocky Mountain",
    price: "420",
    aosDelay: "200",
  },
  {
    _id: 3,
    photo: img3,
    title: "Googles",
    price: "320",
    aosDelay: "400",
  },
  {
    _id: 4,
    photo: img4,
    title: "Printed",
    price: "220",
    aosDelay: "600",
  },
  {
    _id: 5,
    photo: img5,
    title: "Boat Headphone",
    price: "120",
    aosDelay: "0",
  },
  {
    _id: 6,
    photo: img6,
    title: "Rocky Mountain",
    price: "420",
    aosDelay: "200",
  },
  {
    _id: 7,
    photo: img7,
    title: "Googles",
    price: "320",
    aosDelay: "400",
  },
  {
    _id: 8,
    photo: img8,
    title: "Printed",
    price: "220",
    aosDelay: "600",
  },
];

const Products = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  if (isError) toast.error("Cannot Fetch the Products");
  const addToCart = () => {};
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
                  handler={addToCart}
                  photo={i.photo}
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

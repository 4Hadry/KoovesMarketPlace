import React from "react";
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
  return (
    <div>
      <div className="container">
        {/* Header Section  */}
        <Heading title="Our Products" subtitle="Explore Ou Products" />
        {/* Body Section  */}
        <ProductCard data={productData} />
      </div>
    </div>
  );
};

export default Products;

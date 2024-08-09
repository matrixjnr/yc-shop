/**
 *
 * ProductList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import AddToWishList from '../AddToWishList';
import ProductCard from "../ProductCard";

const ProductList = props => {
  const { products, updateWishlist, authenticated } = props;

  return (
    <div className='product-list'>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          updateWishlist={updateWishlist}
          authenticated={authenticated}
        />
      ))}
    </div>
  );
};

export default ProductList;

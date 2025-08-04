import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../../utils';

const ProductList = ({ products, categories }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, Infinity]);

  // Handle filtering logic
  const handleFilter = () => {
    const filtered = products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(filterText.toLowerCase());

      const matchesCategory =
        !filterCategory || product.categories.some((cat) => cat._id === filterCategory);

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesName && matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
  };

  // Use useEffect to trigger filtering whenever filter inputs change
  useEffect(() => {
    handleFilter();
  }, [filterText, filterCategory, priceRange]);

  // Handle price range input
  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split('-').map(Number);
    setPriceRange([min || 0, max || Infinity]);
  };

  return (
    <div>
      {/* Filter Inputs */}
      <div className="filter-container d-flex flex-row mb-3">
        <input
          type="text"
          placeholder="Search by name"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="form-control mr-2"
        />

        <select
          className="form-control mr-2"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select className="form-control" onChange={handlePriceChange}>
          <option value="0-Infinity">All Prices</option>
          <option value="0-10000">Under KSH 10,000</option>
          <option value="10000-25000">KSH 10,000 - KSH 25,000</option>
          <option value="25000-50000">KSH 25,000 - KSH 50,000</option>
          <option value="50000-100000">KSH 50,000 - KSH 100,000</option>
          <option value="100000-200000">KSH 100,000 - KSH 200,000</option>
          <option value="200000-Infinity">Over KSH 200,000</option>
        </select>
      </div>

      {/* Product List */}
      <div className="p-list">
        {filteredProducts.map((product, index) => (
          <Link
            to={`/dashboard/product/edit/${product._id}`}
            key={index}
            className="d-flex flex-row align-items-center mx-0 mb-3 product-box"
          >
            <img
              className="item-image"
              src={
                product.imageUrl || '/images/placeholder-image.png'
              }
              alt={product.name}
            />
            <div className="d-flex flex-column justify-content-center px-3 text-truncate pname">
              <h4 className="text-truncate">{product.name}</h4>
              <div
                className="mb-2 text-truncate product-desc"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <div className="d-flex flex-column justify-content-center">
                <p className="price">{formatMoney(product.price)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

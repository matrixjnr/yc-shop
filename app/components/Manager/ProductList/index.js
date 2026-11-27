import React, {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';

import {formatMoney} from '../../../utils';
import Button from '../../Common/Button';

const PAGE_SIZE = 10;

const ProductList = ({products, categories}) => {
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];

    return safeProducts.filter(product => {
      const matchesName = (product.name || '')
        .toLowerCase()
        .includes(filterText.toLowerCase());

      const matchesCategory =
        !filterCategory ||
        (product.categories || []).some(category => category._id === filterCategory);

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesName && matchesCategory && matchesPrice;
    });
  }, [products, filterText, filterCategory, priceRange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterText, filterCategory, priceRange]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePriceChange = event => {
    const [min, max] = event.target.value.split('-').map(Number);
    setPriceRange([min || 0, max || Infinity]);
  };

  const pageNumbers = Array.from({length: pageCount}, (_, index) => index + 1);

  return (
    <div className='admin-product-list'>
      <div className='filter-container d-flex flex-wrap mb-3'>
        <input
          type='text'
          placeholder='Search by name'
          value={filterText}
          onChange={event => setFilterText(event.target.value)}
          className='form-control mr-2 mb-2'
        />

        <select
          className='form-control mr-2 mb-2'
          value={filterCategory}
          onChange={event => setFilterCategory(event.target.value)}
        >
          <option value=''>All Categories</option>
          {(categories || []).map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select className='form-control mb-2' onChange={handlePriceChange}>
          <option value='0-Infinity'>All Prices</option>
          <option value='0-10000'>Under KSH 10,000</option>
          <option value='10000-25000'>KSH 10,000 - KSH 25,000</option>
          <option value='25000-50000'>KSH 25,000 - KSH 50,000</option>
          <option value='50000-100000'>KSH 50,000 - KSH 100,000</option>
          <option value='100000-200000'>KSH 100,000 - KSH 200,000</option>
          <option value='200000-Infinity'>Over KSH 200,000</option>
        </select>
      </div>

      <div className='admin-table'>
        <div className='admin-table-head'>
          <span>Product</span>
          <span>Categories</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Status</span>
        </div>

        {visibleProducts.length === 0 ? (
          <div className='admin-table-empty'>No products match your filters.</div>
        ) : (
          visibleProducts.map(product => (
            <Link
              to={`/dashboard/product/edit/${product._id}`}
              key={product._id}
              className='admin-table-row'
            >
              <span className='admin-table-product'>
                <img
                  src={product.imageUrl || '/images/placeholder-image.png'}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </span>
              <span className='admin-table-cell'>
                {(product.categories || [])
                  .map(category => category.name)
                  .filter(Boolean)
                  .join(', ') || '—'}
              </span>
              <span className='admin-table-cell'>{formatMoney(product.price)}</span>
              <span className='admin-table-cell'>{product.quantity ?? 0}</span>
              <span className='admin-table-cell'>
                <span
                  className={`status-badge ${
                    product.isActive ? 'status-active' : 'status-inactive'
                  }`}
                >
                  {product.isActive ? 'Active' : 'Inactive'}
                </span>
              </span>
            </Link>
          ))
        )}
      </div>

      <div className='admin-pagination'>
        <Button
          size='sm'
          text='Prev'
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
        />
        {pageNumbers.map(page => (
          <Button
            key={page}
            size='sm'
            text={String(page)}
            className={page === currentPage ? 'active' : ''}
            onClick={() => setCurrentPage(page)}
          />
        ))}
        <Button
          size='sm'
          text='Next'
          disabled={currentPage === pageCount}
          onClick={() => setCurrentPage(page => Math.min(pageCount, page + 1))}
        />
      </div>

      <div className='admin-table-meta'>
        Showing {visibleProducts.length ? startIndex + 1 : 0}–
        {Math.min(startIndex + PAGE_SIZE, filteredProducts.length)} of{' '}
        {filteredProducts.length} products
      </div>
    </div>
  );
};

export default ProductList;

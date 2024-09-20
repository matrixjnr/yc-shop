import React from "react";
import { Link } from "react-router-dom";

const NewProductCard = ({ product }) => {
  return (
    <div className="carousel-box position-relative px-0 has-transition hov-animate-outline">
      <div className="px-3">
        <div className="aiz-card-box h-auto bg-white py-3 hov-scale-img">
          <div className="position-relative h-140px h-md-170px img-fit overflow-hidden">
            <Link to={`/product/${product.slug}`} className="d-block h-100">
              <img
                className="mx-auto img-fit h-100 has-transition"
                src={product.imageUrl}
                alt={product.name}
                title={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/img/placeholder.jpg";
                }}
              />
            </Link>

            <div className="absolute-top-right aiz-p-hov-icon">
              <button
                className="hov-svg-white"
                data-toggle="tooltip"
                data-title="Add to wishlist"
                data-placement="left"
              >
                <i className="las la-heart"></i>
              </button>
              <button
                className="hov-svg-white"
                data-toggle="tooltip"
                data-title="Add to compare"
                data-placement="left"
              >
                <i className="las la-balance-scale"></i>
              </button>
            </div>

            <button
              className="cart-btn absolute-bottom-left w-100 h-35px aiz-p-hov-icon text-white fs-13 fw-700 d-flex flex-column justify-content-center align-items-center"
            >
              Add to cart
              <i className="las la-shopping-cart la-2x"></i>
            </button>
          </div>

          <div className="p-2 p-md-3 text-left">
            <h3 className="fw-400 fs-13 text-truncate-2 lh-1-4 mb-0 h-35px text-center">
              <Link
                to={`/product/${product.slug}`}
                className="d-block text-reset hov-text-primary"
              >
                {product.name}
              </Link>
            </h3>
            <div className="fs-14 d-flex justify-content-center mt-3">
              {product.oldPrice && (
                <div className="disc-amount has-transition mr-1">
                  <del className="fw-400 text-secondary">
                    {`KSH${product.oldPrice}`}
                  </del>
                </div>
              )}
              <div className="fw-700 text-primary">
                {`KSH${product.price}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductCard;

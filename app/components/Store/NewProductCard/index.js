import React from "react";
import {Link} from "react-router-dom";
import AddToWishList from "../AddToWishList";
import {formatMoney} from "../../../utils";

const NewProductCard = ({product, updateWishlist, authenticated}) => {
  return (
    <div className="carousel-box position-relative px-0 has-transition hov-animate-outline">
      <div className="absolute-top-right aiz-p-hov-icon add-wishlist-box">
        <AddToWishList
          id={product._id}
          liked={product?.isLiked ?? false}
          enabled={authenticated}
          updateWishlist={updateWishlist}
          authenticated={authenticated}
        />
      </div>
      <div className="aiz-card-box h-auto bg-white py-3 hov-scale-img">
        <div className="position-relative h-140px h-md-170px img-fit overflow-hidden">
          <Link to={`/product/${product.slug}`} className="d-block h-100">
            <img
              className="mx-auto img-fit h-100 has-transition"
              style={{maxHeight: '200px', objectFit: 'contain'}} // Ensures the image stays within its container
              src={product.imageUrl}
              alt={product.name}
              title={product.name}
              onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/img/placeholder.jpg";
          }}
            />
          </Link>

          <div className="p-2 p-md-3 text-left">
            <h3 className="fw-400 fs-13 text-truncate-2 sliding-text lh-1-4 mb-0 h-35px text-left">
              <Link
                to={`/product/${product.slug}`}
                className="d-block text-reset hov-text-primary"
              >
                {product.name}
              </Link>
            </h3>
            <div className="fs-12 d-flex justify-content-start mt-3">
              {product.offerPrice && (
                <div className="fs-12 disc-amount has-transition mr-1">
                  <del className="fs-12 fw-400">
                    {`${formatMoney(product.price)}`}
                  </del>
                </div>
              )}
              <div className="fw-700 text-primary">
                {`${formatMoney(product.offerPrice ? product.offerPrice : product.price)}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductCard;

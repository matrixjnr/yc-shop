import React from 'react';
import Slider from 'react-slick';
import {Link} from "react-router-dom";
import {formatMoney} from "../../../utils"; // Import Carousel Slider

// Custom next arrow
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", right: "10px" }}
      onClick={onClick}
    >
      <i className="las la-arrow-right" style={{ fontSize: "24px" }}></i>
    </div>
  );
};

// Custom previous arrow
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", left: "10px", zIndex: 1 }}
      onClick={onClick}
    >
      <i className="las la-arrow-left" style={{ fontSize: "24px" }}></i>
    </div>
  );
};

const TodayDeals = ({ products, categorySlug }) => {
  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
        <div className="fluid-container">
          <div className="row no-gutters p-0">
            <div className="col-xl-12 todays-deal-container p-0">
              <div className="d-flex flex-wrap align-items-baseline justify-content-between px-4 px-xl-5 pt-4">
                <h3 className="text-white fs-16 fs-md-20 fw-700 mb-2 mb-sm-0">Today's Deal</h3>
                <Link
                  to={`/shop/category/${categorySlug}`}
                  className="fs-12 fw-700 text-white has-transition hov-text-secondary-base"
                >
                  View All
                </Link>
              </div>
              <div className="c-scrollbar-light overflow-hidden px-4 px-md-5 pb-3 pt-3 pt-md-3 pb-md-5">
                <div className="h-100 d-flex flex-column justify-content-center">
                  <Slider {...settings}>
                    {products.map((product, index) => (
                      <div key={index}>
                        <div className="carousel-box h-100 px-3 px-lg-0">
                          <a
                            href={`/product/${product.slug}`}
                            className="h-100 overflow-hidden hov-scale-img mx-auto"
                            title={product.name}
                          >
                            {/* Image */}
                            <div className="img h-80px w-80px rounded-content overflow-hidden mx-auto">
                              <img
                                className="img-fit-deals m-auto has-transition"
                                src={product.imageUrl}
                                alt={product.name}
                              />
                            </div>
                            <div className="fs-10 fs-md-12 mt-2 text-center h-md-20px text-dark today-p-name">
                              <span className="d-block fw-500 text-white">
                                {product.name}
                              </span>
                            </div>
                            {/*<div className="fs-10 fs-md-12 mt-0 text-center h-md-20px text-white">*/}
                            {/*  <span className="d-block fw-500 text-white">by {product.brand.name}</span>*/}
                            {/*</div>*/}
                            {/* Price */}
                            <div className="fs-14 mt-0 text-center">
                              <span className="d-block text-white fw-700">{`${formatMoney(product.price)}`}</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default TodayDeals;

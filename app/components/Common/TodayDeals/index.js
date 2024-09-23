import React from 'react';
import Slider from 'react-slick';
import {Link} from "react-router-dom"; // Import Carousel Slider

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
                                src={product.imageUrl || 'https://smartworldkenya.com/public/assets/img/placeholder.jpg'}
                                alt={product.name}
                                onError={(e) => (e.target.src = 'https://smartworldkenya.com/public/assets/img/placeholder.jpg')}
                              />
                            </div>
                            {/* Price */}
                            <div className="fs-14 mt-3 text-center">
                              <span className="d-block text-white fw-700">{`KSH${product.price}`}</span>
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
